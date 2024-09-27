"use client";

// material-ui
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CircularLoader from "ui-component/CircularLoader";
import Loader from "ui-component/Loader";

// project imports
import { useGetBookingCurrent } from "hooks/use-get-booking";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useRouter } from "next/navigation";
import { PatchBookingAccept } from "package/api/booking/id/accept";
import { PatchBookingReject } from "package/api/booking/id/reject";
import { formatDate } from "package/util";
import { useEffect, useState } from "react";
import Link from "next/link";
import { StyledLink } from "components/common/link/styled-link";

const getStatusLabel = (status: any) => {
  switch (status) {
    case 1:
      return { label: "Chờ xác nhận của chuyên gia", color: "warning" };
    case 2:
      return { label: "Chờ phỏng vấn", color: "info" };
    case 3:
      return { label: "Đang phỏng vấn", color: "primary" };
    case 4:
      return { label: "Chờ phản hồi", color: "default" };
    case 5:
      return { label: "Hoàn thành", color: "success" };
    case 6:
      return { label: "Hủy bởi khách hàng", color: "error" };
    case 7:
      return { label: "Hủy bởi chuyên gia", color: "error" };
    case 8:
      return { label: "Đã bị report", color: "error" };
    default:
      return { label: "Trạng thái không xác định", color: "default" };
  }
};

const isToday = (date: string) => {
  const today = new Date();
  const formattedToday = formatDate(today.toISOString(), "dd-MM-yyyy");
  const formattedDate = formatDate(date, "dd-MM-yyyy");
  return formattedDate === formattedToday;
};

const CustomerCalendarPage = ({
  onNext,
  onSelectEvent,
  params,
}: {
  onNext: () => void;
  params: { id: string };
  onSelectEvent: (event: any) => void;
}) => {
  const router = useRouter();

  const { refreshTime, refresh } = useRefresh();

  const [loading, setLoading] = useState<boolean>(true);

  const { expertToken } = ExpertToken();

  const { bookings } = useGetBookingCurrent(expertToken, refreshTime);

  const [selectedBooking, setSelectedBooking] = useState<{
    id: number;
    type: "accept" | "reject" | "ban";
  } | null>(null);

  const [cancelReason, setCancelReason] = useState<string>("");

  const handleOpenDialog = (
    bookingId: number,
    type: "accept" | "reject" | "ban"
  ) => {
    setSelectedBooking({ id: bookingId, type });
  };

  const handleCloseDialog = () => {
    setSelectedBooking(null);
    setCancelReason("");
  };

  const handleConfirmAccept = async () => {
    try {
      const res = await PatchBookingAccept(
        { id: selectedBooking ? selectedBooking.id : 0 },
        expertToken
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    handleCloseDialog();
  };

  const handleConfirmCancel = async () => {
    console.log("Cancelled with reason:", cancelReason);
    try {
      const res = await PatchBookingReject(
        { id: selectedBooking ? selectedBooking.id : 0, reason: cancelReason },
        expertToken
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    handleCloseDialog();
  };

  useEffect(() => {
    if (bookings) {
      setLoading(false);
    }
  }, [bookings]);

  if (loading) return <Loader />;

  return (
    <Box sx={{ height: "100vh", paddingX: 5, paddingY: 1 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell sx={{ pl: 3 }}>Tên khách hàng</TableCell>
              <TableCell>Thời điểm bắt đầu</TableCell>
              <TableCell>Thời điểm kết thúc</TableCell>
              <TableCell>Thời điểm tạo</TableCell>
              {/* <TableCell>Chú thích</TableCell> */}
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings && bookings.length > 0
              ? bookings
                .filter(
                  (row) =>
                    row.status == 4 ||
                    row.status == 5 ||
                    row.status == 6 ||
                    row.status == 7 ||
                    row.status == 8
                )
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                    <TableCell sx={{ pl: 3 }}>{row.customerId}</TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {formatDate(
                          row.startInterviewDate,
                          "dd/MM/yyyy - hh:mm"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {formatDate(
                          row.endInterviewDate,
                          "dd/MM/yyyy - hh:mm"
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {formatDate(row.createdAt, "dd/MM/yyyy")}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>{row.note}</TableCell> */}
                    <TableCell align="center">
                      <Chip
                        label={getStatusLabel(row.status).label}
                        color={getStatusLabel(row.status).color as any}
                      />
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Tooltip title="Xem chi tiết">
                        <StyledLink href={`/expert/interview/${row.id}`}>
                          <IconButton
                            color="default"
                            size="large"
                            onClick={() => {
                              router.push(
                                `/expert/history-calendar/${row.id}`
                              );
                            }}
                          >
                            <VisibilityIcon sx={{ fontSize: "1.1rem" }} />
                          </IconButton>
                        </StyledLink>
                      </Tooltip>
                      {/* <Tooltip title="Chấp nhận">
                                            <IconButton
                                                color="primary"
                                                size="large"
                                                onClick={() => handleOpenDialog(row.id, 'accept')}
                                            >
                                                <CheckIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip> */}
                      {/* <Tooltip title="Từ chối">
                                            <IconButton
                                                color="secondary"
                                                size="large"
                                                disabled={!row.canCancel}
                                                onClick={() => handleOpenDialog(row.id, 'reject')}
                                            >
                                                <CloseIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip> */}
                      {/* <Tooltip title="Chặn">
                                            <IconButton
                                                color="error"
                                                size="large"
                                                onClick={() => handleOpenDialog(row.id, 'ban')}
                                            >
                                                <BlockIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip> */}
                    </TableCell>
                  </TableRow>
                ))
              : !loading && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                      Hiện chưa người dùng nào đặt lịch
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            {loading && (
              <TableRow>
                <TableCell colSpan={7}>
                  <CircularLoader />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={selectedBooking?.type === "reject"}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{ borderRadius: "10px" }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Nhập lý do từ chối
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cancelReason"
            label="Lý do từ chối"
            type="text"
            fullWidth
            variant="outlined"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            sx={{ marginTop: 1, marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{ marginRight: 1, fontWeight: "bold" }}
          >
            Đóng
          </Button>
          <Button
            onClick={handleConfirmCancel}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Từ chối
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={selectedBooking?.type === "accept"}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{ borderRadius: "10px" }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Xác nhận chấp nhận phỏng vấn
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn có chắc chắn muốn chấp nhận lịch phỏng vấn này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{ marginRight: 1, fontWeight: "bold" }}
          >
            Đóng
          </Button>
          <Button
            onClick={handleConfirmAccept}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={selectedBooking?.type === "ban"}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        sx={{ borderRadius: "10px" }}
      >
        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
          Xác nhận chặn khách hàng
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn có chắc chắn muốn chặn đặt lịch phỏng từ khách hàng này không?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="secondary"
            sx={{ marginRight: 1, fontWeight: "bold" }}
          >
            Đóng
          </Button>
          <Button
            onClick={handleConfirmAccept}
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Chặn
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomerCalendarPage;

"use client";
// material-ui
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// project imports
import { format } from "date-fns";
import { gridSpacing } from "store/constant";
import SubCard from "ui-component/cards/SubCard";
import Chip from "ui-component/extended/Chip";

// assets
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

// types
import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { StyledLink } from "components/common/link/styled-link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useGetBookingById } from "hooks/use-get-booking";
import { useGetExpertSkillOptions } from "hooks/use-get-expert-skill-option";
import { formatDate } from "package/util";
import { ExpertSkillOption } from "package/api/expert-skill-option";
import { PatchBookingReject } from "package/api/booking/id/reject";
import { ExpertToken } from "hooks/use-login";

const getStatusLabel = (status: number) => {
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

const BookingDetailPage = ({ params }: { params: { id: string } }) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const { expertToken } = ExpertToken();

  const [cancelReason, setCancelReason] = useState("");

  const [showCancelForm, setShowCancelForm] = useState(false);

  const { booking } = useGetBookingById({ id: +params.id });

  const { label, color } =
    booking?.status !== undefined
      ? getStatusLabel(booking.status)
      : { label: "Chưa có trạng thái", color: "default" };

  const { expertSkillOptions } = useGetExpertSkillOptions({
    expertId: booking?.expertId,
  });

  const handleCancelClick = () => {
    setShowCancelForm(true);
  };

  const handleConfirmCancel = async () => {
    console.log("Cancelled with reason:", cancelReason);
    try {
      const res = await PatchBookingReject(
        { id: +params?.id, reason: cancelReason },
        expertToken
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setCancelReason("");
    setShowCancelForm(false);
  };

  const handleCloseCancelForm = () => {
    setCancelReason("");
    setShowCancelForm(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredSkillOptions = useMemo(() => {
    if (booking && booking?.skillOptionBooking.length < 0) return [];
    return expertSkillOptions.filter((skill: ExpertSkillOption) =>
      booking?.skillOptionBooking.includes({
        skillId: skill.skillOptionId,
        skillName: skill.skillOptionName,
        ...skill,
      })
    );
  }, [booking, expertSkillOptions]);

  useEffect(() => {
    console.log("booking:", booking);
    console.log("expertSkillOptions:", expertSkillOptions);
    console.log("filteredSkillOptions", filteredSkillOptions);
  }, [params, booking, expertSkillOptions]);

  return (
    <SubCard>
      {booking && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="body2">
                  Thông tin buổi phỏng vấn vào thời điểm :
                </Typography>
                <Typography variant="body2">
                  {formatDate(booking.startInterviewDate, "yyyy-MM-dd hh:mm")}
                  {" - "}
                  {formatDate(booking.endInterviewDate, "yyyy-MM-dd hh:mm")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={2}>
                      <Typography variant="h4">Thông tin khách hàng</Typography>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1}>
                          <Typography variant="subtitle1">
                            Tên khách hàng :
                          </Typography>
                          <Typography variant="body2">
                            {booking.customerInfo?.fullName}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Typography variant="subtitle1">Email :</Typography>
                          <Typography variant="body2">
                            {booking.customerInfo?.email}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={2}>
                      <Typography variant="h4">Buổi phỏng vấn</Typography>
                      <Stack spacing={1}>
                        <Typography variant="subtitle1">
                          Kỹ năng khách hàng chọn phỏng vấn:
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          {filteredSkillOptions.length > 0 && filteredSkillOptions?.map((skill) => (
                            <Chip
                              key={skill.id}
                              label={skill.skillOptionName}
                            />
                          ))}
                        </Stack>
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={2}>
                      <Typography variant="h4">Thông tin đặt lịch</Typography>
                      <Stack spacing={1}>
                        <Stack direction="row" spacing={1}>
                          {/* <Typography variant="subtitle1">
                            Tổng tiền :
                          </Typography>
                          <Typography variant="body2"></Typography> */}
                        </Stack>
                        <Stack spacing={1}>
                          <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1">
                              Trạng thái :
                            </Typography>
                            <Chip
                              label={label}
                              variant="outlined"
                              size="small"
                              chipcolor={color}
                            />
                          </Stack>
                        </Stack>
                        {booking && booking.rejectReason && booking.rejectReason.trim() !== '' && (
                          <Stack direction="row" spacing={1}>
                            <Typography variant="subtitle1">
                              Lý do hủy đặt lịch :
                            </Typography>
                            <Typography variant="body2">{booking.rejectReason}</Typography>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={2}>
                      <Typography variant="h4">CV khách hàng</Typography>
                      <Stack
                        onClick={handleClickOpen}
                        sx={{ cursor: "pointer" }}
                      >
                        {booking.customerCv && (<Image
                          src={booking.customerCv.image}
                          alt={booking.customerCv.name}
                          layout="responsive"
                          width={700}
                          height={1000}
                          objectFit="cover"
                          objectPosition="top"
                          style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
                        />)}
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <StyledLink href="/expert/history-calendar">
                      <Button
                        variant="outlined"
                        startIcon={<KeyboardBackspaceIcon />}
                      >
                        Quay lại
                      </Button>
                    </StyledLink>
                  </Grid>
                  {/* <Grid item>
                                    <Button variant="contained" onClick={handleCancelClick}>Hủy đặt lịch</Button>
                                </Grid> */}
                </Grid>
              </Grid>

              {/* Lý do hủy đặt lịch */}
              {showCancelForm && (
                <Grid item xs={12}>
                  <SubCard>
                    <Stack spacing={2}>
                      <Typography variant="subtitle1">
                        Nhập lý do từ chối:
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        value={cancelReason}
                        onChange={(e) => setCancelReason(e.target.value)}
                      />
                      <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                      >
                        <Button
                          variant="outlined"
                          onClick={handleCloseCancelForm}
                        >
                          Đóng
                        </Button>
                        <Button
                          variant="contained"
                          onClick={handleConfirmCancel}
                        >
                          Xác nhận
                        </Button>
                      </Stack>
                    </Stack>
                  </SubCard>
                </Grid>
              )}
            </Grid>
          </Grid>

          <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogContent>
              {booking.customerCv && (<Image
                src={booking.customerCv.image}
                alt={booking.customerCv.name}
                layout="responsive"
                width={700}
                height={1000}
                objectFit="cover"
                objectPosition="top"
                style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
              />)}
            </DialogContent>
          </Dialog>
        </Grid>
      )}
    </SubCard>
  );
};

export default BookingDetailPage;

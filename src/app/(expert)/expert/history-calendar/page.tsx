"use client";

import { useState } from "react";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import MainCard from "ui-component/cards/MainCard";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { BookingCurrent } from "package/api/booking/expert/current";
import CalendarHistoryPage from "./_component/CalendarHistory";
import { useGetBookingCurrent } from "hooks/use-get-booking";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useRouter } from "next/navigation";
import { PatchBookingAccept } from "package/api/booking/id/accept";
import { PatchBookingReject } from "package/api/booking/id/reject";
import { RenderHistoryBookingTable } from "./_component/table";

export const fakeBookingCurrentData: BookingCurrent[] = [
  {
    id: 1,
    expertId: 101,
    customerId: 201,
    availabilityId: 301,
    startInterviewDate: "2024-08-20T10:00:00Z",
    endInterviewDate: "2024-08-20T11:00:00Z",
    customerCvId: 401,
    note: "Khách hàng muốn tư vấn về kỹ năng phát triển phần mềm.",
    rejectReason: "",
    status: 1, // Chờ xác nhận của chuyên gia
    createdAt: "2024-08-15T08:30:00Z",
    canCancel: true,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar1.jpg",
      fullName: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
    },
  },
  {
    id: 2,
    expertId: 102,
    customerId: 202,
    availabilityId: 302,
    startInterviewDate: "2024-08-21T14:00:00Z",
    endInterviewDate: "2024-08-21T15:00:00Z",
    customerCvId: 402,
    note: "Khách hàng cần tư vấn về lập trình Python nâng cao.",
    rejectReason: "",
    status: 2, // Chờ phỏng vấn
    createdAt: "2024-08-16T09:00:00Z",
    canCancel: false,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar2.jpg",
      fullName: "Trần Thị B",
      email: "tranthib@example.com",
    },
  },
  {
    id: 3,
    expertId: 103,
    customerId: 203,
    availabilityId: 303,
    startInterviewDate: "2024-08-22T16:00:00Z",
    endInterviewDate: "2024-08-22T17:00:00Z",
    customerCvId: 403,
    note: "Khách hàng cần tư vấn về quản lý dự án Agile.",
    rejectReason: "",
    status: 3, // Đang phỏng vấn
    createdAt: "2024-08-17T11:15:00Z",
    canCancel: true,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar3.jpg",
      fullName: "Lê Văn C",
      email: "levanc@example.com",
    },
  },
  {
    id: 4,
    expertId: 104,
    customerId: 204,
    availabilityId: 304,
    startInterviewDate: "2024-08-23T09:00:00Z",
    endInterviewDate: "2024-08-23T10:00:00Z",
    customerCvId: 404,
    note: "Khách hàng muốn tư vấn về thiết kế UX/UI.",
    rejectReason: "",
    status: 4, // Chờ phản hồi
    createdAt: "2024-08-18T13:45:00Z",
    canCancel: true,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar4.jpg",
      fullName: "Phạm Thị D",
      email: "phamthid@example.com",
    },
  },
  {
    id: 5,
    expertId: 105,
    customerId: 205,
    availabilityId: 305,
    startInterviewDate: "2024-08-24T11:00:00Z",
    endInterviewDate: "2024-08-24T12:00:00Z",
    customerCvId: 405,
    note: "Khách hàng muốn học về lập trình web với ReactJS.",
    rejectReason: "",
    status: 5, // Hoàn thành
    createdAt: "2024-08-19T15:20:00Z",
    canCancel: false,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar5.jpg",
      fullName: "Đỗ Văn E",
      email: "dovane@example.com",
    },
  },
  {
    id: 6,
    expertId: 106,
    customerId: 206,
    availabilityId: 306,
    startInterviewDate: "2024-08-25T14:00:00Z",
    endInterviewDate: "2024-08-25T15:00:00Z",
    customerCvId: 406,
    note: "Khách hàng cần tư vấn về lập trình mobile với Flutter.",
    rejectReason: "Khách hàng đã hủy cuộc hẹn.",
    status: 6, // Hủy bởi khách hàng
    createdAt: "2024-08-20T10:45:00Z",
    canCancel: false,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar6.jpg",
      fullName: "Ngô Thị F",
      email: "ngothif@example.com",
    },
  },
  {
    id: 7,
    expertId: 107,
    customerId: 207,
    availabilityId: 307,
    startInterviewDate: "2024-08-26T09:00:00Z",
    endInterviewDate: "2024-08-26T10:00:00Z",
    customerCvId: 407,
    note: "Khách hàng muốn học về cách quản lý đội nhóm Agile.",
    rejectReason: "Chuyên gia đã hủy cuộc hẹn.",
    status: 7, // Hủy bởi chuyên gia
    createdAt: "2024-08-21T12:30:00Z",
    canCancel: false,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar7.jpg",
      fullName: "Trương Văn G",
      email: "truongvang@example.com",
    },
  },
  {
    id: 8,
    expertId: 108,
    customerId: 208,
    availabilityId: 308,
    startInterviewDate: "2024-08-27T13:00:00Z",
    endInterviewDate: "2024-08-27T14:00:00Z",
    customerCvId: 408,
    note: "Khách hàng muốn tìm hiểu về cơ sở dữ liệu MongoDB.",
    rejectReason: "Chuyên gia đã từ chối.",
    status: 8, // Từ chối
    createdAt: "2024-08-22T14:00:00Z",
    canCancel: false,
    expertSkillOptionId: [],
    customerInfo: {
      avatar: "https://example.com/avatar8.jpg",
      fullName: "Võ Thị H",
      email: "vothih@example.com",
    },
  },
];

// ==============================|| EXPERT BOOKING PAGE ||============================== //

const ExpertBookingPage = ({ params }: { params: { id: string } }) => {
  const theme = useTheme();

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


  return (
    <>
      <MainCard title="Danh sách các báo cáo buổi phỏng vấn">
        {bookings ?
          (<RenderHistoryBookingTable
            bookings={bookings.filter(
              (row) =>
                row.status == 4 ||
                row.status == 5 ||
                row.status == 6 ||
                row.status == 7 ||
                row.status == 8
            )} handleOpenDialog={handleOpenDialog} />)
          :
          (<RenderHistoryBookingTable
            bookings={fakeBookingCurrentData.filter(
              (row) =>
                row.status == 4 ||
                row.status == 5 ||
                row.status == 6 ||
                row.status == 7 ||
                row.status == 8
            )} handleOpenDialog={handleOpenDialog} />)
        }
      </MainCard>
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
    </>
  );
};

export default ExpertBookingPage;

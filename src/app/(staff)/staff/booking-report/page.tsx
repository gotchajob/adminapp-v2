"use client"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination, TextField, Typography } from "@mui/material";
import { UseGetBookingReport } from "hooks/use-get-booking-report";
import { StaffToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { enqueueSnackbar } from "notistack";
import { ApproveBookingReport } from 'package/api/booking-report/id/approve';
import { RejectBookingReport } from 'package/api/booking-report/id/reject';
import { BookingReportTableRender } from "./_component/BookingReportTable";

const fakeBookingReportData = {
    list: [
        {
            id: 1,
            customerContent: "Khách hàng không hài lòng với dịch vụ.",
            expertContent: "Chuyên gia đã làm hết khả năng nhưng khách hàng vẫn không hài lòng.",
            staffNote: "Xem xét lại kỹ năng của chuyên gia.",
            status: 1, // 1: Đã xử lý
            bookingId: 101,
        },
        {
            id: 2,
            customerContent: "Chuyên gia không đến đúng giờ.",
            expertContent: "Chuyên gia gặp vấn đề về giao thông, đã thông báo trễ.",
            staffNote: "Lên lịch lại buổi phỏng vấn cho khách hàng.",
            status: 0, // 0: Chưa xử lý
            bookingId: 102,
        },
        {
            id: 3,
            customerContent: "Chuyên gia không cung cấp được giải pháp hữu ích.",
            expertContent: "Chuyên gia đã cố gắng nhưng vấn đề phức tạp cần thêm thời gian.",
            staffNote: "Cân nhắc hoàn tiền hoặc giới thiệu chuyên gia khác.",
            status: 2, // 2: Đang xử lý
            bookingId: 103,
        },
    ],
    totalPage: 1,
};

export default function BookingReportPage() {
    const { staffToken } = StaffToken();
    const { refresh, refreshTime } = useRefresh();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(1000);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<string | null>(null);
    const [note, setNote] = useState<string | null>(null);

    const { bookingReport, loading: bookingReportLoading } = UseGetBookingReport(
        { pageNumber: page, pageSize: rowsPerPage },
        refreshTime,
        staffToken
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleOpenDialog = (reportId: number, action: string) => {
        setSelectedReportId(reportId);
        setActionType(action);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReportId(null);
        setActionType(null);
        setNote(null);
    };

    const handleConfirmAction = async () => {
        if (!selectedReportId || !note) {
            enqueueSnackbar("Vui lòng điền nội dung trước khi xác nhận.", { variant: "warning" });
            return;
        }
        try {
            if (actionType === "accept") {
                const response = await ApproveBookingReport({ id: selectedReportId, note }, staffToken);
                if (response.status === "success") {
                    enqueueSnackbar("Chấp nhận báo cáo thành công!", { variant: "success" });
                } else {
                    enqueueSnackbar("Có lỗi xảy ra khi chấp nhận báo cáo.", { variant: "error" });
                }
            } else if (actionType === "reject") {
                const response = await RejectBookingReport({ id: selectedReportId, note }, staffToken);
                if (response.status === "success") {
                    enqueueSnackbar("Từ chối báo cáo thành công!", { variant: "success" });
                } else {
                    enqueueSnackbar("Có lỗi xảy ra khi từ chối báo cáo.", { variant: "error" });
                }
            } else if (actionType === "notify") {
                enqueueSnackbar(`Đã gửi thông báo cho chuyên gia với ID: ${selectedReportId}`, { variant: "info" });
            }
        } catch (error) {
            console.error("Error handling action:", error);
            enqueueSnackbar("Lỗi hệ thống khi xử lý hành động.", { variant: "error" });
        } finally {
            handleCloseDialog();
            refresh();
        }
    };

    useEffect(() => {
        console.log("bookingReport:", bookingReport);
    }, [bookingReport]);

    return (
        <MainCard title="Danh sách các báo cáo buổi phỏng vấn">
            {fakeBookingReportData && (<BookingReportTableRender
                bookingReport={fakeBookingReportData?.list || []}
                handleViewDetails={(id: number) => console.log("Xem chi tiết báo cáo với ID:", id)}
                handleNotifyExpert={(id) => handleOpenDialog(id, "notify")}
                handleAcceptReport={(id) => handleOpenDialog(id, "accept")}
                handleRejectReport={(id) => handleOpenDialog(id, "reject")}
            />)}

            {/* Dialog xác nhận hành động */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    Xác nhận {actionType === "accept" ? "chấp nhận" : actionType === "reject" ? "từ chối" : "thông báo"} báo cáo
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3, fontSize: '1rem', textAlign: 'center', color: 'text.secondary' }}>
                        {actionType === "notify"
                            ? `Bạn có chắc chắn muốn thông báo cho chuyên gia để cung cấp bằng chứng không?`
                            : `Bạn có chắc chắn muốn ${actionType === "accept" ? "chấp nhận" : "từ chối"} báo cáo không?`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nội dung"
                        type="text"
                        fullWidth
                        value={note || ""}
                        onChange={(e) => setNote(e.target.value)}
                        variant="outlined"
                        multiline
                        rows={2}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" variant="text">
                        Đóng
                    </Button>
                    <Button onClick={handleConfirmAction} color="primary" variant="text">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

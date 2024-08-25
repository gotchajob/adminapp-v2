"use client"

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { UseGetBookingReport } from "hooks/use-get-booking-report";
import { StaffToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { ApproveBookingReport } from 'package/api/booking-report/id/approve';
import { RejectBookingReport } from 'package/api/booking-report/id/reject';
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Processing" color="primary" />;
        case 2:
            return <Chip label="Expert Processing" color="warning" />;
        case 3:
            return <Chip label="Staff Processing" color="info" />;
        case 4:
            return <Chip label="Approved" color="success" />;
        case 5:
            return <Chip label="Rejected" color="error" />;
        default:
            return <Chip label="Unknown" color="default" />;
    }
};

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
    const [rowsPerPage, setRowsPerPage] = useState(6);
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

    const handleViewDetails = (bookingId: number) => {
        console.log("Xem chi tiết báo cáo với ID:", bookingId);
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
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID buổi phỏng vấn</TableCell>
                            <TableCell>Báo cáo của khách hàng</TableCell>
                            <TableCell>Báo cáo từ chuyên gia</TableCell>
                            <TableCell>Staff note</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingReportLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : fakeBookingReportData.list.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography>Hiện không có báo cáo nào.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            fakeBookingReportData.list.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>
                                        {report.id}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.customerContent}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.expertContent}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.staffNote}
                                    </TableCell>
                                    <TableCell >
                                        {renderStatusChip(report.status)}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton color="primary" component={Link} href={`/staff/booking-report/${report.id}`}>
                                                <VisibilityIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Thông báo cho chuyên gia">
                                            <IconButton color="primary" onClick={() => handleOpenDialog(report.id, "notify")} disabled={report.status !== 1 && report.status !== 2}>
                                                <NotificationsActiveIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chấp nhận">
                                            <IconButton color="success" onClick={() => handleOpenDialog(report.id, "accept")} disabled={report.status !== 3}>
                                                <CheckCircleOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Từ chối" >
                                            <IconButton color="error" onClick={() => handleOpenDialog(report.id, "reject")} disabled={report.status !== 3}>
                                                <RemoveCircleOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={bookingReport.totalPage}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            {/* Dialog Xác Nhận */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    Xác nhận {actionType === "accept" ? "chấp nhận" : actionType === "reject" ? "từ chối" : "thông báo"} báo cáo
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ mb: 3, fontSize: '1rem', textAlign: 'center', color: 'text.secondary' }}>
                        {actionType === "notify"
                            ? `Bạn có chắc chắn muốn thông báo cho chuyên gia với để cung cấp bằng chứng không?`
                            : `Bạn có chắc chắn muốn ${actionType === "accept" ? "chấp nhận" : "từ chối"} báo cáo với không?`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nội dung"
                        type="text"
                        fullWidth
                        value={note}
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

"use client"

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { StyledLink } from "components/common/link/styled-link";
import { UseGetBookingReportById } from 'hooks/use-get-booking-report';
import { StaffToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { enqueueSnackbar } from "notistack";
import { BookingReportById } from "package/api/booking-report/id";
import { ApproveBookingReport } from "package/api/booking-report/id/approve";
import { RejectBookingReport } from "package/api/booking-report/id/reject";
import { formatDate } from "package/util";
import { useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";

// const mockBookingReportById: BookingReportById = {
//     id: 1,
//     customerContent: "Khách hàng báo cáo vì chuyên gia không có đủ kỹ năng cần thiết.",
//     customerEvidence: "https://drive.google.com/customer-recording",
//     expertContent: "Chuyên gia báo cáo vì khách hàng không chuẩn bị tốt.",
//     expertEvidence: "https://drive.google.com/expert-recording",
//     staffNote: "Lưu ý: Cần kiểm tra lại kỹ năng của chuyên gia.",
//     processingBy: 2,
//     status: 1,
//     bookingId: 101,
//     createdAt: "2023-08-09T08:00:00Z",
//     updatedAt: "2023-08-10T08:00:00Z",
//     bookingReportSuggest: [
//         { id: 1, reportSuggestId: 101, reportSuggest: "Khuyến nghị thay đổi chuyên gia" },
//         { id: 2, reportSuggestId: 102, reportSuggest: "Khuyến nghị hoàn tiền cho khách hàng" },
//     ],
// };

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Processing" color="primary" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 2:
            return <Chip label="Expert Processing" color="warning" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 3:
            return <Chip label="Staff Processing" color="info" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 4:
            return <Chip label="Approved" color="success" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 5:
            return <Chip label="Rejected" color="error" sx={{ fontWeight: 'bold', color: 'white' }} />;
        default:
            return <Chip label="Unknown" color="default" sx={{ fontWeight: 'bold', color: 'white' }} />;
    }
};

export default function BookingReportByIdPage({ params }: { params: { id: string } }) {
    const { refresh, refreshTime } = useRefresh();
    const { staffToken } = StaffToken();
    const [openDialog, setOpenDialog] = useState(false);
    const [actionType, setActionType] = useState<string | null>(null);
    const [note, setNote] = useState<string | null>(null);
    const { bookingReportById, loading: loadingBookingReportById } = UseGetBookingReportById({ id: +params.id }, staffToken, refreshTime);

    const handleOpenDialog = (action: string) => {
        setActionType(action);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setActionType(null);
    };

    const handleConfirmAction = async () => {
        if (!+params.id || !note) {
            enqueueSnackbar("Vui lòng điền nội dung trước khi xác nhận.", { variant: "warning" });
            return;
        }

        try {
            if (actionType === "accept") {
                const response = await ApproveBookingReport({ id: +params.id, note }, staffToken);
                if (response.status === "success") {
                    enqueueSnackbar("Chấp nhận báo cáo thành công!", { variant: "success" });
                } else {
                    enqueueSnackbar("Có lỗi xảy ra khi chấp nhận báo cáo.", { variant: "error" });
                }
            } else if (actionType === "reject") {
                const response = await RejectBookingReport({ id: +params.id, note }, staffToken);
                if (response.status === "success") {
                    enqueueSnackbar("Từ chối báo cáo thành công!", { variant: "success" });
                } else {
                    enqueueSnackbar("Có lỗi xảy ra khi từ chối báo cáo.", { variant: "error" });
                }
            } else if (actionType === "notify") {
                enqueueSnackbar(`Đã gửi thông báo cho chuyên gia`, { variant: "info" });
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
        console.log("bookingReportById:", bookingReportById);
    }, [bookingReportById]);

    return (
        <SubCard>
            {bookingReportById && (<Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={8}>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2">
                                    Booking report được tạo vào :
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(bookingReportById?.createdAt, "dd/MM/yyyy - hh:mm")}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <Typography variant="body2">
                                    Booking report được cập nhật vào :
                                </Typography>
                                <Typography variant="body2">
                                    {formatDate(bookingReportById?.updatedAt, "dd/MM/yyyy - hh:mm")}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: 'right' }}>
                            <Button color="primary" variant="outlined" onClick={() => handleOpenDialog("notify")} endIcon={<NotificationsActiveIcon />} disabled={bookingReportById?.status !== 1 && bookingReportById?.status !== 2}>
                                Thông báo cho chuyên gia
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={4} alignItems="flex-start" justifyContent="center">

                                <Grid item xs={12} sm={12} md={12}>
                                    <Stack
                                        direction="row"
                                        spacing={3}
                                        sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}
                                    >
                                        <Stack spacing={2} flex={1}>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                Report Suggest:
                                            </Typography>
                                            <Stack spacing={1} direction="row" flexWrap="wrap" gap={1}>
                                                {bookingReportById?.bookingReportSuggest.map((suggest: any) => (
                                                    <Chip
                                                        key={suggest.id}
                                                        label={suggest.reportSuggest}
                                                        variant="outlined"
                                                        size="medium"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            borderColor: 'primary.main',
                                                            color: 'primary.main',
                                                            marginBottom: 1,
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Stack>
                                        <Stack spacing={2} flex={1}>
                                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                                Trạng thái booking report:
                                            </Typography>
                                            <Stack spacing={1} direction="row" flexWrap="wrap" gap={1}>
                                                {renderStatusChip(bookingReportById?.status)}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <Stack spacing={3} sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                        <Typography variant="h5" fontWeight="bold">Báo cáo từ khách hàng</Typography>
                                        <Stack spacing={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    Lý do báo cáo:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {bookingReportById?.customerContent}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">Bằng chứng:</Typography>
                                                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                                                    <a href={bookingReportById?.customerEvidence} target="_blank" rel="noopener noreferrer">
                                                        {bookingReportById?.customerEvidence}
                                                    </a>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} sm={6} md={6}>
                                    <Stack spacing={3} sx={{ padding: 2, border: '1px solid #e0e0e0', borderRadius: 2 }}>
                                        <Typography variant="h5" fontWeight="bold">Báo cáo từ chuyên gia</Typography>
                                        <Stack spacing={2}>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">
                                                    Lý do báo cáo:
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    {bookingReportById?.expertContent}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography variant="subtitle1" fontWeight="medium">Bằng chứng:</Typography>
                                                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                                                    <a href={bookingReportById?.expertEvidence} target="_blank" rel="noopener noreferrer">
                                                        {bookingReportById?.expertEvidence}
                                                    </a>
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>

                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <StyledLink href="/staff/booking-report">
                                        <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                                            Quay lại
                                        </Button>
                                    </StyledLink>
                                </Grid>
                                <Grid item>
                                    <Stack direction="row" spacing={2}>
                                        <Button color="primary" variant="outlined" onClick={() => handleOpenDialog("accept")} endIcon={<CheckCircleOutlineIcon />} disabled={bookingReportById?.status !== 3}>
                                            Chấp nhận
                                        </Button>
                                        <Button color="error" variant="outlined" onClick={() => handleOpenDialog("reject")} endIcon={<RemoveCircleOutlineIcon />} disabled={bookingReportById?.status !== 3}>
                                            Từ chối
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid >
            </Grid >)}

            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Xác nhận {actionType === "accept" ? "chấp nhận" : actionType === "reject" ? "từ chối" : "thông báo"} báo cáo
                </DialogTitle>
                <DialogContent sx={{ pt: 2, pb: 3 }}>
                    <DialogContentText sx={{ mb: 3, fontSize: '1rem', textAlign: 'center', color: 'text.secondary' }}>
                        {actionType === "notify"
                            ? `Bạn có chắc chắn muốn thông báo cho chuyên gia với để cung cấp bằng chứng không?`
                            : `Bạn có chắc chắn muốn ${actionType === "accept" ? "chấp nhận" : "từ chối"} báo cáo với ID: ${bookingReportById?.id} không?`}
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
                <DialogActions sx={{ pb: 2 }}>
                    <Button
                        onClick={handleCloseDialog}
                        color="primary"
                        variant="outlined"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            minWidth: 100,
                        }}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleConfirmAction}
                        color="primary"
                        variant="contained"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: 2,
                            minWidth: 100,
                            ml: 2,
                        }}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

        </SubCard >
    );
}

"use client"

import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Button, Chip, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import { StyledLink } from "components/common/link/styled-link";
import { UseGetBookingReportById } from 'hooks/use-get-booking-report';
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { enqueueSnackbar } from "notistack";
import { BookingReportById } from "package/api/booking-report/id";
import { ExpertUpReportEvidence } from "package/api/booking-report/id/expert-up-evidence";
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
            return <Chip label="Đang xử lí" color="primary" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 2:
            return <Chip label="Chờ chuyên gia phản hồi" color="warning" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 3:
            return <Chip label="Chờ nhân viên phản hồi" color="info" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 4:
            return <Chip label="Duyệt" color="success" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 5:
            return <Chip label="Không duyệt" color="error" sx={{ fontWeight: 'bold', color: 'white' }} />;
        default:
            return <Chip label="Unknown" color="default" sx={{ fontWeight: 'bold', color: 'white' }} />;
    }
};

export default function BookingReportForExpertByIdPage({ params }: { params: { id: string } }) {

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [evidence, setEvidence] = useState("");
    const { expertToken } = ExpertToken();
    const { refresh, refreshTime } = useRefresh();
    const { bookingReportById, loading } = UseGetBookingReportById({ id: +params.id }, expertToken, refreshTime);

    const handleConfirmUpdate = async () => {
        if (+params.id !== null) {
            const body = {
                id: +params.id,
                content: content,
                evidence: evidence
            };
            try {
                const response = await ExpertUpReportEvidence(body, expertToken);
                if (response.status === "success") {
                    enqueueSnackbar("Cập nhật bằng chứng thành công!", { variant: "success" });
                } else {
                    enqueueSnackbar("Có lỗi xảy ra khi cập nhật bằng chứng.", { variant: "error" });
                }
            } catch (error) {
                console.error("Error updating evidence:", error);
                enqueueSnackbar("Lỗi hệ thống khi cập nhật bằng chứng.", { variant: "error" });
            } finally {
                setOpen(false);
                refresh();
            }
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
                        <Grid item xs={12}>
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
                                                {bookingReportById?.bookingReportSuggest.map((suggest) => (
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
                                                {renderStatusChip(bookingReportById.status)}
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
                                    <StyledLink href="/expert/booking-report">
                                        <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                                            Quay lại
                                        </Button>
                                    </StyledLink>
                                </Grid>
                                <Grid item>
                                    <Button color="primary" variant="outlined" onClick={() => setOpen((prev) => !prev)} endIcon={<AddToDriveIcon />}>
                                        Gửi bằng chứng record
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                        {open && (
                            <Grid item xs={12}>
                                <SubCard title="Gửi bằng chứng record">
                                    <Stack direction="column" spacing={3}>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Nội dung"
                                            type="text"
                                            fullWidth
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            variant="outlined"
                                            multiline
                                            rows={2}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                },
                                            }}
                                        />
                                        <TextField
                                            margin="dense"
                                            label="Đường dẫn record"
                                            type="text"
                                            fullWidth
                                            value={evidence}
                                            onChange={(e) => setEvidence(e.target.value)}
                                            variant="outlined"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: 2,
                                                },
                                            }}
                                        />
                                        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
                                            <Button
                                                onClick={() => setOpen((prev) => !prev)}
                                                color="primary"
                                                variant="outlined"
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    borderRadius: 2,
                                                }}
                                            >
                                                Đóng
                                            </Button>
                                            <Button
                                                onClick={handleConfirmUpdate}
                                                color="primary"
                                                variant="contained"
                                                sx={{
                                                    textTransform: 'none',
                                                    fontWeight: 'bold',
                                                    borderRadius: 2,
                                                }}
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
            </Grid>)}
        </SubCard >
    );
}

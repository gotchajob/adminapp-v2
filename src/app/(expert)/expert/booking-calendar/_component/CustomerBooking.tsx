"use client";

// material-ui
import FullCalendar from "@fullcalendar/react";
import { Box, IconButton, Table, TableCell, TableContainer, TableHead, TableRow, Typography, TableBody, Chip, Tooltip, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Loader from "ui-component/Loader";
import CircularLoader from "ui-component/CircularLoader";

// third-party
import { EventClickArg } from '@fullcalendar/core';

// project imports
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useSelector } from 'store';
import { useGetBookingCurrent } from "hooks/use-get-booking";
import { formatDate } from "package/util";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { PatchBookingReject } from "package/api/booking/id/reject";
import { PatchBookingAccept } from "package/api/booking/id/accept";

const CustomerCalendarPage = ({ onNext, onSelectEvent, params }: { onNext: () => void, params: { id: string }, onSelectEvent: (event: any) => void }) => {
    const router = useRouter();

    const { refreshTime, refresh } = useRefresh();
    const [loading, setLoading] = useState<boolean>(true);
    const { expertToken } = ExpertToken();
    const { bookings } = useGetBookingCurrent(expertToken, refreshTime);

    const [selectedBooking, setSelectedBooking] = useState<{ id: number; type: 'accept' | 'reject' } | null>(null);
    const [cancelReason, setCancelReason] = useState<string>('');

    const handleOpenDialog = (bookingId: number, type: 'accept' | 'reject') => {
        setSelectedBooking({ id: bookingId, type });
    };

    const handleCloseDialog = () => {
        setSelectedBooking(null);
        setCancelReason('');
    };

    const handleConfirmAccept = async () => {
        try {
            const res = await PatchBookingAccept({ id: selectedBooking ? selectedBooking.id : 0 }, expertToken);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
        handleCloseDialog();
    };

    const handleConfirmCancel = async () => {
        console.log('Cancelled with reason:', cancelReason);
        try {
            const res = await PatchBookingReject({ id: selectedBooking ? selectedBooking.id : 0, reason: cancelReason }, expertToken);
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

    const getStatusLabel = (status: number) => {
        switch (status) {
            case 1:
                return "Wait to Expert Accept";
            default:
                return "Unknown Status";
        }
    };

    if (loading) return <Loader />;

    return (
        <Box sx={{ height: '100vh', paddingX: 5, paddingY: 1 }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>#</TableCell>
                            <TableCell>Thời điểm bắt đầu</TableCell>
                            <TableCell>Thời điểm kết thúc</TableCell>
                            <TableCell>Thời điểm tạo</TableCell>
                            <TableCell align="center">Trạng thái</TableCell>
                            <TableCell align="center" sx={{ pr: 3 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings && bookings.length > 0 ? (
                            bookings.map((row) => (
                                <TableRow hover key={row.id}>
                                    <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" noWrap>
                                            {formatDate(row.startInterviewDate, "dd-MM-yyyy - hh:mm")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" noWrap>
                                            {formatDate(row.endInterviewDate, "dd-MM-yyyy - hh:mm")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2" noWrap>
                                            {formatDate(row.createdAt, "dd-MM-yyyy")}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Chip label={getStatusLabel(row.status)} color={row.status === 1 ? "primary" : "default"} />
                                    </TableCell>
                                    <TableCell align="center" sx={{ pr: 3 }}>
                                        <Tooltip title="Xem chi tiết">
                                            <IconButton
                                                color="default"
                                                size="large"
                                                onClick={() => {
                                                    router.push(`/expert/booking-calendar/${row.id}`);
                                                }}
                                            >
                                                <VisibilityIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Chấp nhận">
                                            <IconButton
                                                color="primary"
                                                size="large"
                                                onClick={() => handleOpenDialog(row.id, 'accept')}
                                            >
                                                <CheckIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Từ chối">
                                            <IconButton
                                                color="secondary"
                                                size="large"
                                                onClick={() => handleOpenDialog(row.id, 'reject')}
                                            >
                                                <CloseIcon sx={{ fontSize: "1.1rem" }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            !loading && (
                                <TableRow>
                                    <TableCell colSpan={7}>
                                        <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                                            Hiện chưa người dùng nào đặt lịch
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )
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
                open={selectedBooking?.type === 'reject'}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                sx={{ borderRadius: '10px' }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
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
                        sx={{ marginRight: 1, fontWeight: 'bold' }}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleConfirmCancel}
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={selectedBooking?.type === 'accept'}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                sx={{ borderRadius: '10px' }}
            >
                <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
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
                        sx={{ marginRight: 1, fontWeight: 'bold' }}
                    >
                        Đóng
                    </Button>
                    <Button
                        onClick={handleConfirmAccept}
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CustomerCalendarPage;

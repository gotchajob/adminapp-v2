"use client";
// material-ui
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// project imports
import { format } from 'date-fns';
import { gridSpacing } from 'store/constant';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';

// assets
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// types
import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import { StyledLink } from 'components/common/link/styled-link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useGetBookingById } from 'hooks/use-get-booking';

// table data
function createData(product: string, description: string, quantity: string, amount: string, total: string) {
    return { product, description, quantity, amount, total };
}

const formatDate = (isoString: any) => {
    return format(new Date(isoString), 'HH:mm dd/MM/yyyy');
};

const BookingDetailPage = ({ event, onBack, params }: { event: any, onBack: () => void, params: { id: string } }) => {
    const theme = useTheme();

    const [open, setOpen] = useState(false);

    const [isCancel, setIsCancel] = useState(() => {
        return event?.title === "Đặt lịch thành công" || event?.title === "Đã đặt lịch";
    });

    useEffect(() => {
        console.log("BookingDetailPage :", event)
    }, [event])

    const [cancelReason, setCancelReason] = useState('');
    const [showCancelForm, setShowCancelForm] = useState(false);

    const handleCancelClick = () => {
        setShowCancelForm(true);
    };

    const handleConfirmCancel = () => {
        console.log('Cancelled with reason:', cancelReason);
        setCancelReason('');
        setShowCancelForm(false);
    };

    const handleCloseCancelForm = () => {
        setCancelReason('');
        setShowCancelForm(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { booking } = useGetBookingById({ id: +params.id });

    useEffect(() => { console.log("booking:", booking) }, [booking]);

    return (
        <SubCard>
            {booking && (<Grid container spacing={3} justifyContent="center">
                <Grid item xs={12}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Thông tin buổi phỏng vấn vào :
                            </Typography>
                            <Typography variant="body2">
                                {formatDate(booking.startInterviewDate)}
                                {' - '}
                                {formatDate(booking.endInterviewDate)}
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
                                                <Typography variant="subtitle1">Tên khách hàng :</Typography>
                                                <Typography variant="body2">Anshan Handgun</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Email :</Typography>
                                                <Typography variant="body2">anshan.handgun@example.com</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Buổi phỏng vấn</Typography>
                                        <Stack spacing={1}>
                                            <Typography variant="subtitle1">Kỹ năng khách hàng chọn phỏng vấn:</Typography>
                                            <Typography variant="body2">{booking.expertSkillOptionId?.join(', ')}</Typography>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Thông tin đặt lịch</Typography>
                                        <Stack spacing={1}>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Tổng tiền :</Typography>
                                                <Typography variant="body2">375.000vnđ</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Trạng thái :</Typography>
                                                <Chip label="Đã đặt lịch" variant="outlined" size="small" chipcolor='warning'
                                                />
                                            </Stack>
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
                                        <Stack onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
                                            <Image
                                                src={"https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"}
                                                alt="Customer CV"
                                                layout="responsive"
                                                width={700}
                                                height={1000}
                                                objectFit="cover"
                                                objectPosition="top"
                                                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={3} alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <StyledLink href="/expert/expert-calendar">
                                        <Button variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                                            Quay lại
                                        </Button>
                                    </StyledLink>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained" onClick={handleCancelClick}>Hủy đặt lịch</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        {/* Lý do hủy đặt lịch */}
                        {showCancelForm && (
                            <Grid item xs={12}>
                                <SubCard>
                                    <Stack spacing={2}>
                                        <Typography variant="subtitle1">Nhập lý do hủy đặt lịch:</Typography>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={2}
                                            variant="outlined"
                                            value={cancelReason}
                                            onChange={(e) => setCancelReason(e.target.value)}
                                        />
                                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                                            <Button variant="outlined" onClick={handleCloseCancelForm}>
                                                Đóng
                                            </Button>
                                            <Button variant="contained" onClick={handleConfirmCancel}>
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

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogContent>
                    <Image
                        src={"https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"}
                        alt="Customer CV"
                        layout="intrinsic"
                        width={700}
                        height={1000}
                        objectFit="cover"
                        objectPosition="top"
                        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                    />
                </DialogContent>
            </Dialog>
        </SubCard>
    );
};

export default BookingDetailPage;

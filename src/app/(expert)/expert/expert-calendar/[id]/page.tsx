"use client";
// material-ui
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import { format } from 'date-fns';

// assets
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@mui/icons-material/PhoneAndroidTwoTone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// types
import { ThemeMode } from 'types/config';
import { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, TextField } from '@mui/material';
import { StyledLink } from 'components/common/link/styled-link';
import Image from 'next/image';

const detailsIconSX = {
    width: 15,
    height: 15,
    verticalAlign: 'text-top',
    mr: 0.5,
    mt: 0.25
};

// table data
function createData(product: string, description: string, quantity: string, amount: string, total: string) {
    return { product, description, quantity, amount, total };
}

const rows = [
    createData('Logo Design', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '6', '$200.00', '$1200.00'),
    createData('Landing Page', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '7', '$100.00', '$700.00'),
    createData('Admin Template', 'lorem ipsum dolor sit amat, connecter adieu siccing eliot', '5', '$150.00', '$750.00')
];

const formatDate = (isoString: any) => {
    return format(new Date(isoString), 'HH:mm dd/MM/yyyy');
};

const BookingDetailPage = ({ event, onBack }: { event: any, onBack: () => void }) => {
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

    return (
        <SubCard>
            <Grid container spacing={gridSpacing} px={5}>
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="body2">
                                        Thông tin buổi phỏng vấn vào :
                                    </Typography>
                                </Grid>
                                {event &&
                                    (<><Grid item>
                                        <Typography variant="body2">
                                            {formatDate(event?.start)}
                                        </Typography>
                                    </Grid>
                                        <Grid item>
                                            <Typography variant="body2">
                                                ━
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2">
                                                {formatDate(event?.end)}
                                            </Typography>
                                        </Grid></>)}
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">Thông tin khách hàng</Typography>
                                        <Stack spacing={0}>
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
                                        <Stack spacing={0}>
                                            <Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Kỹ năng khách hàng chọn phỏng vấn :</Typography>
                                                <Typography variant="body2">ReactJS, NodeJS</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Stack spacing={0} sx={{ mt: { xs: 0, md: 3 } }}>
                                        {event?.title === "Đã đặt lịch" &&
                                            (<Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Tổng tiền :</Typography>
                                                <Typography variant="body2">375.000vnđ</Typography>
                                            </Stack>
                                            )}
                                        {event?.title === "Đặt lịch thành công" &&
                                            (<Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Tổng tiền :</Typography>
                                                <Typography variant="body2">375.000vnđ</Typography>
                                            </Stack>)}
                                        {event?.title === "Hoàn tất phỏng vấn" &&
                                            (<Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Đã thanh toán :</Typography>
                                                <Typography variant="body2">375.000vnđ</Typography>
                                            </Stack>)}
                                        {event?.title === "Đã hủy đặt lịch" &&
                                            (<Stack direction="row" spacing={1}>
                                                <Typography variant="subtitle1">Đã hoàn trả :</Typography>
                                                <Typography variant="body2">375.000vnđ</Typography>
                                            </Stack>)}
                                        {event && (<Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Trạng thái :</Typography>
                                            <Chip label={event?.title} variant="outlined" size="small"
                                                sx={{
                                                    backgroundColor: `${event.color}`,
                                                    color: '#ffffff',
                                                    borderColor: `${event.color}`,
                                                    '&:hover': {
                                                        backgroundColor: `${event.color}`,
                                                        borderColor: `${event.color}`,
                                                        cursor: 'default'
                                                    }
                                                }} />
                                        </Stack>)}
                                        <Stack direction="row" spacing={1}>
                                            <Typography variant="subtitle1">Trạng thái :</Typography>
                                            <Chip label="Đã đặt lịch" variant="outlined" size="small" chipcolor='warning'
                                            />
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={6} md={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h4">CV khách hàng</Typography>
                                        <Stack onClick={handleClickOpen} sx={{ cursor: 'pointer' }}>
                                            <Image
                                                src="https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"
                                                alt="Customer CV"
                                                layout="responsive"
                                                width={700}
                                                height={1000}
                                                objectFit="cover"
                                                objectPosition="top"
                                                style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                            />
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>

                            <Dialog open={open} onClose={handleClose} fullWidth>
                                <DialogContent>
                                    <Image
                                        src="https://marketplace.canva.com/EAFcO7DTEHM/1/0/1131w/canva-blue-professional-modern-cv-resume-pPAKwLoiobE.jpg"
                                        alt="Customer CV"
                                        layout="intrinsic"
                                        width={700}
                                        height={1000}
                                        objectFit="cover"
                                        objectPosition="top"
                                        style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                    />
                                </DialogContent>
                            </Dialog>

                        </Grid>

                        <Grid item xs={12} mt={1}>
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
                            <Grid item xs={12} mt={1}>
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

            </Grid>
        </SubCard>
    );
};

export default BookingDetailPage;

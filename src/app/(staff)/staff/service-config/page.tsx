"use client";

import { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import SubCard from "ui-component/cards/SubCard";
import { FlexCenter } from "components/common/box/flex-box";
import { GetBookingPrice, PatchBookingPrice } from "package/api/booking/price";
import { StaffToken } from "hooks/use-login";
import { useSnackbar } from 'notistack';

const ServiceConfigPage = () => {
    const { staffToken } = StaffToken();
    const { enqueueSnackbar } = useSnackbar();
    const [bookingPrice, setBookingPrice] = useState<number>(0);
    const [newPrice, setNewPrice] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPrice(parseFloat(e.target.value));
    };

    const handleUpdatePrice = async () => {
        if (isNaN(newPrice) || newPrice <= 0) {
            enqueueSnackbar("Vui lòng nhập một số tiền hợp lệ.", { variant: 'warning' });
            return;
        }
        setUpdating(true);
        try {
            const res = await PatchBookingPrice({ price: newPrice }, staffToken);
            if (res.status !== "success") {
                throw new Error("Failed to update booking price.");
            }
            setBookingPrice(newPrice);
            enqueueSnackbar("Cập nhật giá thành công!", { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar("Có lỗi xảy ra. Vui lòng thử lại sau.", { variant: 'error' });
        }
        setUpdating(false);
    };

    useEffect(() => {
        const fetchBookingPrice = async () => {
            try {
                const res = await GetBookingPrice();
                if (res.status !== "success") {
                    throw new Error("Không lấy được giá dịch vụ.");
                }
                setBookingPrice(res.data.price);
                setNewPrice(res.data.price);
                setLoading(false);
            } catch (error) {
                console.error(error);
                enqueueSnackbar("Lấy giá dịch vụ thất bại", { variant: 'error' });
            }
        };
        fetchBookingPrice();
    }, [enqueueSnackbar]);

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Paper sx={{ p: 3, backgroundColor: '#ffffff', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom color="primary.main">Mock Interview</Typography>
                <SubCard>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>Mô tả dịch vụ</Typography>
                            <Typography variant="body1" color="textSecondary">
                                1. Dịch vụ phỏng vấn thử mô phỏng một buổi phỏng vấn thực tế, được dẫn dắt bởi các chuyên gia.
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                2. Buổi phỏng vấn sẽ được diễn ra trong vòng 1 tiếng 30 phút với 1 tiếng để phỏng vấn và 30p dùng cho Q&A và feedback.
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                3. Sau buổi phỏng vấn GotchaJob sẽ đảm bảo ứng viên hiểu rõ được một buổi phỏng vấn tương tự sẽ diễn ra như thế nào, hơn thế nữa là nắm bắt được khả năng qua vòng phỏng vấn dựa trên kết quả phỏng vấn thử của ứng viên và đánh giá từ phía chuyên gia.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>Giá hiện tại</Typography>
                            <Box display="flex" alignItems="center">
                                {loading ? (
                                    <CircularProgress size={20} sx={{ mr: 2 }} />
                                ) : (
                                    <Typography variant="h5" color="primary.main">
                                        {`${bookingPrice.toLocaleString()} VND`}
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" gutterBottom>Thay đổi giá</Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                value={newPrice.toString()}
                                onChange={handlePriceChange}
                                InputProps={{
                                    endAdornment: <Typography sx={{ ml: 1 }}>VND</Typography>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FlexCenter>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleUpdatePrice}
                                    disabled={updating}
                                >
                                    {updating ? <CircularProgress size={20} sx={{ mr: 1 }} /> : "Cập nhật giá"}
                                </Button>
                            </FlexCenter>
                        </Grid>
                    </Grid>
                </SubCard>
            </Paper>
        </Container>
    );
};

export default ServiceConfigPage;

'use client';

import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Skeleton, TextField, Typography } from '@mui/material';
import { useGetBalance } from 'hooks/use-get-balance';
import { useGetBankInfoCurrent } from 'hooks/use-get-bank-info';
import { ExpertToken } from 'hooks/use-login';
import { useRefresh } from 'hooks/use-refresh';
import { Stack } from 'immutable';
import { enqueueSnackbar } from 'notistack';
import { PatchAccountCurrentWithdrawn } from 'package/api/account/current/withdrawn';
import { PostBankInfo } from 'package/api/bank-info-controller';
import { BankInfo } from 'package/api/bank-info-controller/current';
import { DelBankInfoById, PatchBankInfoById } from 'package/api/bank-info-controller/id';
import { useEffect, useMemo, useState } from 'react';
import { BankInfoCard } from './_component/BankInfoCard';
import { LoadingButton } from '@mui/lab';
import MainCard from 'ui-component/cards/MainCard';

interface BankInfoWithSelected extends BankInfo {
    selected: boolean;
}

const formatCurrency = (value: number) => {
    try {
        if (isNaN(value) || value === null || value === undefined) {
            return '0 đ';
        }
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    } catch (error) {
        console.error('Lỗi khi format currency:', error);
        return '0 đ';
    }
};

export default function TransactionWidthDrawPage() {
    const { refresh, refreshTime } = useRefresh();
    const { expertToken } = ExpertToken();
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const { bankInfo } = useGetBankInfoCurrent(expertToken, refreshTime);
    const [bankInfoList, setBankInfoList] = useState<BankInfoWithSelected[]>([]);
    const { balance } = useGetBalance(expertToken);
    const [loading, setLoading] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedBankIndex, setSelectedBankIndex] = useState<number | null>(null)

    useEffect(() => {
        console.log("balance:", balance);
        setBankInfoList(bankInfo.map(bank => ({ ...bank, selected: false })));
    }, [bankInfo, balance]);

    const selectedBank = useMemo(() => bankInfoList.find(info => info.selected), [bankInfoList]);

    const updateBankInfo = async (index: number, bankCode: string, numberCard: string, nameHolder: string) => {
        try {
            const { id } = bankInfoList[index];
            const response = await PatchBankInfoById({ id, bankCode, numberCard, nameHolder }, expertToken);
            if (response.status === 'success') {
                enqueueSnackbar('Cập nhật thông tin ngân hàng thành công', { variant: 'success' });
            } else {
                enqueueSnackbar(response.responseText, { variant: 'error' });
            }
        } catch {
            enqueueSnackbar('Lỗi khi cập nhật thông tin ngân hàng', { variant: 'error' });
        } finally {
            refresh();
        }
    };

    const handleOpenDeleteDialog = (index: number) => {
        setSelectedBankIndex(index);
        setOpenDeleteDialog(true);
    };

    const handleDeleteBank = async () => {
        if (selectedBankIndex !== null) {
            setLoading(true);
            try {
                const { id } = bankInfoList[selectedBankIndex];
                const response = await DelBankInfoById({ id }, expertToken);
                if (response.status === 'success') {
                    enqueueSnackbar('Xóa thông tin ngân hàng thành công', { variant: 'success' });
                    setBankInfoList(prev => prev.filter((_, i) => i !== selectedBankIndex));

                } else {
                    enqueueSnackbar(response.responseText, { variant: 'error' });
                }
            } catch {
                enqueueSnackbar('Lỗi khi xóa thông tin ngân hàng', { variant: 'error' });
            } finally {
                setLoading(false);
                setOpenDeleteDialog(false);
                refresh();
            }
        }
    };

    const handleAddNewPaymentInfo = async (index: number, bankCode: string, numberCard: string, nameHolder: string) => {
        setLoading(true);
        try {
            const response = await PostBankInfo({ bankCode, numberCard, nameHolder }, expertToken);
            if (response.status === 'success') {
                enqueueSnackbar('Thêm mới thông tin ngân hàng thành công', { variant: 'success' });
                refresh();
            } else {
                enqueueSnackbar(response.responseText, { variant: 'error' });
            }
        } catch {
            enqueueSnackbar('Lỗi khi thêm mới thông tin ngân hàng', { variant: 'error' });
        } finally {
            removeBankInfoCard(index);
            setLoading(false);
        }
    };

    const confirmWithdraw = async () => {

        // const amountToSend = parseFloat(withdrawAmount.replace(/[^0-9.]/g, ''));
        // console.log("parseFloat(withdrawAmount.replace(/,/g, '')):", amountToSend);
        if (!selectedBank || !withdrawAmount) {
            enqueueSnackbar('Vui lòng chọn tài khoản ngân hàng và nhập số tiền rút', { variant: 'warning' });
            return;
        }
        try {
            const response = await PatchAccountCurrentWithdrawn({
                amount: +withdrawAmount,
                description: "Yêu cầu rút tiền từ chuyên gia",
                bankInfoId: selectedBank.id
            }, expertToken);
            if (response.status === 'success') {
                enqueueSnackbar('Yêu cầu rút tiền thành công', { variant: 'success' });
            } else {
                enqueueSnackbar(response.responseText, { variant: 'error' });
            }
        } catch (error) {
            enqueueSnackbar('Lỗi khi tạo yêu cầu rút tiền', { variant: 'error' });
        } finally {
            setOpenWithdrawDialog(false);
            setWithdrawAmount("");
        }
    };

    const addNewBankInfo = () => {
        setBankInfoList(prev => [
            ...prev,
            { id: Date.now(), bankCode: '', numberCard: '', nameHolder: '', status: 0, selected: false }
        ]);
    };

    const removeBankInfoCard = (index: number) => {
        setBankInfoList((prev) => prev.filter((_, i) => i !== index));
    };

    const selectBankCard = (index: number) => {
        setBankInfoList(prev =>
            prev.map((info, i) => ({ ...info, selected: i === index }))
        );
    };

    const handleWithdrawRequest = () => {
        if (!selectedBank) {
            enqueueSnackbar('Vui lòng chọn một tài khoản ngân hàng để tạo yêu cầu rút tiền', { variant: 'warning' });
        } else {
            setOpenWithdrawDialog(true);
        }
    };

    // const handleAmountChange = (e: any) => {
    //     setWithdrawAmount(formatCurrency(e.target.value));
    // };

    const SkeletonBankCards = () => {
        return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, width: '100%', justifyContent: "center", alignItems: "center", my: 2 }}>
                {Array.from(new Array(4)).map((_, index) => (
                    <MainCard
                        key={index}
                        sx={{
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.01)',
                            },
                            position: 'relative',
                            width: '100%',
                            maxWidth: '48%',
                            marginBottom: '20px',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                            <Skeleton variant="rectangular" height={40} width="100%" />
                            <Skeleton variant="rectangular" height={40} width="100%" />
                            <Skeleton variant="rectangular" height={40} width="100%" />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Skeleton variant="rectangular" height={40} width="45%" />
                            <Skeleton variant="rectangular" height={40} width="45%" />
                        </Box>
                    </MainCard>
                ))}
            </Box>
        );
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            p: 2,
                            backgroundColor: 'background.paper',
                            borderRadius: 1,
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h5" sx={{ mr: 1 }}>
                                Số tiền trong ví :
                            </Typography>
                            {balance ? (
                                <Typography variant="h5" color="primary">
                                    {formatCurrency(balance.balance)}
                                </Typography>
                            ) : (
                                <CircularProgress size={24} />
                            )}
                        </Box>
                        <Button variant="outlined" color="primary" onClick={addNewBankInfo}>
                            Tạo mới thông tin ngân hàng
                        </Button>
                    </Box>
                </Grid>

                {bankInfoList.length > 0 ? (bankInfoList.map((bankInfo, index) => (
                    <Grid item xs={6} key={index}>
                        <BankInfoCard
                            bankCode={bankInfo.bankCode}
                            numberCard={bankInfo.numberCard}
                            nameHolder={bankInfo.nameHolder}
                            bankInfoStatus={bankInfo.status}
                            selected={bankInfo.selected}
                            onSave={(bankCode, numberCard, nameHolder) => updateBankInfo(index, bankCode, numberCard, nameHolder)}
                            onAdd={(bankCode, numberCard, nameHolder) => handleAddNewPaymentInfo(index, bankCode, numberCard, nameHolder)}
                            onDelete={() => handleOpenDeleteDialog(index)}
                            onClick={() => selectBankCard(index)}
                            onRemove={() => removeBankInfoCard(index)}
                        />
                    </Grid>
                ))) : (SkeletonBankCards())}

                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleWithdrawRequest}>
                            Tạo yêu cầu rút tiền
                        </Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Dialog xác nhận rút tiền */}
            <Dialog open={openWithdrawDialog} onClose={() => setOpenWithdrawDialog(false)}>
                <DialogTitle>Xác nhận thông tin tài khoản và số tiền rút</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Ngân hàng"
                        value={selectedBank?.bankCode || ""}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Số tài khoản"
                        value={selectedBank?.numberCard || ""}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Tên tài khoản"
                        value={selectedBank?.nameHolder || ""}
                        fullWidth
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Số tiền cần rút"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenWithdrawDialog(false)}>Đóng</Button>
                    <LoadingButton onClick={confirmWithdraw} variant="contained" color="primary" loading={loading}>Tạo yêu cầu rút tiền</LoadingButton>
                </DialogActions>
            </Dialog>

            {/* Dialog Xác nhận xóa thẻ */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Xác nhận xóa thẻ thông tin ngân hàng</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn thông tin ngân hàng này không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Đóng
                    </Button>
                    <LoadingButton
                        onClick={handleDeleteBank}
                        color="info"
                        loading={loading}
                    >
                        Xóa thẻ
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Box>
    );
}




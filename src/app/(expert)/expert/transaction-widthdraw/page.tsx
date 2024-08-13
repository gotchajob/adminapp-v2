"use client";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useMemo, useState } from 'react';
import { BankInfoCard } from './_component/BankInfoCard';

const initialBankInfoData = [
    { bankName: "ACB", bankAccount: "123", selected: false },
    { bankName: "AGR", bankAccount: "456", selected: false }
];

export default function TransactionWidthDrawPage() {
    const [bankInfoList, setBankInfoList] = useState(initialBankInfoData);
    const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const selectedBank = useMemo(() => bankInfoList.find((info) => info.selected), [bankInfoList]);

    const updateBankInfo = (index: number, bankName: string, bankAccount: string) => {
        setBankInfoList(prev =>
            prev.map((info, i) => i === index ? { ...info, bankName, bankAccount } : info)
        );
    };

    const addNewBankInfo = () => {
        setBankInfoList(prev => [...prev, { bankName: '', bankAccount: '', selected: false }]);
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

    const formatCurrency = (value: string) => {
        return new Intl.NumberFormat('vi-VN').format(Number(value.replace(/\D/g, '')));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWithdrawAmount(formatCurrency(e.target.value));
    };

    const confirmWithdraw = () => {
        console.log('Yêu cầu rút tiền đã được tạo cho tài khoản:', selectedBank, 'Số tiền rút:', withdrawAmount);
        setOpenWithdrawDialog(false);
        setWithdrawAmount("");
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" color="primary" onClick={addNewBankInfo}>
                            Tạo mới thông tin ngân hàng
                        </Button>
                    </Box>
                </Grid>

                {bankInfoList.map((bankInfo, index) => (
                    <Grid item xs={6} key={index}>
                        <BankInfoCard
                            bankName={bankInfo.bankName}
                            bankAccount={bankInfo.bankAccount}
                            selected={bankInfo.selected}
                            onSave={(name, account) => updateBankInfo(index, name, account)}
                            onClick={() => selectBankCard(index)}
                        />
                    </Grid>
                ))}

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
                        value={selectedBank?.bankName || ""}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Số tài khoản"
                        value={selectedBank?.bankAccount || ""}
                        fullWidth
                        margin="normal"
                        disabled
                    />
                    <TextField
                        label="Số tiền cần rút"
                        value={withdrawAmount}
                        onChange={handleAmountChange}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenWithdrawDialog(false)}>Đóng</Button>
                    <Button onClick={confirmWithdraw} variant="contained" color="primary">Tạo yêu cầu rút tiền</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
"use client";

import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import { BankInfoCard } from './_component/BankInfoCard';
import { enqueueSnackbar } from 'notistack';

const bankInfoData = [
    { bankName: "ACB", bankAccount: "123", selected: false },
    { bankName: "AGR", bankAccount: "456", selected: false }
]

export default function TransactionWidthDrawPage() {
    const [bankInfoList, setBankInfoList] = useState<{ bankName: string, bankAccount: string, selected: boolean }[]>(bankInfoData);

    const handleSaveBankInfo = (index: number, bankName: string, bankAccount: string) => {
        const updatedBankInfoList = bankInfoList.map((info, i) =>
            i === index ? { ...info, bankName, bankAccount } : info
        );
        setBankInfoList(updatedBankInfoList);
    };

    const handleCreateNewBankInfo = () => {
        setBankInfoList([...bankInfoList, { bankName: '', bankAccount: '', selected: false }]);
    };

    const handleCardClick = (index: number) => {
        const updatedBankInfoList = bankInfoList.map((info, i) => ({
            ...info,
            selected: i === index
        }));
        setBankInfoList(updatedBankInfoList);
    };

    const handleWithdrawRequest = () => {
        const selectedBank = bankInfoList.find((info) => info.selected === true);
        if (!selectedBank) {
            enqueueSnackbar('Vui lòng chọn một tài khoản ngân hàng để tạo yêu cầu rút tiền', {
                variant: 'warning',
            });
        } else {
            console.log('Yêu cầu rút tiền đã được tạo cho tài khoản:', selectedBank);
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="outlined" color="primary" onClick={handleCreateNewBankInfo}>
                            Tạo mới thông tin ngân hàng
                        </Button>
                    </Box>
                </Grid>

                {bankInfoList.map((bankInfo, index) => (
                    <Grid item xs={12} key={index}>
                        <BankInfoCard
                            bankName={bankInfo.bankName}
                            bankAccount={bankInfo.bankAccount}
                            selected={bankInfo.selected}
                            onSave={(name, account) => handleSaveBankInfo(index, name, account)}
                            onClick={() => handleCardClick(index)}
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
        </Box>
    );
}

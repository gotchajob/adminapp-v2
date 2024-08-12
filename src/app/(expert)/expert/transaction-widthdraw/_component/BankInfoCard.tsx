import { Box, Button, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

interface BankInfoCardProps {
    bankName: string;
    bankAccount: string;
    selected: boolean;
    onSave: (bankName: string, bankAccount: string) => void;
    onClick: () => void;
}

export function BankInfoCard({ bankName: initialBankName, bankAccount: initialBankAccount, selected, onSave, onClick }: BankInfoCardProps) {
    const [bankName, setBankName] = useState(initialBankName);

    const [bankAccount, setBankAccount] = useState(initialBankAccount);

    useEffect(() => {
        setBankName(initialBankName);
        setBankAccount(initialBankAccount);
    }, [initialBankName, initialBankAccount]);

    const handleSave = () => {
        onSave(bankName, bankAccount);
    };

    return (
        <MainCard
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                },
                border: selected ? '2px solid blue' : 'none',
                boxShadow: selected ? '0 0 10px rgba(33, 150, 243, 1)' : 'none',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                <TextField
                    label="Tên Ngân hàng"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Số tài khoản Ngân hàng"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    fullWidth
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary" onClick={handleSave}>
                    Xóa thẻ
                </Button>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    Lưu thông tin
                </Button>
            </Box>
        </MainCard>
    );
}
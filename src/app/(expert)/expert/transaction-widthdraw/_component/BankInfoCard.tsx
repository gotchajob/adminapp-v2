import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Box, Button, Skeleton, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

interface BankInfoCardProps {
    bankCode: string;
    numberCard: string;
    nameHolder: string;
    selected: boolean;
    bankInfoStatus: number;
    onSave: (bankCode: string, numberCard: string, nameHolder: string) => void;
    onAdd: (bankCode: string, numberCard: string, nameHolder: string) => void;
    onDelete: () => void;
    onClick: () => void;
    onRemove: () => void;
}

export function BankInfoCard({
    bankCode: initialBankCode,
    numberCard: initialNumberCard,
    nameHolder: initialNameHolder,
    bankInfoStatus,
    selected,
    onAdd,
    onSave,
    onDelete,
    onClick,
    onRemove,
}: BankInfoCardProps) {
    const [bankCode, setBankCode] = useState(initialBankCode);
    const [numberCard, setNumberCard] = useState(initialNumberCard);
    const [nameHolder, setNameHolder] = useState(initialNameHolder);

    useEffect(() => {
        setBankCode(initialBankCode);
        setNumberCard(initialNumberCard);
        setNameHolder(initialNameHolder);
    }, [initialBankCode, initialNumberCard, initialNameHolder]);

    const handleDelete = () => {
        if (bankInfoStatus !== 1) {
            onRemove();
        } else {
            onDelete();
        }
    };

    const handleOnClick = () => {
        if (bankCode && numberCard && nameHolder) {
            onClick();
        }
    };

    return (
        <MainCard
            onClick={handleOnClick}
            sx={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.01)',
                },
                position: 'relative',
                border: bankInfoStatus === 1 && selected ? '2px solid blue' : 'none',
                boxShadow: bankInfoStatus === 1 && selected ? '0 0 10px rgba(33, 150, 243, 1)' : 'none',
            }}
        >
            {bankInfoStatus === 1 && selected && (
                <TaskAltIcon
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'rgba(33, 150, 243, 1)',
                        fontSize: 24,
                    }}
                />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
                <TextField
                    label="Tên Ngân hàng"
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Số tài khoản Ngân hàng"
                    value={numberCard}
                    onChange={(e) => setNumberCard(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Tên chủ thẻ"
                    value={nameHolder}
                    onChange={(e) => setNameHolder(e.target.value)}
                    fullWidth
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" color="primary" onClick={handleDelete}>
                    Xóa thẻ
                </Button>
                {bankInfoStatus === 1 ? (
                    <Button variant="contained" color="primary" onClick={() => onSave(bankCode, numberCard, nameHolder)} >
                        Lưu thông tin
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={() => onAdd(bankCode, numberCard, nameHolder)} disabled={!bankCode || !numberCard || !nameHolder}>
                        Thêm thông tin thanh toán mới
                    </Button>
                )}
            </Box>
        </MainCard >
    );
}
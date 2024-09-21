import { Box, Chip, IconButton, Tooltip, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { Transaction } from 'package/api/transaction';
import { formatDate } from 'package/util';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';

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

export const TransactionTableRender = ({
    transactionList,
}: {
    transactionList: Transaction[];
}) => {
    const theme = useTheme();

    const transactionType = (status: number) => {
        switch (status) {
            case 1:
                return (
                    <Chip
                        label="Thành công"
                        color="success"
                    />
                );
            case 2:
                return (
                    <Chip
                        label="Đang xử lý"
                        color="warning"
                    />
                );
            case 3:
                return (
                    <Chip
                        label="Thất bại"
                        color="error"
                    />
                );
            default:
                return (
                    <Chip
                        label="Không xác định"
                        color="default"
                    />
                );
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Mã giao dịch',
            flex: 1,
        },
        {
            field: 'amount',
            headerName: 'Số tiền',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: 'break-word', whiteSpace: 'normal' }}>
                    {formatCurrency(params.value)}
                </Box>
            ),
        },
        {
            field: 'typeId',
            headerName: 'Loại giao dịch',
            flex: 1,
            renderCell: (params) => transactionType(params.value),
        },
        {
            field: 'description',
            headerName: 'Mô tả',
            flex: 2,
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return transactionList.filter((transaction) =>
            transaction.id.toString().includes(lowerCaseText) ||
            transaction.amount.toString().includes(lowerCaseText) ||
            transactionType(transaction.typeId).props.label.toLowerCase().includes(lowerCaseText) ||
            transaction.description.toLowerCase().includes(lowerCaseText) ||
            formatDate(transaction.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText)
        );
    }, [text, transactionList]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} />
                </FlexBox>
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((data, index) => ({
            ...data,
            object: JSON.stringify(data),
        })),
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};

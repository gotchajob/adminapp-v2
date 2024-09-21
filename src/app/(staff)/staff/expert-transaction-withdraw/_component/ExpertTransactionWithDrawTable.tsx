import { Box, Button, Grid, Input, IconButton, Tooltip, Stack, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { formatDate } from 'package/util';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Transaction } from 'package/api/transaction';
import { TransactionTypeRes } from 'package/api/transaction-type';

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

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Thành công" color="success" />;
        case 2:
            return <Chip label="Đang xử lý" color="warning" />;
        case 3:
            return <Chip label="Thất bại" color="error" />;
        default:
            return <Chip label="Unknown" />;
    }
};

export const RenderExpertTransactionWithDrawTable = ({
    transaction,
    transactionType,
    handleApprove,
    handleReject
}: {
    transaction: Transaction[],
    transactionType: TransactionTypeRes[],
    handleApprove: (transactionId: number) => void,
    handleReject: (transactionId: number) => void
}) => {

    // Define the columns for the DataGrid
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID Giao Dịch',
            flex: 1
        },
        {
            field: 'amount',
            headerName: 'Số Tiền Giao Dịch',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ fontWeight: 'bold', color: '#00796b' }}>
                    {formatCurrency(params.value)}
                </Box>
            )

        },
        {
            field: 'typeId',
            headerName: 'Loại Giao Dịch',
            flex: 1,
            renderCell: (params) => {
                const type = transactionType.find((type) => type.id === params.value);
                return <Box>{type ? type.description : "Không xác định"}</Box>;
            }
        },
        {
            field: 'description',
            headerName: 'Mô Tả',
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Trạng Thái',
            flex: 1,
            renderCell: (params) => {
                switch (params.value) {
                    case 1:
                        return <Chip label="Thành công" color="success" />;
                    case 2:
                        return <Chip label="Đang xử lý" color="warning" />;
                    case 3:
                        return <Chip label="Thất bại" color="error" />;
                    default:
                        return <Chip label="Unknown" />;
                }
            }
        },
        {
            field: 'createdAt',
            headerName: 'Ngày Thực Hiện',
            flex: 1,
            renderCell: (params) => formatDate(params.value, 'dd/MM/yyyy hh:mm')
        },
        {
            field: 'actions',
            headerName: 'Hành Động',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Tooltip title="Duyệt yêu cầu">
                        <IconButton
                            sx={{ color: '#2196F3' }}
                            onClick={() => handleApprove(params.row.id)}
                        >
                            <BeenhereIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Từ chối yêu cầu">
                        <IconButton
                            sx={{ color: '#F44336' }}
                            onClick={() => handleReject(params.row.id)}
                        >
                            <CancelPresentationIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ];

    // Filter functionality
    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();

        return transaction.filter((trans) => {
            const transactionTypeDescription = transactionType.find(type => type.id === trans.typeId)?.description.toLowerCase() || '';
            const formattedDate = formatDate(trans.createdAt, "dd/MM/yyyy hh:mm").toLowerCase();
            const formattedAmount = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(trans.amount).toLowerCase();
            return (
                trans.id.toString().toLowerCase().includes(lowerCaseText) ||
                trans.description.toLowerCase().includes(lowerCaseText) ||
                transactionTypeDescription.includes(lowerCaseText) ||
                formattedDate.includes(lowerCaseText) ||
                formattedAmount.includes(lowerCaseText) ||
                renderStatusChip(trans.status).props.label.toLowerCase().includes(lowerCaseText)
            );
        });
    }, [text, transaction, transactionType]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} placeholder="Tìm kiếm..." />
                </FlexBox>
            </Grid>
            <Grid item xs={12} lg={8}>
                <FlexBox justifyContent={'right'}>
                    {/* Additional actions can be added here */}
                </FlexBox>
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((data) => ({
            ...data,
            object: JSON.stringify(data),
        }))
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};

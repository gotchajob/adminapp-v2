
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridHeader, DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { TransactionCurrentWithdrawRes } from 'package/api/transaction/current/withdraw';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { formatDate } from 'package/util';
import { TransactionTypeRes } from 'package/api/transaction-type';

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

export const RenderTransactionCurrentWithdrawTable = ({ transactionCurrentWithdraw, transactionType }: { transactionCurrentWithdraw: TransactionCurrentWithdrawRes, transactionType: TransactionTypeRes[] }) => {

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
        },
        {
            field: "typeId",
            headerName: "Loại Giao Dịch",
            flex: 1,
            renderCell: (params) => {
                const transaction = transactionType.find(t => t.id === params.value);
                return (
                    <Chip label={transaction ? transaction.description : "Không xác định"} color="info" />
                );
            }
        },
        {
            field: "description",
            headerName: "Mô Tả",
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: "status",
            headerName: "Trạng thái",
            flex: 1,
            renderCell: (params) => renderStatusChip(params.value),
        },
        {
            field: "createdAt",
            headerName: "Ngày Thực Hiện Giao Dịch",
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        // {
        //     field: "object",
        //     headerName: "Thao tác",
        //     flex: 1,
        //     renderCell: (params) =>
        //         <Tooltip title="Xem Chi Tiết">
        //             <IconButton onClick={() => handleClick(params.value)} sx={{ color: "#2196F3" }}>
        //                 <VisibilityIcon />
        //             </IconButton>
        //         </Tooltip>
        // },
    ]

    const handleClick = (params: any) => {
        console.log("Params:", JSON.parse(params));
    }

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...transactionCurrentWithdraw.list];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                if (dateA < dateB) {
                    return 1
                } else {
                    return -1;
                }
            }).filter((row) => {
                const transaction = transactionType.find(t => t.id === row.typeId);
                return (
                    transaction?.description.toLowerCase().includes(lowerCaseText) ||
                    row.description.toLowerCase().includes(lowerCaseText) ||
                    renderStatusChip(row.status).props.label.toLowerCase().includes(lowerCaseText) ||
                    formatDate(row.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, transactionCurrentWithdraw, transactionType]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} />
                </FlexBox>
            </Grid>
            <Grid item xs={12} lg={8}>
                <FlexBox justifyContent={'right'}>
                    {/* <Button variant="outlined" onClick={handleExportExcel}>
                        Excel
                    </Button> */}
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


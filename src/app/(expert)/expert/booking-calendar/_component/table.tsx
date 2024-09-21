import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import Link from 'next/link';
import { BookingCurrent } from 'package/api/booking/expert/current';
import { formatDate } from 'package/util';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';

const getStatusLabel = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Chờ xác nhận của chuyên gia" color="warning" />;
        case 2:
            return <Chip label="Chờ phỏng vấn" color="info" />;
        case 3:
            return <Chip label="Đang phỏng vấn" color="primary" />;
        case 4:
            return <Chip label="Chờ phản hồi" color="default" />;
        case 5:
            return <Chip label="Hoàn thành" color="success" />;
        case 6:
            return <Chip label="Hủy bởi khách hàng" color="error" />;
        case 7:
            return <Chip label="Hủy bởi chuyên gia" color="error" />;
        case 8:
            return <Chip label="Từ chối" color="error" />;
        default:
            return <Chip label="Trạng thái không xác định" color="default" />;
    }
};

const isToday = (date: string) => {
    const today = new Date();
    const formattedToday = formatDate(today.toISOString(), "dd-MM-yyyy");
    const formattedDate = formatDate(date, "dd-MM-yyyy");
    return formattedDate === formattedToday;
};

export const RenderCustomerBookingsTable = ({
    bookings,
    handleOpenDialog,
}: {
    bookings: BookingCurrent[];
    handleOpenDialog: (id: number, type: 'accept' | 'reject' | 'ban') => void;
}) => {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5
        },
        {
            field: 'customerInfo',
            headerName: 'Tên khách hàng',
            flex: 1.2,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'startInterviewDate',
            headerName: 'Thời điểm bắt đầu',
            flex: 1.3,
            renderCell: (params) => {
                return (
                    <Box sx={{
                        whiteSpace: 'normal',
                        wordWrap: 'break-word',
                        backgroundColor: isToday(params.value) ? 'success.main' : 'transparent'
                    }}>
                        {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                    </Box>
                );
            }
        },
        {
            field: 'endInterviewDate',
            headerName: 'Thời điểm kết thúc',
            flex: 1.3,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Thời điểm tạo',
            flex: 1.3,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: 'note',
            headerName: 'Chú thích',
            flex: 1.5,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {params.value ? params.value : "Không có chú thích"}
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {getStatusLabel(params.value)}
                </Box>
            )
        },
        {
            field: 'object',
            headerName: 'Thao tác',
            flex: 1.5,
            renderCell: (params) => (
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton
                            color="default"
                            component={Link}
                            href={`/expert/booking-calendar/${params.row.id}`}
                        >
                            <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chấp nhận">
                        <IconButton
                            color="primary"
                            onClick={() => handleOpenDialog(params.row.id, 'accept')}
                            disabled={!(params.row.status === 1)}
                        >
                            <CheckIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Từ chối">
                        <IconButton
                            color="secondary"
                            onClick={() => handleOpenDialog(params.row.id, 'reject')}
                            disabled={!(params.row.status === 1 || params.row.status === 2)}
                        >
                            <CloseIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Chặn">
                        <IconButton
                            color="error"
                            onClick={() => handleOpenDialog(params.row.id, 'ban')}
                            disabled={!(params.row.status === 1 || params.row.status === 2 || params.row.status === 3)}
                        >
                            <BlockIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                    </Tooltip> */}
                </>
            ),
        },
    ];

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookings];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) => {
                return (
                    row.customerInfo.fullName.toLowerCase().includes(lowerCaseText) ||
                    getStatusLabel(row.status).props.label.toLowerCase().includes(lowerCaseText) ||
                    formatDate(row.startInterviewDate, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    formatDate(row.endInterviewDate, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    formatDate(row.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, bookings]);

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
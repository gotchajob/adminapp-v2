import { Button, Grid, Input, Chip, IconButton, Tooltip, Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import VisibilityIcon from '@mui/icons-material/Visibility';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Link from 'next/link';

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Đang xử lý" color="primary" />;
        case 2:
            return <Chip label="Chuyên gia đang xử lý" color="warning" />;
        case 3:
            return <Chip label="Nhân viên đang xử lý" color="info" />;
        case 4:
            return <Chip label="Đã chấp nhận" color="success" />;
        case 5:
            return <Chip label="Đã từ chối" color="error" />;
        default:
            return <Chip label="Không xác định" color="default" />;
    }
};

export const BookingReportTableRender = ({
    bookingReport,
    handleViewDetails,
    handleNotifyExpert,
    handleAcceptReport,
    handleRejectReport
}: {
    bookingReport: any[],
    handleViewDetails: (id: number) => void,
    handleNotifyExpert: (id: number) => void,
    handleAcceptReport: (id: number) => void,
    handleRejectReport: (id: number) => void
}) => {
    const columns: GridColDef[] = [
        { field: 'bookingId', headerName: 'ID', flex: 0.5 },
        {
            field: 'customerContent', headerName: 'Báo cáo của khách hàng', flex: 1.5,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'expertContent', headerName: 'Báo cáo từ chuyên gia', flex: 2,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'staffNote', headerName: 'Staff note', flex: 1.5,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value}
                </Box>
            )
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1.5,
            renderCell: (params) => renderStatusChip(params.row.status),
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1.5,
            renderCell: (params) => (
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton color="primary" component={Link} onClick={() => handleViewDetails(params.row.id)} href={`/staff/booking-report/${params.row.id}`}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Thông báo cho chuyên gia">
                        <IconButton color="primary" onClick={() => handleNotifyExpert(params.row.id)} disabled={params.row.status !== 1 && params.row.status !== 2}>
                            <NotificationsActiveIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Chấp nhận">
                        <IconButton color="success" onClick={() => handleAcceptReport(params.row.id)} disabled={params.row.status !== 3}>
                            <CheckCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Từ chối">
                        <IconButton color="error" onClick={() => handleRejectReport(params.row.id)} disabled={params.row.status !== 3}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookingReport];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) =>
                row.id.toString().includes(lowerCaseText) ||
                row.customerContent.toLowerCase().includes(lowerCaseText) ||
                row.expertContent.toLowerCase().includes(lowerCaseText) ||
                row.staffNote.toLowerCase().includes(lowerCaseText)
            );
        }
        return data;
    }, [text, bookingReport]);

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
                    {/* Bạn có thể thêm nút khác tại đây */}
                </FlexBox>
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((data) => ({
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

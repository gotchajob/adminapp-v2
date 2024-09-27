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
import { BookingReportForExpert } from 'package/api/booking-report/for-expert';
import Link from 'next/link';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import { formatDate } from 'package/util';

// const renderStatusChip = (status: number) => {
//     switch (status) {
//         case 1:
//             return <Chip label="Processing" color="primary" />;
//         case 2:
//             return <Chip label="Expert Processing" color="warning" />;
//         case 3:
//             return <Chip label="Staff Processing" color="info" />;
//         case 4:
//             return <Chip label="Approved" color="success" />;
//         case 5:
//             return <Chip label="Rejected" color="error" />;
//         default:
//             return <Chip label="Unknown" color="default" />;
//     }
// };

const renderStatusChip = (status: number) => {
    switch (status) {
        case 1:
            return <Chip label="Đang xử lí" color="primary" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 2:
            return <Chip label="Chờ chuyên gia phản hồi" color="warning" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 3:
            return <Chip label="Chờ nhân viên phản hồi" color="info" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 4:
            return <Chip label="Duyệt" color="success" sx={{ fontWeight: 'bold', color: 'white' }} />;
        case 5:
            return <Chip label="Không duyệt" color="error" sx={{ fontWeight: 'bold', color: 'white' }} />;
        default:
            return <Chip label="Unknown" color="default" sx={{ fontWeight: 'bold', color: 'white' }} />;
    }
};

export const RenderBookingReportForExpertTable = ({ bookingReportForExpert, handelUpdateEvidence }: { bookingReportForExpert: BookingReportForExpert[], handelUpdateEvidence: (report: any) => void }) => {

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "bookingReportSuggest",
            headerName: "Đề xuất",
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ maxWidth: 300, wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value.map((suggest: any) => (
                        <div key={suggest.id}>{suggest.reportSuggest}</div>
                    ))}
                </Box>
            )
        },
        {
            field: "createdAt",
            headerName: "Ngày tạo báo cáo'",
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: "status",
            headerName: "Trạng thái",
            flex: 1,
            renderCell: (params) => renderStatusChip(params.value),
        },
        {
            field: "updatedAt",
            headerName: "Ngày Cập Nhật Báo Cáo",
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd/MM/yyyy hh:mm')}
                </Box>
            ),
        },
        {
            field: "object",
            headerName: "Thao tác",
            flex: 1,
            renderCell: (params) =>
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton color="primary" component={Link} href={`/expert/booking-report/${params.row.id}`}>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Cập nhật bằng chứng">
                        <IconButton color="primary" onClick={() => handelUpdateEvidence(params.row)} disabled={params.row.status !== 2}>
                            <AddToDriveIcon />
                        </IconButton>
                    </Tooltip>
                </>
        },
    ]

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...bookingReportForExpert];
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
                return (
                    row.bookingReportSuggest.some((suggest: any) =>
                        suggest.reportSuggest.toLowerCase().includes(lowerCaseText)
                    ) ||
                    renderStatusChip(row.status)?.props.label.toLowerCase().includes(lowerCaseText) ||
                    formatDate(row.createdAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText) ||
                    formatDate(row.updatedAt, 'dd/MM/yyyy hh:mm').includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, bookingReportForExpert]);


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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Chip, IconButton, Tooltip, Button, Grid, Input, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import { formatDate } from 'package/util';
import { ExpertRegister } from 'package/api/expert-register-request';

const getStatusText = (status: number) => {
    switch (status) {
        case 0:
            return "Đã khóa";
        case 1:
            return "Chờ xử lí";
        case 2:
            return "Đã gửi form đăng kí";
        case 3:
            return "Chờ duyệt form";
        case 4:
            return "Chờ cập nhật";
        case 5:
            return "Hoàn tất";
        default:
            return "Unknown";
    }
};

const StatusChip = ({ status }: { status: number }) => {
    const props = { label: "", variant: "" };
    switch (status) {
        case 0:
            props.label = "Đã khóa";
            props.variant = "error";
            break;
        case 1:
            props.label = "Chờ xử lí";
            props.variant = "warning";
            break;
        case 2:
            props.label = "Đã gửi form đăng kí";
            props.variant = "success";
            break;
        case 3:
            props.label = "Chờ duyệt form";
            props.variant = "success";
            break;
        case 4:
            props.label = "Chờ cập nhật";
            props.variant = "warning";
            break;
        case 5:
            props.label = "Hoàn tất";
            props.variant = "success";
            break;
    }
    return <Chip label={props.label} color={props.variant as any} />;
};

export const RendeExpertRequestTable = ({
    expertRegisterRequest,
    handleApprove,
    handleReject,
    handleSendForm,
    handleBan
}: {
    expertRegisterRequest: ExpertRegister[],
    handleApprove: (row: ExpertRegister) => void,
    handleReject: (row: ExpertRegister) => void,
    handleSendForm: (row: ExpertRegister) => void,
    handleBan: (row: ExpertRegister) => void
}) => {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Mã',
            flex: 0.5,
        },
        {
            field: 'email',
            headerName: 'Email đăng kí',
            flex: 1.5,
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd-MM-yyyy')}
                </Box>
            ),
        },
        {
            field: 'updatedAt',
            headerName: 'Ngày cập nhật',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd-MM-yyyy')}
                </Box>
            ),
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params) => <StatusChip status={params.value} />,
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center">
                    {params.row.status === 3 && (
                        <Tooltip title="Duyệt">
                            <IconButton
                                color="success"
                                size="large"
                                onClick={() => handleApprove(params.row)}
                            >
                                <DoneAllTwoToneIcon sx={{ fontSize: "1.1rem" }} />
                            </IconButton>
                        </Tooltip>
                    )}
                    {params.row.status === 1 && (
                        <Tooltip title="Gửi form đăng kí">
                            <IconButton
                                color="primary"
                                size="large"
                                onClick={() => handleSendForm(params.row)}
                            >
                                <EmailTwoToneIcon sx={{ fontSize: "1.1rem" }} />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Tooltip title="Chặn">
                        <IconButton
                            color="error"
                            size="large"
                            onClick={() => handleBan(params.row)}
                        >
                            <BlockTwoToneIcon sx={{ fontSize: "1.1rem" }} />
                        </IconButton>
                    </Tooltip>
                </Stack>
            ),
        },
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return expertRegisterRequest.filter((request) => {
            return (
                request.email.toLowerCase().includes(lowerCaseText) ||
                request.id.toString().toLowerCase().includes(lowerCaseText) ||
                getStatusText(request.status).toLowerCase().includes(lowerCaseText) ||
                formatDate(request.createdAt, 'dd-MM-yyyy').toLowerCase().includes(lowerCaseText) ||
                formatDate(request.updatedAt, 'dd-MM-yyyy').toLowerCase().includes(lowerCaseText)
            );
        });
    }, [text, expertRegisterRequest]);

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
                    {/* Nút hành động khác nếu cần */}
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

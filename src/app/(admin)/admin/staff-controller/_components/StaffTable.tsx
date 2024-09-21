import { Chip, IconButton, Stack, Switch, Tooltip, Typography } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Staff } from "package/api/staff/all";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from '@mui/icons-material/Visibility';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import EditIcon from '@mui/icons-material/Edit';

export const RenderStaffTable = ({
    staffs,
    onDisable,
    onEnable,
    onEdit
}: {
    staffs: Staff[];
    onDisable: (id: number, action: 'disable') => void;
    onEnable: (id: number, action: 'enable') => void;
    onEdit: (staff: Staff) => void;
}) => {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            renderCell: (params) => (
                <Typography variant="subtitle1">{params.value}</Typography>
            )
        },
        {
            field: 'fullName',
            headerName: 'Tên nhân viên',
            flex: 2,
            renderCell: (params) => (
                <Typography variant="subtitle1">{params.value}</Typography>
            )
        },
        {
            field: 'email',
            headerName: 'Tài khoản',
            flex: 2,
            renderCell: (params) => (
                <Typography variant="subtitle1">{params.value}</Typography>
            )
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params) => (
                <Chip
                    label={params.value === 1 ? 'Hoạt động' : 'Vô hiệu hóa'}
                    color={params.value === 1 ? 'success' : 'default'}
                    onClick={() => params.value === 1 ? onDisable(params.row.id, 'disable') : onEnable(params.row.id, 'enable')}
                    clickable
                />
            )
        },
        {
            field: 'object',
            headerName: 'Thao tác',
            flex: 1.5,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Tooltip title="Xem chi tiết">
                        <IconButton>
                            <VisibilityIcon />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Chỉnh sửa">
                        <IconButton onClick={() => onEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip> */}
                    {params.row.status === 1 ? (
                        <Tooltip title="Vô hiệu hóa">
                            <IconButton onClick={() => onDisable(params.row.id, 'disable')}>
                                <LockIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Kích hoạt">
                            <IconButton onClick={() => onEnable(params.row.id, 'enable')}>
                                <LockOpenIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            )
        }
    ];

    const props: DataGridTableProps = {
        columns,
        rows: staffs.map((data) => ({
            ...data,
            object: JSON.stringify(data),
        })),
    };

    return (
        <MainCard>
            <DataGridTable props={props} />
        </MainCard>
    );
};

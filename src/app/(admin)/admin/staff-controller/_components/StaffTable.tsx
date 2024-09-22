import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { Staff } from "package/api/staff/all";
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';

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
            field: 'name',
            headerName: 'Tên nhân viên',
            flex: 2,
            renderCell: (params) => (
                <Typography variant="subtitle1">{`${params.row.firstName} ${params.row.lastName}`}</Typography>
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
                    // onClick={() => params.value === 1 ? onDisable(params.row.id, 'disable') : onEnable(params.row.id, 'enable')}
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
                    <Tooltip title="Chỉnh sửa">
                        <IconButton onClick={() => onEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
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

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...staffs];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((row) => {
                const fullName = `${row.firstName.toLowerCase()} ${row.lastName.toLowerCase()}`;
                const statusText = row.status === 1 ? 'hoạt động' : 'vô hiệu hóa';
                return (
                    fullName.includes(lowerCaseText) ||
                    row.email.toLowerCase().includes(lowerCaseText) ||
                    row.id.toString().includes(lowerCaseText) ||
                    statusText.includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, staffs]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Input size="small" placeholder="Tìm kiếm..." onChange={handleChangeEventText} />
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

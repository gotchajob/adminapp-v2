import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import MainCard from 'ui-component/cards/MainCard';
import { IconButton, Tooltip, Chip, Stack, Typography } from '@mui/material';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useMemo } from 'react';
import { UserList } from 'package/api/user';

export const UserTableRender = ({
    userList,
    handleBan,
}: {
    userList: UserList[],
    handleBan: (id: number) => void,
}) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'fullName', headerName: 'Tên đầy đủ', flex: 2 },
        { field: 'email', headerName: 'Email', flex: 2 },
        {
            field: 'status', headerName: 'Trạng thái', flex: 1, renderCell: (params) => (
                <Chip
                    label={params.row.status === 1 ? 'Active' : params.row.status === 0 ? 'Ban' : 'Pending'}
                    color={params.row.status === 1 ? 'success' : params.row.status === 0 ? 'error' : 'warning'}
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Hành động',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    {params.row.status === 1 ? (
                        <Tooltip title="Ban User">
                            <IconButton color="primary" onClick={() => handleBan(params.row.id)}>
                                <BlockTwoToneIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Unban User">
                            <IconButton color="primary" onClick={() => handleBan(params.row.id)}>
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
        let data = [...userList];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((user) =>
                user.id.toString().includes(lowerCaseText) ||
                user.fullName.toLowerCase().includes(lowerCaseText) ||
                user.email.toLowerCase().includes(lowerCaseText)
            );
        }
        return data;
    }, [text, userList]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Input size="small" placeholder="Tìm kiếm..." onChange={handleChangeEventText} />
                </FlexBox>
            </Grid>
        </Grid>
    );

    // DataGrid table props
    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((user) => ({
            ...user,
            object: JSON.stringify(user),
        })),
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};

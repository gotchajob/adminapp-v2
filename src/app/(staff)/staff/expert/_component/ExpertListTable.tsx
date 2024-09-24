import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { UserList } from 'package/api/user';
import { formatDate } from 'package/util';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Stack } from '@mui/material';

export const RendeExpertListTable = ({
    expertList,
    setExpertBan,
    setExpertUnban,
}: {
    expertList: UserList[],
    setExpertBan: (expert: UserList) => void,
    setExpertUnban: (expert: UserList) => void,
}) => {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Mã chuyên gia',
            flex: 0.7,
        },
        {
            field: 'fullName',
            headerName: 'Tên',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1.5,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'phone',
            headerName: 'Số điện thoại',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'createdAt',
            headerName: 'Ngày đăng ký',
            flex: 1,
            renderCell: (params) => (
                <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {formatDate(params.value, 'dd-MM-yyyy')}
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center">
                    {params.row.status === 0 ? (
                        <Tooltip placement="top" title="Mở khóa">
                            <IconButton
                                color="primary"
                                aria-label="approve"
                                size="large"
                                onClick={() => setExpertUnban(params.row)}
                            >
                                <LockOpenIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip placement="top" title="Khóa">
                            <IconButton
                                color="primary"
                                sx={{
                                    color: 'orange.dark',
                                    borderColor: 'orange.main',
                                    '&:hover': { bgcolor: 'orange.light' },
                                }}
                                size="large"
                                onClick={() => setExpertBan(params.row)}
                            >
                                <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                        </Tooltip>
                    )}
                </Stack>
            ),
        },
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return expertList.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if (dateA < dateB) {
                return 1
            } else {
                return -1;
            }
        }).filter((expert) =>
            expert.id.toString().includes(lowerCaseText) ||
            expert.fullName.toLowerCase().includes(lowerCaseText) ||
            expert.email.toLowerCase().includes(lowerCaseText) ||
            expert.phone?.toLowerCase().includes(lowerCaseText) ||
            formatDate(expert.createdAt, 'dd-MM-yyyy').includes(lowerCaseText)
        );
    }, [text, expertList]);

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
                    {/* Các nút hành động khác nếu cần */}
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

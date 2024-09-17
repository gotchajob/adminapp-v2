import { Box, Button, Grid, Input, IconButton, Tooltip, Stack, Typography, Switch } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { formatDate } from 'package/util';
import { CVTemplateStaff } from 'package/api/cv-template/for-staff';
import Image from 'next/image';
import { StatusChip } from 'components/common/chip-status/status-chip';
import { CVCategory } from 'package/api/cv-category';

const StatusCV = (status: number) => {
    const switchStatus = [
        { label: 'Đã khóa', color: 'error' },
        { label: 'Hoạt động', color: 'success' }
    ];
    return (
        <StatusChip color={switchStatus[status].color} label={switchStatus[status].label} />
    );
};

export const RenderCVListTable = ({
    cvTemplateStaffList,
    cvCategory
}: {
    cvTemplateStaffList: CVTemplateStaff[],
    cvCategory: CVCategory[]
}) => {
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 1,
            renderCell: (params) => <Typography variant="subtitle1">{params.value}</Typography>
        },
        {
            field: 'name',
            headerName: 'Tên CV',
            flex: 2,
            renderCell: (params) => (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Image alt="CV image" src={params.row.image} width={50} height={50} />
                    <Typography variant="subtitle1">{params.value}</Typography>
                </Stack>
            ),
        },
        {
            field: 'cvCategoryId',
            headerName: 'Loại CV',
            flex: 2,
            renderCell: (params) => {
                // Tìm description từ danh sách cvCategory dựa trên cvCategoryId
                const category = cvCategory.find((item) => item.id === params.value)?.description;
                return <Typography>{category || 'Không xác định'}</Typography>;
            },
        },
        {
            field: 'numberUse',
            headerName: 'Số lượt sử dụng',
            flex: 1.5,
            renderCell: (params) => <Typography align="center">{params.value} lượt</Typography>,
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            flex: 1.5,
            renderCell: (params) => formatDate(params.value, 'dd-MM-yyyy'),
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params) => <Box>{StatusCV(params.value)}</Box>,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.5,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Switch checked={true} />
                </Stack>
            ),
        },
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return cvTemplateStaffList.filter((item) => {
            const categoryDescription = cvCategory.find(category => category.id === item.cvCategoryId)?.description?.toLowerCase() || '';
            const formattedDate = formatDate(item.createdAt, 'dd-MM-yyyy').toLowerCase();
            const status = item.status === 1 ? 'hoạt động' : 'đã khóa';
            const numberUse = item.numberUse.toString();
            return (
                item.id.toString().includes(lowerCaseText) ||
                item.name.toLowerCase().includes(lowerCaseText) ||
                categoryDescription.includes(lowerCaseText) ||
                formattedDate.includes(lowerCaseText) ||
                status.includes(lowerCaseText) ||
                numberUse.includes(lowerCaseText)
            );
        });
    }, [text, cvTemplateStaffList, cvCategory]);

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
        })),
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};

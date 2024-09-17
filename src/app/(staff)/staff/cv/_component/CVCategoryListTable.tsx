import { Box, Button, Grid, Input, IconButton, Tooltip, Stack, Switch, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { formatDate } from 'package/util';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { CVCategory } from 'package/api/cv-category';
import Image from 'next/image';
import { StatusChip } from "components/common/chip-status/status-chip";

const StatusCV = (status: number) => {
    const switchStatus = [
        { label: "Đã khóa", color: "error" },
        { label: "Hoạt động", color: "success" },
    ];
    return (
        <StatusChip
            color={switchStatus[status].color}
            label={switchStatus[status].label}
        />
    );
};

export const RenderCVCategoryListTable = ({
    cvCategory,
}: {
    cvCategory: CVCategory[],
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
            headerName: 'Tên',
            flex: 2,
            renderCell: (params) => (
                <Typography variant="subtitle1">{params.value}</Typography>
            )
        },
        {
            field: 'description',
            headerName: 'Mô tả',
            flex: 2,
            renderCell: (params) => (
                <Typography variant="subtitle1">{params.value}</Typography>
            )
        },
        {
            field: 'image',
            headerName: 'Ảnh',
            flex: 1,
            renderCell: (params) => (
                <Box display="flex" justifyContent="center">
                    <Image src={params.value} alt="Image" width={50} height={50} />
                </Box>
            )
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            flex: 1.5,
            renderCell: (params) => formatDate(params.value, 'dd-MM-yyyy')
        },
        {
            field: 'status',
            headerName: 'Trạng thái',
            flex: 1,
            renderCell: (params) => (
                <Box>
                    {StatusCV(1)}
                </Box>
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.5,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
                    <Switch checked={true} />
                </Stack>
            )
        }
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return cvCategory.filter((item) =>
            item.name.toLowerCase().includes(lowerCaseText) ||
            item.description.toLowerCase().includes(lowerCaseText) ||
            StatusCV(1).props.label.toLowerCase().includes(lowerCaseText)
            // formatDate(item.createdAt, 'dd-MM-yyyy').toLowerCase().includes(lowerCaseText)
        );
    }, [text, cvCategory]);

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

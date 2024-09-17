import { Box, Button, Grid, Input, Stack, Switch } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { formatDate } from 'package/util';
import { BlogList } from 'package/api/blog';
import Avatar from "@mui/material/Avatar";
import { Text } from "components/common/text/text";
import { StyledLink } from 'components/common/link/styled-link';

export const RenderBlogTable = ({
    blogList,
}: {
    blogList: BlogList[],
}) => {

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            flex: 0.5
        },
        {
            field: 'object',
            headerName: 'Tên Blog',
            flex: 2,
            renderCell: (params) => (
                <StyledLink href={"/staff/blog/" + params.row.id}>
                    <Box sx={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                        {params.row.title}
                    </Box>
                </StyledLink>
            )
        },
        {
            field: 'profile',
            headerName: 'Người tạo',
            flex: 1,
            renderCell: (params) => (
                < FlexBox >
                    <Avatar src={params.value.avatar} />
                    <Text ml={1}>{params.value.fullName}</Text>
                </FlexBox >
            )
        },
        {
            field: 'shortDescription',
            headerName: 'Danh mục',
            flex: 1,
            renderCell: (params) => (
                <></>
            )
        },
        {
            field: 'createdAt',
            headerName: 'Ngày tạo',
            flex: 1,
            renderCell: (params) => formatDate(params.value, 'dd-MM-yyyy')
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" justifyContent="center" alignItems="center">
                    <Switch checked={true} />
                </Stack>
            )
        }
    ];

    // Filter functionality
    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return blogList.filter((blog) =>
            blog.title.toLowerCase().includes(lowerCaseText) ||
            blog.profile.fullName.toLowerCase().includes(lowerCaseText) ||
            formatDate(blog.createdAt, 'dd-MM-yyyy').toLowerCase().includes(lowerCaseText)
        );
    }, [text, blogList]);

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
                    {/* Additional actions */}
                </FlexBox>
            </Grid>
        </Grid>
    );

    const props: DataGridTableProps = {
        columns,
        rows: filteredData.map((data) => ({
            ...data,
            object: JSON.stringify(data),
            actions: JSON.stringify(data),
        }))
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};

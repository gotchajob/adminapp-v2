import { Box, Button, Grid, Input, IconButton, Tooltip, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Category {
    name: string;
    id: number;
}

export const RenderCategoryControllerTable = ({
    category,
    handleEdit,
    handleDelete,
}: {
    category: Category[],
    handleEdit: (row: Category) => void,
    handleDelete: (row: Category) => void
}) => {
    // Define the columns for the DataGrid
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Tên danh mục',
            flex: 1.5,
            renderCell: (params) => (
                <Box sx={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Sửa">
                        <IconButton
                            color="primary"
                            onClick={() => handleEdit(params.row)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton
                            color="error"
                            onClick={() => handleDelete(params.row)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ];

    // Setup the filter functionality
    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return category.filter((cat) =>
            cat.name.toLowerCase().includes(lowerCaseText) ||
            cat.id.toString().includes(lowerCaseText)
        );
    }, [text, category]);

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

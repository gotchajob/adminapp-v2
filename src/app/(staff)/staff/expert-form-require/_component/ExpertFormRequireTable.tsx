import { Box, Chip, Button, Grid, Input, IconButton, Tooltip, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { formatDate } from 'package/util';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ExpertFormRequire } from 'package/api/expert-form-require';
import { Category } from 'package/api/category';

export const RenderExpertFormRequireTable = ({
    expertFormRequire,
    categories,
    handleEdit,
    handleDelete,
}: {
    expertFormRequire: ExpertFormRequire[],
    categories: Category[],
    handleEdit: (row: ExpertFormRequire) => void,
    handleDelete: (row: ExpertFormRequire) => void
}) => {

    // Define the columns for the DataGrid
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Tên Yêu Cầu',
            flex: 1.5,
            renderCell: (params) => (
                <Box sx={{ wordWrap: "break-word", whiteSpace: "normal" }}>
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'categoryId',
            headerName: 'Danh mục đăng ký',
            flex: 1,
            renderCell: (params) => {
                const category = categories.find((cat) => cat.id === params.value)
                return <Box>{category?.name}</Box>;
            }
        },
        {
            field: 'description',
            headerName: 'Mô Tả',
            flex: 2,
            renderCell: (params) => (
                <Box sx={{ paddingY: 1, wordWrap: "break-word", whiteSpace: "normal" }}>
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
                            onClick={() => handleEdit(params.row)}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton
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
        return expertFormRequire.filter((requirement) => {
            const category = categories.find((cat) => cat.id === requirement.categoryId);
            const categoryName = category ? category.name.toLowerCase() : "";
            return (
                requirement.name.toLowerCase().includes(lowerCaseText) ||
                requirement.description.toLowerCase().includes(lowerCaseText) ||
                requirement.id.toString().toLowerCase().includes(lowerCaseText) ||
                categoryName.includes(lowerCaseText)
            );
        });
    }, [text, expertFormRequire, categories]);

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
        getRowHeight: () => "auto"
    };

    return (
        <MainCard title={RenderClientFilter}>
            <DataGridTable props={props} />
        </MainCard>
    );
};

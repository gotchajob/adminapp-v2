import { Box, Button, Grid, Input, IconButton, Tooltip, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Skill } from 'package/api/skill';
import { Category } from 'package/api/category';

export const RenderSkillControllerTable = ({
    skills,
    category,
    handleEdit,
    handleDelete,
}: {
    skills: Skill[];
    category: Category[];
    handleEdit: (row: Skill) => void;
    handleDelete: (row: Skill) => void;
}) => {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Tên kĩ năng',
            flex: 1.5,
        },
        {
            field: 'categoryId',
            headerName: 'Tên danh mục',
            flex: 1,
            renderCell: (params) => {
                const cat = category.find((c) => c.id === params.value);
                return <Box>{cat?.name}</Box>;
            }
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Sửa">
                        <IconButton onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton onClick={() => handleDelete(params.row)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            )
        }
    ];

    const { handleChangeEventText, text } = useGetFilter();

    const filteredData = useMemo(() => {
        const lowerCaseText = text.toLowerCase();
        return skills.filter((skill) =>
            skill.name.toLowerCase().includes(lowerCaseText) ||
            category.find((cat) => cat.id === skill.categoryId)?.name.toLowerCase().includes(lowerCaseText)
        );
    }, [text, skills, category]);

    const RenderClientFilter = (
        <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
                <FlexBox>
                    <Button>Tìm kiếm</Button>
                    <Input size="small" onChange={handleChangeEventText} placeholder="Tìm kiếm..." />
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

import { Box, Button, Grid, Input, IconButton, Tooltip, Stack } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid/models';
import { FlexBox } from 'components/common/box/flex-box';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { useMemo } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SkillOption } from 'package/api/skill-option';
import { Skill } from 'package/api/skill';

export const RenderSkillOptionControllerTable = ({
    skillOptions,
    skills,
    handleEdit,
    handleDelete,
}: {
    skillOptions: SkillOption[];
    skills: Skill[];
    handleEdit: (row: SkillOption) => void;
    handleDelete: (row: SkillOption) => void;
}) => {

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Tên tùy chọn kĩ năng',
            flex: 1.5,
        },
        {
            field: 'skillId',
            headerName: 'Thuộc kĩ năng',
            flex: 1,
            renderCell: (params) => {
                const skill = skills.find((skill) => skill.id === params.value);
                return <Box>{skill?.name}</Box>;
            }
        },
        {
            field: 'actions',
            headerName: 'Thao tác',
            flex: 1,
            renderCell: (params) => (
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Sửa">
                        <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton color="error" onClick={() => handleDelete(params.row)}>
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
        return skillOptions.filter((skillOption) =>
            skillOption.name.toLowerCase().includes(lowerCaseText) ||
            skills.find((skill) => skill.id === skillOption.skillId)?.name.toLowerCase().includes(lowerCaseText)
        );
    }, [text, skillOptions, skills]);

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
import { Box, IconButton, Tooltip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Grid, Input } from '@mui/material';
import { useState, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid/models';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { UseGetExpertQuestionCategoryCurrent } from 'hooks/use-get-expert-question-category';
import { PostExpertQuestionCategory } from 'package/api/expert-question-category';
import { useGetFilter } from 'components/common/filter-table/hook-filter';
import { FlexBox } from 'components/common/box/flex-box';
import { enqueueSnackbar } from 'notistack';
import { PatchExpertQuestionCategoryById } from 'package/api/expert-question-category/id';

export const CategoryTable = ({ refresh, refreshTime, token }: { refresh: () => void; refreshTime: number; token: string; }) => {
    const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(token, refreshTime);
    const [categoryStatus, setCategoryStatus] = useState<{ [key: number]: boolean }>({});
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
    const [newCategory, setNewCategory] = useState({ category: '', description: '' });

    const handleStatusChange = (categoryId: number) => {
        setCategoryStatus(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    const handleAddCategory = async () => {
        try {
            if (newCategory.category === "" || newCategory.description === "") return;

            if (editMode && selectedCategory) {
                const res = await PatchExpertQuestionCategoryById({
                    id: selectedCategory.id,
                    category: newCategory.category,
                    description: newCategory.description,
                }, token);

                if (res.status === "success") {
                    enqueueSnackbar('Cập nhật danh mục thành công', { variant: 'success' });
                } else {
                    enqueueSnackbar('Cập nhật danh mục thất bại', { variant: 'error' });
                }
            } else {
                const res = await PostExpertQuestionCategory({ category: newCategory.category, description: newCategory.description }, token);
                if (res.status === "success") {
                    enqueueSnackbar('Thêm danh mục thành công', { variant: 'success' });
                } else {
                    enqueueSnackbar('Thêm danh mục thất bại', { variant: 'error' });
                }
            }
            refresh();
            setOpenAddDialog(false);
            setNewCategory({ category: '', description: '' });
        } catch (error) {
            enqueueSnackbar('Lỗi trong quá trình xử lý', { variant: 'error' });
        }
    };

    const handleEditCategory = (category: any) => {
        setEditMode(true);
        setSelectedCategory(category);
        setNewCategory({ category: category.category, description: category.description });
        setOpenAddDialog(true);
    };

    const columns: GridColDef[] = [
        { field: 'category', headerName: 'Danh mục', flex: 1 },
        { field: 'description', headerName: 'Mô tả', flex: 1 },
        {
            field: 'actions',
            headerName: 'Quản lí',
            flex: 1,
            renderCell: (params) => (
                <>
                    <Tooltip title="Sửa">
                        <IconButton onClick={() => handleEditCategory(params.row)}>
                            <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                </>
            )
        }
    ];

    const { handleChangeEventText, text, findAllIndexByAnyField } = useGetFilter();

    const filteredData = useMemo(() => {
        let data = [...expertQuestionCategoryCurrent];
        if (text.trim() !== '') {
            const lowerCaseText = text.toLowerCase();
            data = data.filter((category) => {
                return (
                    category.category.toLowerCase().includes(lowerCaseText) ||
                    category.description.toLowerCase().includes(lowerCaseText)
                );
            });
        }
        return data;
    }, [text, expertQuestionCategoryCurrent]);

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
                    {/* <Button variant="outlined" onClick={handleExportExcel}>
              Excel
            </Button> */}
                </FlexBox>
            </Grid>
        </Grid>
    );

    return (
        <>
            <MainCard
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Quản lí danh mục câu hỏi</Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => { setOpenAddDialog(true); setEditMode(false); }}
                        >
                            Thêm danh mục
                        </Button>
                    </Box>
                }
            >
                {RenderClientFilter}
                <DataGridTable props={{ columns, rows: filteredData }} />
            </MainCard>

            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>{editMode ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Danh mục" fullWidth value={newCategory.category} onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })} />
                    <TextField margin="dense" label="Mô tả" fullWidth value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="primary">Đóng</Button>
                    <Button onClick={handleAddCategory} color="primary">{editMode ? "Cập nhật" : "Thêm"}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

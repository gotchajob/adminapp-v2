import { Box, IconButton, Tooltip, Switch, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';
import { useState, useMemo } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid/models';
import { DataGridTable, DataGridTableProps } from 'components/common/filter-table/data-grid';
import MainCard from 'ui-component/cards/MainCard';
import { UseGetExpertQuestionCategoryCurrent } from 'hooks/use-get-expert-question-category';
import { PostExpertQuestionCategory } from 'package/api/expert-question-category';

export const CategoryTable = ({ refresh, refreshTime, token }: { refresh: () => void; refreshTime: number; token: string; }) => {
    const { expertQuestionCategoryCurrent } = UseGetExpertQuestionCategoryCurrent(token, refreshTime);
    const [categoryStatus, setCategoryStatus] = useState<{ [key: number]: boolean }>({});
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newCategory, setNewCategory] = useState({ category: '', description: '' });

    const handleStatusChange = (categoryId: number) => {
        setCategoryStatus(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    const handleAddCategory = async () => {
        try {
            if (newCategory.category === "" || newCategory.description === "") return;
            const res = await PostExpertQuestionCategory({ category: newCategory.category, description: newCategory.description }, token);
            if (res.status === "success") {
                refresh();
                setOpenAddDialog(false);
                setNewCategory({ category: '', description: '' });
            }
        } catch (error) {
            console.error(error);
        }
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
                        <IconButton>
                            <EditIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title={categoryStatus[params.row.id] ? 'Ẩn' : 'Hiện'}>
                        <Switch checked={categoryStatus[params.row.id] || false} onChange={() => handleStatusChange(params.row.id)} color="primary" />
                    </Tooltip> */}
                </>
            )
        }
    ];

    const filteredData = useMemo(() => {
        return expertQuestionCategoryCurrent.map(category => ({
            ...category,
            actions: JSON.stringify(category),
        }));
    }, [expertQuestionCategoryCurrent]);

    const props: DataGridTableProps = {
        columns,
        rows: filteredData,
    };

    return (
        <>
            <MainCard
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>Quản lí danh mục câu hỏi</Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenAddDialog(true)}
                        >
                            Thêm danh mục
                        </Button>
                    </Box>
                }
            >
                <DataGridTable props={props} />
            </MainCard>

            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Thêm danh mục</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Danh mục" fullWidth value={newCategory.category} onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })} />
                    <TextField margin="dense" label="Mô tả" fullWidth value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)} color="primary">Đóng</Button>
                    <Button onClick={handleAddCategory} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

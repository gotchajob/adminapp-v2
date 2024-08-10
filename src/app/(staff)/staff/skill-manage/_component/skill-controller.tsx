import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { enqueueSnackbar } from 'notistack';
import SubCard from 'ui-component/cards/SubCard';
import { PatchSkill, PostSkill, Skill } from 'package/api/skill';
import { Category } from 'package/api/category';
import { DelSkill } from 'package/api/skill/id';

interface SkillControllerPageProps {
    token: string;
    skills: Skill[];
    refresh: () => void;
    category: Category[];
}

export function SkillControllerPage({ token, skills, refresh, category }: SkillControllerPageProps) {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [newSkill, setNewSkill] = useState<{ name: string, id: number | null, categoryId: number | null }>({ name: '', id: null, categoryId: null });
    const [selectedCategory, setSelectedCategory] = useState<number | ''>('');

    const handleEdit = (skill: Skill) => {
        setSelectedSkill(skill);
        setNewSkill({ name: skill.name, id: skill.id, categoryId: skill.categoryId });
        setSelectedCategory(skill.categoryId || '');
        setOpenEditDialog(true);
    };

    const handleDelete = (skill: Skill) => {
        setSelectedSkill(skill);
        setOpenDeleteDialog(true);
    };

    const handleAdd = async () => {
        if (!newSkill.name || !selectedCategory) return;
        try {
            const response = await PostSkill({ categoryId: selectedCategory as number, name: newSkill.name });
            if (response.status === 'success') {
                refresh();
                setOpenAddDialog(false);
                setNewSkill({ name: '', id: null, categoryId: null });
                enqueueSnackbar("Thêm kĩ năng thành công", { variant: "success" });
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error: any) {
            console.error('Error adding skill:', error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    const handleUpdate = async () => {
        if (!newSkill.name || !selectedCategory || !selectedSkill) return;

        try {
            const response = await PatchSkill({ id: selectedSkill.id, skillName: newSkill.name });
            if (response.status === 'success') {
                refresh();
                setOpenEditDialog(false);
                setSelectedSkill(null);
                setNewSkill({ name: '', id: null, categoryId: null });
                enqueueSnackbar("Sửa kĩ năng thành công", { variant: "success" });
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error: any) {
            console.error('Error updating skill:', error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedSkill) return;
        try {
            const response = await DelSkill({ id: selectedSkill.id });
            if (response.status === 'success') {
                refresh();
                setOpenDeleteDialog(false);
                setSelectedSkill(null);
                enqueueSnackbar("Xóa kĩ năng thành công", { variant: "success" });
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error: any) {
            console.error('Error deleting skill:', error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    return (
        <SubCard
            title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">Quản lí kĩ năng</Typography>
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => {
                        setOpenAddDialog(true);
                        setNewSkill({ name: '', id: null, categoryId: null });
                    }}>
                        Thêm kĩ năng
                    </Button>
                </Box>
            }
            sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Tên kĩ năng</TableCell>
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Quản lí</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skills.map((skill) => (
                            <TableRow key={skill.id}>
                                <TableCell>{skill.name}</TableCell>
                                <TableCell>{category.find(cat => cat.id === skill.categoryId)?.name}</TableCell>
                                <TableCell>
                                    <Tooltip title="Sửa">
                                        <IconButton onClick={() => handleEdit(skill)}>
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton onClick={() => handleDelete(skill)}>
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog thêm kĩ năng */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Thêm kĩ năng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Chọn danh mục</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as number)}
                        >
                            {category.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        placeholder="Tên kĩ năng"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Đóng</Button>
                    <Button onClick={handleAdd} disabled={!selectedCategory}>Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog sửa kĩ năng */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Sửa kĩ năng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Chọn danh mục</InputLabel>
                        <Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value as number)}
                        >
                            {category.map(cat => (
                                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        placeholder="Tên kĩ năng"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenEditDialog(false);
                        setSelectedCategory('');
                    }}>Đóng</Button>
                    <Button onClick={handleUpdate} disabled={!selectedCategory}>Cập nhật</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xóa kĩ năng */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Xóa kĩ năng</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa kĩ năng {selectedSkill?.name} không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Đóng</Button>
                    <Button onClick={handleConfirmDelete} color="error">Xóa</Button>
                </DialogActions>
            </Dialog>
        </SubCard>
    );
}

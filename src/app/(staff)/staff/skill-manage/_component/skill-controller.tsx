import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Category } from 'package/api/category';
import { PatchSkill, PostSkill, Skill } from 'package/api/skill';
import { DelSkill } from 'package/api/skill/id';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { RenderSkillOptionControllerTable } from './SkillOptionControllerTable';
import { RenderSkillControllerTable } from './SkilControllerTable';
import { StaffToken } from 'hooks/use-login';

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
    const { staffToken } = StaffToken();

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
        if (!newSkill.name || !selectedCategory) {
            enqueueSnackbar("Vui lòng nhập tên kĩ năng và chọn danh mục", { variant: "warning" });
            return;
        }

        try {
            const response = await PostSkill({ categoryId: selectedCategory as number, name: newSkill.name }, staffToken);
            if (response.status === "success") {
                refresh();
                setOpenAddDialog(false);
                setNewSkill({ name: "", id: null, categoryId: null });
                enqueueSnackbar("Thêm kĩ năng thành công", { variant: "success" });
            } else {
                throw new Error(response.responseText || "Không thể thêm kĩ năng");
            }
        } catch (error: any) {
            console.error("Error adding skill:", error);
            enqueueSnackbar(error.responseText || "Thêm kĩ năng thất bại", { variant: "error" });
        }
    };

    const handleUpdate = async () => {
        if (!newSkill.name || !selectedCategory || !selectedSkill) {
            enqueueSnackbar("Vui lòng chọn kĩ năng, nhập tên và chọn danh mục", { variant: "warning" });
            return;
        }

        try {
            const response = await PatchSkill({ id: selectedSkill.id, skillName: newSkill.name }, staffToken);
            if (response.status === "success") {
                refresh();
                setOpenEditDialog(false);
                setSelectedSkill(null);
                setNewSkill({ name: "", id: null, categoryId: null });
                enqueueSnackbar("Sửa kĩ năng thành công", { variant: "success" });
            } else {
                throw new Error(response.responseText || "Không thể sửa kĩ năng");
            }
        } catch (error: any) {
            console.error("Error updating skill:", error);
            enqueueSnackbar(error.responseText || "Sửa kĩ năng thất bại", { variant: "error" });
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedSkill) {
            enqueueSnackbar("Vui lòng chọn kĩ năng để xóa", { variant: "warning" });
            return;
        }

        try {
            const response = await DelSkill({ id: selectedSkill.id }, staffToken);
            if (response.status === "success") {
                refresh();
                setOpenDeleteDialog(false);
                setSelectedSkill(null);
                enqueueSnackbar("Xóa kĩ năng thành công", { variant: "success" });
            } else {
                throw new Error(response.responseText || "Không thể xóa kĩ năng");
            }
        } catch (error: any) {
            console.error("Error deleting skill:", error);
            enqueueSnackbar(error.responseText || "Xóa kĩ năng thất bại", { variant: "error" });
        }
    };

    const SkeletonTable = () => {
        return (
            <TableContainer>
                <Skeleton variant="rectangular" width="15%" sx={{ margin: 3 }} />
                <Table sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            {Array.from(new Array(5)).map((_, index) => (
                                <TableCell key={index} sx={{ padding: 2, border: 0 }} width="30%">
                                    <Skeleton variant="rectangular" />
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(new Array(5)).map((_, rowIndex) => (
                            <TableRow key={rowIndex}>
                                {Array.from(new Array(5)).map((_, cellIndex) => (
                                    <TableCell key={cellIndex} width="30%" sx={{ padding: 2, border: 0 }}>
                                        <Skeleton variant="rectangular" />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <MainCard
            title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4">Quản lí kĩ năng</Typography>
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => {
                        setOpenAddDialog(true);
                        setNewSkill({ name: '', id: null, categoryId: null });
                    }}>
                        Thêm kĩ năng
                    </Button>
                </Box>
            }
            sx={{ mt: 3 }}>

            {skills.length > 0 ? category.length > 0 && (
                <RenderSkillControllerTable
                    skills={skills}
                    category={category}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : (SkeletonTable())}

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
        </MainCard>
    );
}

{/* <TableContainer component={Paper}>
                <Table>
                    <TableHead>
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
            </TableContainer> */}

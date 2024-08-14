import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Skill } from 'package/api/skill';
import { PatchSkillOption, PostSkillOption } from 'package/api/skill-option';
import { DeleteSkillOption } from 'package/api/skill-option/id';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';

interface SkillOption {
    id: number;
    skillId: number;
    name: string;
}

interface SkillOptionControllerPageProps {
    token: string;
    skillOptions: SkillOption[];
    refresh: () => void;
    skills: Skill[];
}

export function SkillOptionControllerPage({ token, skillOptions, refresh, skills }: SkillOptionControllerPageProps) {
    const [selectedSkillOption, setSelectedSkillOption] = useState<SkillOption | null>(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [newSkillOption, setNewSkillOption] = useState<{ name: string, skillId: number | null }>({ name: '', skillId: null });
    const [selectedSkill, setSelectedSkill] = useState<number | ''>('');

    const handleEdit = (skillOption: SkillOption) => {
        setSelectedSkillOption(skillOption);
        setNewSkillOption({ name: skillOption.name, skillId: skillOption.skillId });
        setSelectedSkill(skillOption.skillId);
        setOpenEditDialog(true);
    };

    const handleDelete = (skillOption: SkillOption) => {
        setSelectedSkillOption(skillOption);
        setOpenDeleteDialog(true);
    };

    const handleAdd = async () => {
        if (!newSkillOption.name || !selectedSkill) return;
        try {
            const response = await PostSkillOption({ skillId: selectedSkill as number, name: newSkillOption.name });
            if (response.status !== 'success') {
                throw new Error(response.responseText);
            }
            refresh();
            setOpenAddDialog(false);
            setNewSkillOption({ name: '', skillId: null });
            enqueueSnackbar("Thêm tùy chọn kĩ năng thành công", { variant: "success" });
        } catch (error: any) {
            console.error('Error adding skill option:', error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    const handleUpdate = async () => {
        if (!newSkillOption.name || !selectedSkillOption) return;
        try {
            const response = await PatchSkillOption({ id: selectedSkillOption.id, name: newSkillOption.name });
            if (response.status !== 'success') {
                throw new Error(response.responseText);
            }
            refresh();
            setOpenEditDialog(false);
            setSelectedSkillOption(null);
            setNewSkillOption({ name: '', skillId: null });
            enqueueSnackbar("Sửa tùy chọn kĩ năng thành công", { variant: "success" });
        } catch (error: any) {
            console.error('Error updating skill option:', error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    const handleConfirmDelete = async () => {
        if (!selectedSkillOption) return;
        try {
            const response = await DeleteSkillOption({ id: selectedSkillOption.id });
            if (response.status !== 'success') {
                throw new Error(response.responseText);
            }
            refresh();
            setOpenDeleteDialog(false);
            setSelectedSkillOption(null);
            enqueueSnackbar("Xóa tùy chọn kĩ năng thành công", { variant: "success" });
        } catch (error: any) {
            console.error('Error deleting skill option:', error);
            enqueueSnackbar(error.message, { variant: "error" });
        }
    };

    return (
        <MainCard
            title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" >Quản lí tùy chọn kĩ năng</Typography>
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => {
                        setOpenAddDialog(true);
                        setNewSkillOption({ name: '', skillId: null });
                    }}>
                        Thêm tùy chọn kĩ năng
                    </Button>
                </Box>
            }
            sx={{ mt: 3 }}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên tùy chọn kỹ năng</TableCell>
                            <TableCell>Thuộc kỹ năng</TableCell>
                            <TableCell>Quản lí</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {skillOptions.map((skillOption) => (
                            <TableRow key={skillOption.id}>
                                <TableCell>{skillOption.name}</TableCell>
                                <TableCell>{skills.find(skill => skill.id === skillOption.skillId)?.name}</TableCell>
                                <TableCell>
                                    <Tooltip title="Sửa">
                                        <IconButton onClick={() => handleEdit(skillOption)}>
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton onClick={() => handleDelete(skillOption)}>
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog thêm tùy chọn kĩ năng */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Thêm tùy chọn kĩ năng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Chọn kỹ năng</InputLabel>
                        <Select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value as number)}
                        >
                            {skills.map(skill => (
                                <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        placeholder="Tên tùy chọn"
                        value={newSkillOption?.name || ''}
                        onChange={(e) => setNewSkillOption({ ...newSkillOption, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Đóng</Button>
                    <Button onClick={handleAdd} disabled={!selectedSkill}>Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog sửa tùy chọn kĩ năng */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Sửa tùy chọn kĩ năng</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Chọn kỹ năng</InputLabel>
                        <Select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value as number)}
                        >
                            {skills.map(skill => (
                                <MenuItem key={skill.id} value={skill.id}>{skill.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        placeholder="Tên tùy chọn"
                        value={newSkillOption?.name || ''}
                        onChange={(e) => setNewSkillOption({ ...newSkillOption, name: e.target.value })}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Đóng</Button>
                    <Button onClick={handleUpdate} disabled={!selectedSkill}>Cập nhật</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xóa tùy chọn kĩ năng */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Xóa tùy chọn kĩ năng</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa tùy chọn kĩ năng {selectedSkillOption?.name} không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
                    <Button onClick={handleConfirmDelete} color="error">Xóa</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

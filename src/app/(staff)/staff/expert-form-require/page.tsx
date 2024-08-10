"use client";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
    IconButton,
    Paper,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import { useGetExpertFormRequire } from "hooks/use-get-expert-form-require";
import { useRefresh } from "hooks/use-refresh";
import { useState, useEffect } from "react";
import SubCard from 'ui-component/cards/SubCard';
import { ExpertFormRequire, PostExpertFormRequire } from "package/api/expert-form-require";
import { DelExpertFormRequire, PatchExpertFormRequire } from 'package/api/expert-form-require/id';
import { enqueueSnackbar } from 'notistack';

export default function ExpertFormRequirePage() {
    const { refresh, refreshTime } = useRefresh();
    const { expertFormRequire } = useGetExpertFormRequire({ categoryIds: null }, refreshTime);
    const [selectedRequirement, setSelectedRequirement] = useState<ExpertFormRequire | null>(null);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [newRequirement, setNewRequirement] = useState<ExpertFormRequire>({ name: '', description: '', id: 0, categoryId: 0 });

    const handleAdd = async () => {
        try {
            const response = await PostExpertFormRequire(newRequirement);
            if (response.status === "success") {
                setOpenAddDialog(false);
                setNewRequirement({ name: '', description: '', id: 0, categoryId: 0 });
                enqueueSnackbar("Thêm thành công", { variant: "success" });
            } else {
                throw new Error(response.responseText);
            }
        } catch (error: any) {
            console.error("Failed to add requirement", error);
            enqueueSnackbar(error, { variant: "error" });
        }
    };

    const handleEdit = (requirement: ExpertFormRequire) => {
        setSelectedRequirement(requirement);
        setNewRequirement(requirement);
        setOpenEditDialog(true);
    };

    const handleUpdate = async () => {
        if (selectedRequirement) {
            try {
                const response = await PatchExpertFormRequire(newRequirement);
                if (response.status === "success") {
                    setOpenEditDialog(false);
                    setSelectedRequirement(null);
                    enqueueSnackbar("Sửa thành công", { variant: "success" });
                } else {
                    console.error("Error updating requirement:", response.responseText);
                }
            } catch (error: any) {
                console.error("Failed to update requirement", error);
                enqueueSnackbar(error, { variant: "error" });
            }
        }
    };

    const handleDelete = (requirement: ExpertFormRequire) => {
        setSelectedRequirement(requirement);
        setOpenDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedRequirement) {
            try {
                const response = await DelExpertFormRequire(selectedRequirement);
                if (response.status === "success") {
                    setOpenDeleteDialog(false);
                    setSelectedRequirement(null);
                    enqueueSnackbar("Xóa thành công", { variant: "success" });
                } else {
                    console.error("Error deleting requirement:", response.responseText);
                }
            } catch (error: any) {
                console.error("Failed to delete requirement", error);
                enqueueSnackbar(error, { variant: "error" });
            }
        }
    };

    return (
        <SubCard
            title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h4" color="primary">Yêu cầu chuyên gia</Typography>
                    <Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={() => setOpenAddDialog(true)}>
                        Thêm Yêu Cầu
                    </Button>
                </Box>
            }
            sx={{ mt: 3 }}
        >
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Tên Yêu Cầu</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Quản lí</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expertFormRequire.map((requirement) => (
                            <TableRow key={requirement.id}>
                                <TableCell>{requirement.name}</TableCell>
                                <TableCell>{requirement.description}</TableCell>
                                <TableCell>
                                    <Tooltip title="Sửa">
                                        <IconButton onClick={() => handleEdit(requirement)}>
                                            <EditIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton onClick={() => handleDelete(requirement)}>
                                            <DeleteIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog thêm yêu cầu */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Thêm Yêu Cầu</DialogTitle>
                <DialogContent>
                    <TextField
                        placeholder="Tên yêu cầu"
                        value={newRequirement.name}
                        onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        placeholder="Mô tả"
                        value={newRequirement.description}
                        onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Đóng</Button>
                    <Button onClick={handleAdd}>Thêm</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog sửa yêu cầu */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Sửa Yêu Cầu</DialogTitle>
                <DialogContent>
                    <TextField
                        placeholder="Tên yêu cầu"
                        value={newRequirement.name}
                        onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        placeholder="Mô tả"
                        value={newRequirement.description}
                        onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                        fullWidth
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpenEditDialog(false);
                        setNewRequirement({ name: '', description: '', id: 0, categoryId: 0 });
                    }}>Đóng</Button>
                    <Button onClick={handleUpdate}>Cập nhật</Button>
                </DialogActions>
            </Dialog>

            {/* Dialog xóa yêu cầu */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Xóa Yêu Cầu</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xóa yêu cầu {selectedRequirement?.name} không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Hủy</Button>
                    <Button onClick={handleConfirmDelete} color="error">Xóa</Button>
                </DialogActions>
            </Dialog>
        </SubCard>
    );
}

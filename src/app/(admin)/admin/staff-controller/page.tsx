"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { RenderStaffTable } from "./_components/StaffTable";
import { useRefresh } from "hooks/use-refresh";
import { AdminToken } from "hooks/use-login";
import { UseGetAllStaff } from "hooks/use-get-all-staff";
import MainCard from "ui-component/cards/MainCard";
import { enqueueSnackbar } from "notistack";
import { PatchStaffDisable } from "package/api/staff/id/disable";
import { PatchStaffEnable } from "package/api/staff/id/enable";
import AddIcon from '@mui/icons-material/Add';
import { PostStaff } from "package/api/staff";
import { PatchStaffById } from "package/api/staff/id/indext";

export default function StaffController() {
    const { refresh, refreshTime } = useRefresh();
    const { adminToken } = AdminToken();
    const { staffs, loading } = UseGetAllStaff(adminToken, refreshTime);

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedStaffId, setSelectedStaffId] = useState<number | null>(null);
    const [actionType, setActionType] = useState<"enable" | "disable" | null>(null);
    const [loadingAction, setLoadingAction] = useState(false);
    const [openAddStaffDialog, setOpenAddStaffDialog] = useState(false);
    const [openEditStaffDialog, setOpenEditStaffDialog] = useState(false);
    const [newStaffData, setNewStaffData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const [editStaffData, setEditStaffData] = useState({
        password: "",
        firstName: "",
        lastName: "",
    });

    const openConfirmDialog = (id: number, action: "enable" | "disable") => {
        setSelectedStaffId(id);
        setActionType(action);
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setSelectedStaffId(null);
        setActionType(null);
    };

    const handleDisable = async () => {
        if (!selectedStaffId) return;
        try {
            setLoadingAction(true);
            const response = await PatchStaffDisable({ id: selectedStaffId }, adminToken);
            if (response.status === "success") {
                enqueueSnackbar("Vô hiệu hóa tài khoản thành công!", { variant: "success" });
                refresh();
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Vô hiệu hóa tài khoản thất bại!", { variant: "error" });
        } finally {
            setLoadingAction(false);
            closeDialog();
        }
    };

    const handleEnable = async () => {
        if (!selectedStaffId) return;
        try {
            setLoadingAction(true);
            const response = await PatchStaffEnable({ id: selectedStaffId }, adminToken);
            if (response.status === "success") {
                enqueueSnackbar("Kích hoạt tài khoản thành công!", { variant: "success" });
                refresh();
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Kích hoạt tài khoản thất bại!", { variant: "error" });
        } finally {
            setLoadingAction(false);
            closeDialog();
        }
    };

    const handleAddStaff = async () => {
        try {
            setLoadingAction(true);
            const response = await PostStaff(newStaffData, adminToken);
            if (response.status === "success") {
                enqueueSnackbar("Thêm tài khoản thành công!", { variant: "success" });
                refresh();
                setOpenAddStaffDialog(false);
                setNewStaffData({
                    email: "",
                    password: "",
                    firstName: "",
                    lastName: "",
                });
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Thêm tài khoản thất bại!", { variant: "error" });
        } finally {
            setLoadingAction(false);
        }
    };

    const handleEditStaff = async () => {
        if (!selectedStaffId) return;
        try {
            setLoadingAction(true);
            const response = await PatchStaffById(
                { id: selectedStaffId, ...editStaffData },
                adminToken
            );
            if (response.status === "success") {
                enqueueSnackbar("Cập nhật thông tin thành công!", { variant: "success" });
                refresh();
                setOpenEditStaffDialog(false);
                setEditStaffData({
                    password: "",
                    firstName: "",
                    lastName: "",
                });
            } else {
                enqueueSnackbar(response.responseText, { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("Cập nhật thông tin thất bại!", { variant: "error" });
        } finally {
            setLoadingAction(false);
        }
    };

    return (
        <>
            <MainCard title={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Quản lí tài khoản nhân viên</Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenAddStaffDialog(true)}
                    >
                        Thêm tài khoản
                    </Button>
                </Box>
            }>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <RenderStaffTable
                        staffs={staffs}
                        onDisable={openConfirmDialog}
                        onEnable={openConfirmDialog}
                        onEdit={(staff) => {
                            setSelectedStaffId(staff.id);
                            setEditStaffData({ firstName: staff.firstName, lastName: staff.lastName, password: "" });
                            setOpenEditStaffDialog(true);
                        }}
                    />)}
            </MainCard>

            {/* Dialog xác nhận hành động */}
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn {actionType === 'disable' ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} disabled={loadingAction}>Đóng</Button>
                    <Button
                        onClick={actionType === 'disable' ? handleDisable : handleEnable}
                        color="primary"
                        disabled={loadingAction}
                    >
                        {actionType === 'disable' ? 'Vô hiệu hóa' : 'Kích hoạt'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog thêm tài khoản */}
            <Dialog open={openAddStaffDialog} onClose={() => setOpenAddStaffDialog(false)}>
                <DialogTitle>Thêm tài khoản nhân viên</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="Email"
                        fullWidth
                        value={newStaffData.email}
                        onChange={(e) => setNewStaffData({ ...newStaffData, email: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={newStaffData.password}
                        onChange={(e) => setNewStaffData({ ...newStaffData, password: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Tên"
                        fullWidth
                        value={newStaffData.firstName}
                        onChange={(e) => setNewStaffData({ ...newStaffData, firstName: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Họ"
                        fullWidth
                        value={newStaffData.lastName}
                        onChange={(e) => setNewStaffData({ ...newStaffData, lastName: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddStaffDialog(false)} disabled={loadingAction}>
                        Đóng
                    </Button>
                    <Button onClick={handleAddStaff} color="primary" disabled={loadingAction}>
                        Thêm tài khoản
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog cập nhật thông tin tài khoản */}
            <Dialog open={openEditStaffDialog} onClose={() => setOpenEditStaffDialog(false)}>
                <DialogTitle>Cập nhật thông tin tài khoản</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="Tên"
                        fullWidth
                        value={editStaffData.firstName}
                        onChange={(e) => setEditStaffData({ ...editStaffData, firstName: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Họ"
                        fullWidth
                        value={editStaffData.lastName}
                        onChange={(e) => setEditStaffData({ ...editStaffData, lastName: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        label="Mật khẩu mới"
                        type="password"
                        fullWidth
                        value={editStaffData.password}
                        onChange={(e) => setEditStaffData({ ...editStaffData, password: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditStaffDialog(false)} disabled={loadingAction}>
                        Hủy
                    </Button>
                    <Button onClick={handleEditStaff} color="primary" disabled={loadingAction}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

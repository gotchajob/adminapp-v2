"use client";

import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, TableContainer, Skeleton, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
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

    const [editStaffData, setEditStaffData] = useState<{
        password: string | null;
        firstName: string;
        lastName: string;
    }>({
        password: "",
        firstName: "",
        lastName: "",
    });

    const [errors, setErrors] = useState({
        email: "",
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

    const validateForm = (data: any, isEdit: boolean = false) => {
        let tempErrors = { email: "", password: "", firstName: "", lastName: "" };
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/;

        // Kiểm tra tên và họ
        if (!data.firstName || !nameRegex.test(data.firstName) || data.firstName.length < 2 || data.firstName.length > 30) {
            tempErrors.firstName = "Tên không hợp lệ hoặc không đúng độ dài";
            isValid = false;
        }

        if (!data.lastName || !nameRegex.test(data.lastName) || data.lastName.length < 2 || data.lastName.length > 30) {
            tempErrors.lastName = "Họ không hợp lệ hoặc không đúng độ dài";
            isValid = false;
        }

        // Kiểm tra mật khẩu (khi thêm tài khoản mới)
        if (!isEdit) {
            if (!data.password || data.password.length < 1) {
                tempErrors.password = "Cần điền mặt khẩu";
                isValid = false;
            } else if (!emailRegex.test(data.email)) {
                tempErrors.email = "Email không hợp lệ";
                isValid = false;
            }
        }

        setErrors(tempErrors);

        return isValid;
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
        if (!validateForm(newStaffData, false)) return;
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
        if (!validateForm(editStaffData, true)) return;
        if (!selectedStaffId) return;
        try {
            setLoadingAction(true);
            const response = await PatchStaffById(
                {
                    ...editStaffData,
                    id: selectedStaffId,
                    password: editStaffData.password === "" ? null : editStaffData.password,
                },
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
                    SkeletonTable()
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
                        label="Tên"
                        fullWidth
                        value={newStaffData.firstName}
                        onChange={(e) => setNewStaffData({ ...newStaffData, firstName: e.target.value })}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        margin="normal"
                        label="Họ"
                        fullWidth
                        value={newStaffData.lastName}
                        onChange={(e) => setNewStaffData({ ...newStaffData, lastName: e.target.value })}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <TextField
                        margin="normal"
                        label="Email"
                        fullWidth
                        value={newStaffData.email}
                        onChange={(e) => setNewStaffData({ ...newStaffData, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        margin="normal"
                        label="Mật khẩu"
                        type="password"
                        fullWidth
                        value={newStaffData.password}
                        onChange={(e) => setNewStaffData({ ...newStaffData, password: e.target.value })}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setErrors({ email: "", password: "", firstName: "", lastName: "" });
                            setOpenAddStaffDialog(false);
                        }}
                        disabled={loadingAction}>
                        Đóng
                    </Button>
                    <Button onClick={handleAddStaff} color="primary" disabled={loadingAction}>
                        Thêm tài khoản
                    </Button>
                </DialogActions>
            </Dialog >

            {/* Dialog cập nhật thông tin tài khoản */}
            < Dialog open={openEditStaffDialog} onClose={() => setOpenEditStaffDialog(false)
            }>
                <DialogTitle>Cập nhật thông tin tài khoản</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="normal"
                        label="Tên"
                        fullWidth
                        value={editStaffData.firstName}
                        onChange={(e) => setEditStaffData({ ...editStaffData, firstName: e.target.value })}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                    />
                    <TextField
                        margin="normal"
                        label="Họ"
                        fullWidth
                        value={editStaffData.lastName}
                        onChange={(e) => setEditStaffData({ ...editStaffData, lastName: e.target.value })}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                    />
                    <TextField
                        margin="normal"
                        label="Mật khẩu mới"
                        type="password"
                        fullWidth
                        value={editStaffData.password}
                        onChange={(e) => setEditStaffData({ ...editStaffData, password: e.target.value })}
                        error={!!errors.password}
                        helperText={errors.password}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setErrors({ email: "", password: "", firstName: "", lastName: "" });
                            setOpenEditStaffDialog(false);
                        }}
                        disabled={loadingAction}>
                        Đóng
                    </Button>
                    <Button onClick={handleEditStaff} color="primary" disabled={loadingAction}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}

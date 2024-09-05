'use client';

import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteReportSuggestById, PatchReportSuggestById } from "package/api/report-suggest/id";
import { ReportSuggest } from "package/api/report-suggest";
import { enqueueSnackbar } from "notistack";
import { StaffToken } from "hooks/use-login";

export default function ReportSuggestList({ reportSuggests, refresh }: { reportSuggests: ReportSuggest[], refresh: () => void }) {
    const { staffToken } = StaffToken();
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState<'edit' | 'delete'>('edit');
    const [selectedReport, setSelectedReport] = useState<ReportSuggest | null>(null);
    const [newReportData, setNewReportData] = useState({ report: "", description: "" });

    const handleOpenDialog = (report: ReportSuggest, mode: 'edit' | 'delete') => {
        setDialogMode(mode);
        setSelectedReport(report);
        setNewReportData({ report: report.report, description: report.description });
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReport(null);
    };

    const handleDelete = async () => {
        if (selectedReport) {
            try {
                const res = await DeleteReportSuggestById({ id: selectedReport.id }, staffToken);
                if (res.status === 'success') {
                    enqueueSnackbar('Đề xuất Báo cáo đã được xóa thành công!', { variant: 'success' });
                    refresh();
                } else {
                    enqueueSnackbar('Có lỗi xảy ra khi xóa Đề xuất Báo cáo.', { variant: 'error' });
                }
            } catch (error) {
                enqueueSnackbar('Lỗi xảy ra khi xóa Đề xuất Báo cáo.', { variant: 'error' });
                console.log(error);
            } finally {
                handleCloseDialog();
            }
        }
    };

    const handleEdit = async () => {
        if (selectedReport) {
            try {
                const res = await PatchReportSuggestById(
                    { id: selectedReport.id, report: newReportData.report, description: newReportData.description }, staffToken);
                if (res.status === 'success') {
                    enqueueSnackbar('Đề xuất Báo cáo đã được cập nhật thành công!', { variant: 'success' });
                    refresh();
                } else {
                    enqueueSnackbar('Có lỗi xảy ra khi cập nhật Đề xuất Báo cáo.', { variant: 'error' });
                }
            } catch (error) {
                enqueueSnackbar('Lỗi xảy ra khi cập nhật Đề xuất Báo cáo.', { variant: 'error' });
                console.log(error);
            } finally {
                handleCloseDialog();
            }
        }
    };

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Đề xuất Báo cáo</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Mô tả</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Quản lý</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reportSuggests.map((report) => (
                            <TableRow
                                key={report.id}
                                hover
                                sx={{
                                    '&:hover': {
                                        backgroundColor: '#f0f0f0',
                                    },
                                    transition: 'background-color 0.3s ease',
                                }}
                            >
                                <TableCell>{report.report}</TableCell>
                                <TableCell>{report.description}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Sửa">
                                        <IconButton
                                            onClick={() => handleOpenDialog(report, 'edit')}
                                            sx={{
                                                color: '#1976d2',
                                                '&:hover': { color: '#1565c0' },
                                            }}
                                        >
                                            <EditIcon sx={{ fontSize: '1.2rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton
                                            onClick={() => handleOpenDialog(report, 'delete')}
                                            sx={{
                                                color: '#d32f2f',
                                                '&:hover': { color: '#c62828' },
                                            }}
                                        >
                                            <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog dùng chung cho cả xóa và sửa */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {dialogMode === 'edit' ? "Sửa Đề xuất Báo cáo" : "Xác nhận xóa"}
                </DialogTitle>
                <DialogContent>
                    {dialogMode === 'edit' ? (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Đề xuất Báo cáo"
                                fullWidth
                                value={newReportData.report}
                                onChange={(e) => setNewReportData({ ...newReportData, report: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                margin="dense"
                                label="Mô tả"
                                fullWidth
                                value={newReportData.description}
                                onChange={(e) => setNewReportData({ ...newReportData, description: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                        </>
                    ) : (
                        <Typography>Bạn có muốn xóa report suggest : {selectedReport?.report} ?</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng</Button>
                    {dialogMode === 'edit' ? (
                        <Button onClick={handleEdit} color="primary">Lưu</Button>
                    ) : (
                        <Button onClick={handleDelete} color="error">Xóa</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

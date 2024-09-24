'use client';

import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, TableContainer, Skeleton, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { DeleteReportSuggestById, PatchReportSuggestById } from "package/api/report-suggest/id";
import { ReportSuggest } from "package/api/report-suggest";
import { enqueueSnackbar } from "notistack";
import { StaffToken } from "hooks/use-login";
import { ReportSuggestTableRender } from "./ReportSuggestTable";

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

    const handleDelete = async (id: number) => {
        try {
            const res = await DeleteReportSuggestById({ id }, staffToken);
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
    }

    return (
        <>
            {/* Render bảng đề xuất báo cáo */}
            {reportSuggests.length > 0 ? (<ReportSuggestTableRender
                reportSuggest={reportSuggests}
                handleDelete={(id) => handleOpenDialog(reportSuggests.find(rs => rs.id === id)!, 'delete')}
                handleEdit={(id) => handleOpenDialog(reportSuggests.find(rs => rs.id === id)!, 'edit')}
            />) : (SkeletonTable())}

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
                        <Typography>Bạn có muốn xóa đề xuất báo cáo: {selectedReport?.report}?</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Đóng</Button>
                    {dialogMode === 'edit' ? (
                        <Button onClick={handleEdit} color="primary">Lưu</Button>
                    ) : (
                        <Button onClick={() => handleDelete(selectedReport?.id!)} color="error">Xóa</Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

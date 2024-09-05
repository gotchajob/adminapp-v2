'use client';

import { useState, useEffect } from "react";
import {
    Grid,
    Typography,
    Pagination,
    Button,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AddIcon from "@mui/icons-material/Add";
import ReportSuggestList from "./_components/report-suggest-list";
import { UseGetReportSuggest } from "hooks/use-get-report-suggest";
import { StaffToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { PostReportSuggest } from "package/api/report-suggest";
import { enqueueSnackbar } from "notistack";

export default function ReportSuggestManage() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const { refresh, refreshTime } = useRefresh();
    const { staffToken } = StaffToken();
    const { reportSuggest, loading } = UseGetReportSuggest({}, staffToken, refreshTime);
    const [openDialog, setOpenDialog] = useState(false);
    const [newReport, setNewReport] = useState({ report: "", description: "" });

    useEffect(() => {
        setTotalPages(Math.ceil(reportSuggest.length / rowsPerPage));
    }, [reportSuggest, rowsPerPage]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => setPage(value);

    const handleRowsPerPageChange = (rows: number) => {
        setRowsPerPage(rows);
        setAnchorEl(null);
    };

    const handleAddNew = () => {
        setNewReport({ report: "", description: "" });
        setOpenDialog(true);
    };

    const handleSubmit = async () => {
        try {
            const res = await PostReportSuggest(newReport, staffToken);
            if (res.status === 'success') {
                enqueueSnackbar('Thêm Report Suggest thành công!', { variant: 'success' });
                refresh();
                setOpenDialog(false);
            } else {
                throw new Error();
            }
        } catch (error) {
            enqueueSnackbar('Lỗi xảy ra khi thêm Report Suggest.', { variant: 'error' });
        }
    };

    return (
        <>
            <MainCard
                title={
                    <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
                        <Grid item>
                            <Typography variant="h4">Quản lý Report Suggest</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
                                Thêm Report Suggest
                            </Button>
                        </Grid>
                    </Grid>
                }
            >
                <ReportSuggestList reportSuggests={reportSuggest} refresh={refresh} />
                <Grid item xs={12} sx={{ mt: 1.75 }}>
                    <Grid container justifyContent="space-between" spacing={gridSpacing}>
                        <Grid item>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </Grid>
                        <Grid item>
                            <Button
                                variant="text"
                                size="large"
                                sx={{ color: "grey.900" }}
                                color="secondary"
                                endIcon={<ExpandMoreRoundedIcon />}
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                                {rowsPerPage} Rows
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(null)}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                            >
                                <MenuItem onClick={() => handleRowsPerPageChange(10)}>10 Rows</MenuItem>
                                <MenuItem onClick={() => handleRowsPerPageChange(20)}>20 Rows</MenuItem>
                                <MenuItem onClick={() => handleRowsPerPageChange(30)}>30 Rows</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Thêm Đề xuất Báo cáo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Report Suggest"
                        fullWidth
                        value={newReport.report}
                        onChange={(e) => setNewReport({ ...newReport, report: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Mô tả"
                        fullWidth
                        value={newReport.description}
                        onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
                    <Button onClick={handleSubmit} color="primary">
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

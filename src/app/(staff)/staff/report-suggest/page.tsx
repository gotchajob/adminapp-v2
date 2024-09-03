'use client';

import { useEffect, useState } from "react";
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
import { PostReportSuggest, ReportSuggest } from "package/api/report-suggest";
import { PatchReportSuggestById } from "package/api/report-suggest/id";

export default function ReportSuggestManage() {
    // const [page, setPage] = useState(1);
    // const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [totalPages, setTotalPages] = useState(1);
    // const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    // const { refresh, refreshTime } = useRefresh();
    // const { staffToken } = StaffToken();
    // const { reportSuggest, loading: reportSuggestLoading } = UseGetReportSuggest({}, staffToken, refreshTime);
    // const [openDialog, setOpenDialog] = useState(false);
    // const [selectedReport, setSelectedReport] = useState<ReportSuggest | null>(null);
    // const [newReport, setNewReport] = useState({ report: "", description: "" });
    // const [editMode, setEditMode] = useState(false);

    // useEffect(() => {
    //     const calculateTotalPages = () => {
    //         if (reportSuggest.length > 0) {
    //             setTotalPages(Math.ceil(reportSuggest.length / rowsPerPage));
    //         }
    //     };
    //     calculateTotalPages();
    // }, [reportSuggest, rowsPerPage]);

    // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setPage(value);
    // };

    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    // const handleRowsPerPageChange = (rows: number) => {
    //     setRowsPerPage(rows);
    //     setAnchorEl(null);
    // };

    // const handleAddNew = () => {
    //     setSelectedReport(null);
    //     setEditMode(false);
    //     setOpenDialog(true);
    // };

    // const handleSubmit = async () => {
    //     try {
    //         if (editMode && selectedReport) {
    //             const res = await PatchReportSuggestById({ id: selectedReport.id, report: selectedReport.report, description: selectedReport.description }, staffToken);
    //             if (res.status === 'success') {
    //                 refresh();
    //             }
    //         } else {
    //             const res = await PostReportSuggest({ report: newReport.report, description: newReport.description }, staffToken);
    //             if (res.status === 'success') {
    //                 refresh();
    //             }
    //         }
    //         setOpenDialog(false);
    //         setNewReport({ report: "", description: "" });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <>
            {/* <MainCard
                title={
                    <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={gridSpacing}
                    >
                        <Grid item>
                            <Typography variant="h4">Quản lý Đề xuất Báo cáo</Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNew}>
                                Thêm Đề xuất Báo cáo
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
                                onClick={handleClick}
                            >
                                {rowsPerPage} Rows
                            </Button>
                            <Menu
                                id="menu-user-list-style2"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                variant="selectedMenu"
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
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
                <DialogTitle>{editMode ? "Sửa Đề xuất Báo cáo" : "Thêm Đề xuất Báo cáo"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Đề xuất Báo cáo"
                        fullWidth
                        value={selectedReport ? selectedReport.report : newReport.report}
                        onChange={(e) =>
                            editMode
                                ? setSelectedReport({ ...selectedReport, report: e.target.value })
                                : setNewReport({ ...newReport, report: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="dense"
                        label="Mô tả"
                        fullWidth
                        value={selectedReport ? selectedReport.description : newReport.description}
                        onChange={(e) =>
                            editMode
                                ? setSelectedReport({ ...selectedReport, description: e.target.value })
                                : setNewReport({ ...newReport, description: e.target.value })
                        }
                        sx={{ mb: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
                    <Button onClick={handleSubmit} color="primary">
                        {editMode ? "Sửa" : "Thêm"}
                    </Button>
                </DialogActions>
            </Dialog> */}
        </>
    );
}

'use client';

import { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteReportSuggestById } from "package/api/report-suggest/id";
import { ReportSuggest } from "package/api/report-suggest";

export default function ReportSuggestList({ reportSuggests, refresh }: { reportSuggests: ReportSuggest[], refresh: () => void }) {
    const [selectedReport, setSelectedReport] = useState<ReportSuggest | null>(null);

    const handleEdit = (report: ReportSuggest) => {
        setSelectedReport(report);
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await DeleteReportSuggestById({ id }, "");
            if (res.status === 'success') {
                refresh();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Đề xuất Báo cáo</TableCell>
                        <TableCell>Mô tả</TableCell>
                        <TableCell align="right">Quản lý</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {reportSuggests.map((report) => (
                        <TableRow key={report.id}>
                            <TableCell>{report.report}</TableCell>
                            <TableCell>{report?.description}</TableCell>
                            <TableCell align="right">
                                <Tooltip title="Sửa">
                                    <IconButton onClick={() => handleEdit(report)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Xóa">
                                    <IconButton onClick={() => handleDelete(report.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

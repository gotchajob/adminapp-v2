"use client"

import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Pagination, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography } from "@mui/material";
import { UseGetBookingReportForExpert } from "hooks/use-get-booking-report";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import { ExpertUpReportEvidence } from 'package/api/booking-report/id/expert-up-evidence';
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { RenderBookingReportForExpertTable } from './_component/table';

// const fakeBookingReportForExpertResponse = {
//     list: [
//         {
//             id: 1,
//             customerContent: "Chuyên gia không đủ kỹ năng như đã quảng cáo.",
//             customerEvidence: "https://drive.google.com/file/d/1abcXYZ123/view?usp=sharing",
//             bookingId: 101,
//             createdAt: "2024-07-01T10:00:00Z",
//             updatedAt: "2024-07-02T12:00:00Z",
//             status: 5,
//             bookingReportSuggest: [
//                 {
//                     id: 1,
//                     reportSuggestId: 101,
//                     reportSuggest: "Hoàn lại tiền cho khách hàng",
//                 },
//                 {
//                     id: 2,
//                     reportSuggestId: 102,
//                     reportSuggest: "Yêu cầu chuyên gia cập nhật kỹ năng",
//                 }
//             ]
//         },
//         {
//             id: 2,
//             customerContent: "Buổi phỏng vấn bị gián đoạn liên tục do kết nối kém.",
//             customerEvidence: "https://drive.google.com/file/d/2defGHI456/view?usp=sharing",
//             bookingId: 102,
//             createdAt: "2024-07-05T14:30:00Z",
//             updatedAt: "2024-07-06T16:00:00Z",
//             status: 2,
//             bookingReportSuggest: [
//                 {
//                     id: 3,
//                     reportSuggestId: 103,
//                     reportSuggest: "Cung cấp một buổi phỏng vấn miễn phí khác",
//                 }
//             ]
//         },
//         {
//             id: 3,
//             customerContent: "Chuyên gia không cung cấp được giải pháp cho vấn đề của tôi.",
//             customerEvidence: "https://drive.google.com/file/d/3ghiJKL789/view?usp=sharing",
//             bookingId: 103,
//             createdAt: "2024-07-10T09:45:00Z",
//             updatedAt: "2024-07-11T11:30:00Z",
//             status: 4,
//             bookingReportSuggest: [
//                 {
//                     id: 4,
//                     reportSuggestId: 104,
//                     reportSuggest: "Liên hệ chuyên gia để giải quyết vấn đề",
//                 },
//                 {
//                     id: 5,
//                     reportSuggestId: 105,
//                     reportSuggest: "Gợi ý khách hàng tìm chuyên gia khác",
//                 }
//             ]
//         },
//         {
//             id: 4,
//             customerContent: "Chuyên gia đã hủy buổi phỏng vấn ngay trước giờ bắt đầu.",
//             customerEvidence: "https://drive.google.com/file/d/4jklMNO012/view?usp=sharing",
//             bookingId: 104,
//             createdAt: "2024-07-15T11:00:00Z",
//             updatedAt: "2024-07-16T13:00:00Z",
//             status: 3,
//             bookingReportSuggest: [
//                 {
//                     id: 6,
//                     reportSuggestId: 106,
//                     reportSuggest: "Hoàn lại tiền hoặc lên lịch lại buổi phỏng vấn",
//                 }
//             ]
//         }
//     ],
//     totalPage: 2,
// };

export default function BookingReportForExpertPage() {
    const { expertToken } = ExpertToken();
    const { refresh, refreshTime } = useRefresh();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
    const [content, setContent] = useState("");
    const [evidence, setEvidence] = useState("");

    const { bookingReportForExpert, loading: bookingReportForExpertLoading } = UseGetBookingReportForExpert({ pageNumber: page, pageSize: rowsPerPage }, refreshTime, expertToken);

    const handleOpenDialog = (report: any) => {
        setSelectedReportId(report.id);
        setEvidence('');
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setContent("");
        setEvidence("");
    };

    const handleConfirmUpdate = async () => {
        if (selectedReportId !== null) {
            const params = {
                id: selectedReportId,
                content: content,
                evidence: evidence
            };
            try {
                const response = await ExpertUpReportEvidence(params, expertToken);
                if (response.status === "success") {
                    enqueueSnackbar("Cập nhật bằng chứng thành công!", { variant: "success" });
                } else {
                    enqueueSnackbar("Có lỗi xảy ra khi cập nhật bằng chứng.", { variant: "error" });
                }
            } catch (error) {
                console.error("Error updating evidence:", error);
                enqueueSnackbar("Lỗi hệ thống khi cập nhật bằng chứng.", { variant: "error" });
            } finally {
                handleCloseDialog();
                refresh();
            }
        }
    };

    useEffect(() => {
        console.log("bookingReportForExpert", bookingReportForExpert);
    }, [bookingReportForExpert]);

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
        <MainCard title="Danh sách các báo cáo buổi phỏng vấn">
            {bookingReportForExpert && bookingReportForExpert.list.length > 0 ?
                (<RenderBookingReportForExpertTable bookingReportForExpert={bookingReportForExpert.list} handelUpdateEvidence={handleOpenDialog} />) :
                (SkeletonTable())}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Cập nhật bằng chứng</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nội dung"
                        type="text"
                        fullWidth
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Đường dẫn record"
                        type="text"
                        fullWidth
                        value={evidence}
                        onChange={(e) => setEvidence(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Đóng
                    </Button>
                    <Button onClick={handleConfirmUpdate} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}

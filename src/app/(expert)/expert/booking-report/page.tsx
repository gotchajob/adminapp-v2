"use client"

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, CircularProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { UseGetBookingReportForExpert } from "hooks/use-get-booking-report";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

const fakeBookingReportForExpertResponse = {
    list: [
        {
            id: 1,
            customerContent: "Chuyên gia không đủ kỹ năng như đã quảng cáo.",
            customerEvidence: "https://drive.google.com/file/d/1abcXYZ123/view?usp=sharing",
            bookingId: 101,
            createdAt: "2024-07-01T10:00:00Z",
            bookingReportSuggest: [
                {
                    id: 1,
                    reportSuggestId: 101,
                    reportSuggest: "Hoàn lại tiền cho khách hàng",
                },
                {
                    id: 2,
                    reportSuggestId: 102,
                    reportSuggest: "Yêu cầu chuyên gia cập nhật kỹ năng",
                }
            ]
        },
        {
            id: 2,
            customerContent: "Buổi phỏng vấn bị gián đoạn liên tục do kết nối kém.",
            customerEvidence: "https://drive.google.com/file/d/2defGHI456/view?usp=sharing",
            bookingId: 102,
            createdAt: "2024-07-05T14:30:00Z",
            bookingReportSuggest: [
                {
                    id: 3,
                    reportSuggestId: 103,
                    reportSuggest: "Cung cấp một buổi phỏng vấn miễn phí khác",
                }
            ]
        },
        {
            id: 3,
            customerContent: "Chuyên gia không cung cấp được giải pháp cho vấn đề của tôi.",
            customerEvidence: "https://drive.google.com/file/d/3ghiJKL789/view?usp=sharing",
            bookingId: 103,
            createdAt: "2024-07-10T09:45:00Z",
            bookingReportSuggest: [
                {
                    id: 4,
                    reportSuggestId: 104,
                    reportSuggest: "Liên hệ chuyên gia để giải quyết vấn đề",
                },
                {
                    id: 5,
                    reportSuggestId: 105,
                    reportSuggest: "Gợi ý khách hàng tìm chuyên gia khác",
                }
            ]
        },
        {
            id: 4,
            customerContent: "Chuyên gia đã hủy buổi phỏng vấn ngay trước giờ bắt đầu.",
            customerEvidence: "https://drive.google.com/file/d/4jklMNO012/view?usp=sharing",
            bookingId: 104,
            createdAt: "2024-07-15T11:00:00Z",
            bookingReportSuggest: [
                {
                    id: 6,
                    reportSuggestId: 106,
                    reportSuggest: "Hoàn lại tiền hoặc lên lịch lại buổi phỏng vấn",
                }
            ]
        }
    ],
    totalPage: 2,
}

export default function BookingReportForExpertPage() {
    const { expertToken } = ExpertToken();

    const { refresh, refreshTime } = useRefresh();

    const [page, setPage] = useState(1);

    const [rowsPerPage, setRowsPerPage] = useState(6);

    const { bookingReportForExpert, loading: bookingReportForExpertLoading } = UseGetBookingReportForExpert({ pageNumber: page, pageSize: rowsPerPage }, refreshTime, expertToken);

    useEffect(() => {
        console.log("bookingReportForExpert", bookingReportForExpert);
    }, [bookingReportForExpert]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    const handleViewDetails = (id: number) => {
        console.log("View details for report:", id);
        // Logic xem chi tiết ở đây
    };

    return (
        <MainCard title="Danh sách các báo cáo buổi phỏng vấn">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Lý Do Báo Cáo</TableCell>
                            <TableCell>Bằng Chứng Của Khách Hàng</TableCell>
                            <TableCell>Ngày Tạo Báo Cáo</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingReportForExpertLoading ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : fakeBookingReportForExpertResponse.list.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Box display="flex" justifyContent="center" alignItems="center">
                                        <Typography>Hiện không có báo cáo nào</Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            fakeBookingReportForExpertResponse.list.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.id}</TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.customerContent}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        <a href={report.customerEvidence} target="_blank" rel="noopener noreferrer">
                                            {report.customerEvidence}
                                        </a>
                                    </TableCell>
                                    <TableCell>{new Date(report.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Xem Chi Tiết" onClick={() => handleViewDetails(report.id)}>
                                            <VisibilityIcon />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" mt={2}>
                <Pagination
                    count={bookingReportForExpert.totalPage}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </MainCard>
    );
}

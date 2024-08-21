"use client"

import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Button, CircularProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { UseGetBookingReport } from "hooks/use-get-booking-report";
import { StaffToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

const fakeBookingReportData = {
    list: [
        {
            id: 1,
            customerContent: "Khách hàng không hài lòng với dịch vụ.",
            expertContent: "Chuyên gia đã làm hết khả năng nhưng khách hàng vẫn không hài lòng.",
            staffNote: "Xem xét lại kỹ năng của chuyên gia.",
            status: 1, // 1: Đã xử lý
            bookingId: 101,
        },
        {
            id: 2,
            customerContent: "Chuyên gia không đến đúng giờ.",
            expertContent: "Chuyên gia gặp vấn đề về giao thông, đã thông báo trễ.",
            staffNote: "Lên lịch lại buổi phỏng vấn cho khách hàng.",
            status: 0, // 0: Chưa xử lý
            bookingId: 102,
        },
        {
            id: 3,
            customerContent: "Chuyên gia không cung cấp được giải pháp hữu ích.",
            expertContent: "Chuyên gia đã cố gắng nhưng vấn đề phức tạp cần thêm thời gian.",
            staffNote: "Cân nhắc hoàn tiền hoặc giới thiệu chuyên gia khác.",
            status: 2, // 2: Đang xử lý
            bookingId: 103,
        },
    ],
    totalPage: 1,
};

export default function BookingReportPage() {
    const { staffToken } = StaffToken();
    const { refresh, refreshTime } = useRefresh();
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(6);

    const { bookingReport, loading: bookingReportLoading } = UseGetBookingReport(
        { pageNumber: page, pageSize: rowsPerPage },
        refreshTime,
        staffToken
    );

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleViewDetails = (bookingId: number) => {
        console.log("Xem chi tiết báo cáo với ID:", bookingId);
    };

    useEffect(() => {
        console.log("bookingReport:", bookingReport);
    }, [bookingReport]);

    return (
        <MainCard title="Danh sách các báo cáo buổi phỏng vấn">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID buổi phỏng vấn</TableCell>
                            <TableCell>Báo cáo của khách hàng</TableCell>
                            <TableCell>Báo cáo từ chuyên gia</TableCell>
                            <TableCell>Staff note</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookingReportLoading ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : fakeBookingReportData.list.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    <Typography>Hiện không có báo cáo nào.</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            fakeBookingReportData.list.map((report) => (
                                <TableRow key={report.id}>
                                    <TableCell>
                                        {report.id}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.customerContent}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.expertContent}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200, wordWrap: "break-word", whiteSpace: "normal" }}>
                                        {report.staffNote}
                                    </TableCell>
                                    <TableCell >
                                        {report.status}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Xem chi tiết" onClick={() => handleViewDetails(report.bookingId)}>
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
                    count={bookingReport.totalPage}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </MainCard>
    );
}

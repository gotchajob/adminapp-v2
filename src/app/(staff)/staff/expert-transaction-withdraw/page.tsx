"use client";

import BeenhereIcon from '@mui/icons-material/Beenhere';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { Box, CircularProgress, IconButton, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

const fakeExpertRequestData = [
    {
        id: 1,
        amount: "2,000,000 VND",
        type: "Rút tiền",
        description: "Rút tiền về tài khoản ACB",
        date: "2024-08-09",
        status: "pending",
    },
    {
        id: 2,
        amount: "1,500,000 VND",
        type: "Rút tiền",
        description: "Rút tiền về tài khoản Vietcombank",
        date: "2024-08-08",
        status: "approved",
    },
    {
        id: 3,
        amount: "3,200,000 VND",
        type: "Rút tiền",
        description: "Rút tiền về tài khoản BIDV",
        date: "2024-08-07",
        status: "rejected",
    },
    {
        id: 4,
        amount: "5,000,000 VND",
        type: "Rút tiền",
        description: "Rút tiền về tài khoản Techcombank",
        date: "2024-08-06",
        status: "pending",
    },
    {
        id: 5,
        amount: "4,500,000 VND",
        type: "Rút tiền",
        description: "Rút tiền về tài khoản VPBank",
        date: "2024-08-05",
        status: "approved",
    },
    {
        id: 6,
        amount: "2,800,000 VND",
        type: "Rút tiền",
        description: "Rút tiền về tài khoản Sacombank",
        date: "2024-08-04",
        status: "pending",
    },
];

export default function ExpertTransactionWithDraw() {
    const { refresh, refreshTime } = useRefresh();
    const { expertToken } = ExpertToken();
    const [page, setPage] = useState(1);
    const [rowsPerPage] = useState(6);
    const [loading, setLoading] = useState<boolean>(false);
    const [expertRequest, setExpertRequest] = useState(fakeExpertRequestData);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page, refreshTime]);

    const fetchData = async () => {
        setLoading(true);
        try {

        } catch (error) {
            console.error("Error fetching transactions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: number) => {
        try {

            refresh();
        } catch (error) {
            console.error("Error approving transaction:", error);
        }
    };

    const handleReject = async (id: number) => {
        try {
            refresh();
        } catch (error) {
            console.error("Error rejecting transaction:", error);
        }
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    };

    return (
        <MainCard title="Danh sách giao dịch thành công">
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID Giao Dịch</TableCell>
                            <TableCell>Số Tiền Giao Dịch</TableCell>
                            <TableCell>Loại Giao Dịch</TableCell>
                            <TableCell>Mô Tả</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Ngày Thực Hiện Giao Dịch</TableCell>
                            <TableCell align="center">Hành Động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : expertRequest.length > 0 ? (
                            expertRequest.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell >{data.id}</TableCell>
                                    <TableCell >{data.amount}</TableCell>
                                    <TableCell >{data.type}</TableCell>
                                    <TableCell >{data.description}</TableCell>
                                    <TableCell>Trạng thái</TableCell>
                                    <TableCell >{data.date}</TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Duyệt yêu cầu">
                                            <IconButton onClick={() => handleApprove(data.id)} sx={{ color: "#2196F3" }}>
                                                <BeenhereIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Từ chối yêu cầu">
                                            <IconButton onClick={() => handleReject(data.id)} sx={{ color: "#F44336" }}>
                                                <CancelPresentationIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow hover>
                                <TableCell colSpan={6} align="center">
                                    Hiện chưa có giao dịch nào.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Box sx={{ display: "flex", justifyContent: "center", paddingY: 3 }}>
                    <Pagination
                        count={totalPage}
                        page={page + 1}
                        onChange={handleChangePage}
                        shape="rounded"
                        variant="outlined"
                        color="primary"
                    />
                </Box>
            </TableContainer>
        </MainCard>
    );
}

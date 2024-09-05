"use client";

import {
  Box,
  Chip,
  CircularProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { useGetTransactionCurrentWithdraw } from "hooks/use-get-transaction";
import { useGetTransactionType } from "hooks/use-get-transaction-type";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { TransactionCurrentWithdraw } from "package/api/transaction/current/withdraw";
import { formatDate } from "package/util";
import { useEffect, useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { RenderTransactionCurrentWithdrawTable } from "./_component/table";

const formatCurrency = (value: number) => {
  try {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  } catch (error) {
    console.error("Lỗi khi format currency:", error);
    return 'N/A';
  }
};

const renderStatusChip = (status: number) => {
  switch (status) {
    case 1:
      return <Chip label="Thành công" color="success" />;
    case 2:
      return <Chip label="Đang xử lý" color="warning" />;
    case 3:
      return <Chip label="Thất bại" color="error" />;
    default:
      return <Chip label="Unknown" />;
  }
};

export default function TransactionPage() {
  const { refresh, refreshTime } = useRefresh();

  const { expertToken } = ExpertToken();

  const { transactionCurrentWithdraw, loading: transactionCurrentWithdrawLoading } = useGetTransactionCurrentWithdraw({ pageNumber: 1, pageSize: 10 }, expertToken, refreshTime);

  const { transactionType, loading: transactionTypeLoading } = useGetTransactionType(refreshTime);

  const getTransactionTypeName = (typeId: number) => {
    const type = transactionType?.find((type) => type.id === typeId);
    return type ? type.description : "Không xác định";
  };

  useEffect(() => {
    console.log("transactionCurrentWithdraw", transactionCurrentWithdraw);
    console.log("transactionType", transactionType);
  }, [transactionCurrentWithdraw, transactionType]);


  return (
    <MainCard title="Danh sách yêu cầu rút tiền">
      {transactionCurrentWithdraw && (<RenderTransactionCurrentWithdrawTable transactionCurrentWithdraw={transactionCurrentWithdraw} />)}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell >ID Giao Dịch</TableCell>
              <TableCell>Số Tiền Giao Dịch</TableCell>
              <TableCell >Loại Giao Dịch</TableCell>
              <TableCell >Mô Tả</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell >Ngày Thực Hiện Giao Dịch</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{ "& .MuiTableRow-root:hover": { bgcolor: "#E3F2FD" } }}
          >
            {transactionCurrentWithdrawLoading || transactionTypeLoading ? (
              <TableRow hover>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : transactionCurrentWithdraw.list.length > 0 ? (
              transactionCurrentWithdraw.list.map((transaction: TransactionCurrentWithdraw) => (
                <TableRow hover key={transaction.id}>
                  <TableCell>
                    {transaction.id}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#00796b' }}>
                    {formatCurrency(transaction.amount)}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#2196F3' }}>
                    {getTransactionTypeName(transaction.typeId)}
                  </TableCell>
                  <TableCell sx={{ maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {transaction.description}
                  </TableCell>
                  <TableCell>{renderStatusChip(transaction.status)}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {formatDate(transaction.createdAt, "dd/MM/yyyy - hh:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xem Chi Tiết">
                      <IconButton onClick={() => { }} sx={{ color: "#2196F3" }}>
                        <VisibilityIcon />
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
            count={Math.ceil(
              (transactionCurrentWithdraw.totalPage * rowsPerPage) / rowsPerPage
            )}
            page={page + 1}
            onChange={handleChangePage}
            shape="rounded"
            variant="outlined"
            color="primary"
          />
        </Box>
      </TableContainer> */}
    </MainCard>
  );
}

"use client";

import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Pagination,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ExpertToken } from "hooks/use-login";
import { useRefresh } from "hooks/use-refresh";
import { formatDate } from "package/util";
import { useState, useEffect } from "react";
import { useGetTransactionCurrent } from "hooks/use-get-transaction";
import { useGetTransactionType } from "hooks/use-get-transaction-type";
import { TransactionCurrent } from "package/api/transaction/current";
import SubCard from "ui-component/cards/SubCard";
import MainCard from "ui-component/cards/MainCard";

export default function TransactionPage() {
  const { refresh, refreshTime } = useRefresh();

  const { expertToken } = ExpertToken();

  const [page, setPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(6);

  const { transactionCurrent, loading: transactionCurrentLoading } =
    useGetTransactionCurrent(
      { pageNumber: page, pageSize: rowsPerPage },
      expertToken,
      refreshTime
    );

  const { transactionType, loading: transactionTypeLoading } =
    useGetTransactionType(refreshTime);

  const getTransactionTypeName = (typeId: number) => {
    const type = transactionType?.find((type) => type.id === typeId);
    return type ? type.description : "Không xác định";
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    console.log("transactionCurrent", transactionCurrent);
    console.log("transactionType", transactionType);
  }, [transactionCurrent, transactionType]);

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
              <TableCell>Ngày Thực Hiện Giao Dịch</TableCell>
              <TableCell align="center">Hành Động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{ "& .MuiTableRow-root:hover": { bgcolor: "#E3F2FD" } }}
          >
            {transactionCurrentLoading ? (
              <TableRow hover>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : transactionCurrent.list.length > 0 ? (
              transactionCurrent.list.map((transaction: TransactionCurrent) => (
                <TableRow hover key={transaction.id}>
                  <TableCell sx={{ pl: 3, fontWeight: 500 }}>
                    {transaction.id}
                  </TableCell>
                  <TableCell sx={{ pl: 3 }}>
                    {transaction.amount.toLocaleString()} VND
                  </TableCell>
                  <TableCell>
                    {getTransactionTypeName(transaction.typeId)}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {formatDate(transaction.createdAt, "dd/MM/yyyy - hh:mm")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Xem Chi Tiết">
                      <IconButton onClick={() => {}} sx={{ color: "#2196F3" }}>
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
              (transactionCurrent.totalPage * rowsPerPage) / rowsPerPage
            )}
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

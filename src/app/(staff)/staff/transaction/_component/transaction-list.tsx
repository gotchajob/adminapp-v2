'use client';

import React, { useEffect, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import VisibilityIcon from '@mui/icons-material/Visibility';

// hooks
import { useGetTransaction } from 'hooks/use-get-transaction';
import { useRefresh } from 'hooks/use-refresh';

// utils
import { formatDate } from 'package/util';
import { CustomerToken } from 'hooks/use-login';

const TransactionList = () => {
  const theme = useTheme();
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);

  const {customerToken} = CustomerToken()
  const { refresh, refreshTime } = useRefresh();

  const { transaction, loading: transactionLoading } = useGetTransaction({ pageSize: pageSize, pageNumber: page }, customerToken, refreshTime);

  useEffect(() => {
    console.log("Transaction Data", transaction);
  }, [transaction]);

  // const handleChangeTransactionType=  (typeId:number) =>{
  //   switch()
  // }

  const transactionType = (status: number) => {
    switch (status) {
      case 1:
        return (
          <Chip
            label="Thành công"
            sx={{
              bgcolor: theme.palette.success.light,
              color: theme.palette.success.dark,
              fontWeight: 'bold'
            }}
          />
        );
      case 2:
        return (
          <Chip
            label="Đang xử lý"
            sx={{
              bgcolor: theme.palette.warning.light,
              color: theme.palette.warning.dark,
              fontWeight: 'bold'
            }}
          />
        );
      case 3:
        return (
          <Chip
            label="Thất bại"
            sx={{
              bgcolor: theme.palette.error.light,
              color: theme.palette.error.dark,
              fontWeight: 'bold'
            }}
          />
        );
      default:
        return (
          <Chip
            label="Không xác định"
            sx={{
              bgcolor: theme.palette.grey[300],
              color: theme.palette.text.primary,
              fontWeight: 'bold'
            }}
          />
        );
    }
  }

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>Mã giao dịch</TableCell>
            <TableCell>Số tiền giao dịch</TableCell>
            <TableCell>Loại giao dịch</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Ngày giờ tạo</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Hành động
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionLoading ? (
            <TableRow hover>
              <TableCell colSpan={6} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : transaction?.list?.length > 0 ? (
            transaction.list.map((row) => (
              <TableRow hover key={row.id}>
                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                <TableCell>{row.amount.toLocaleString()} VND</TableCell>
                <TableCell>{transactionType(row.status)}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <Typography variant="subtitle2" noWrap>
                    {formatDate(row.createdAt, "dd/MM/yyyy - hh:mm")}
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Tooltip title="Xem Chi Tiết">
                    <IconButton color="primary">
                      <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
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
      <Stack spacing={2} sx={{ mt: 2 }} alignItems="center">
        <Pagination
          count={transaction?.totalPage || 0}
          page={page}
          onChange={handleChangePage}
          shape="rounded"
          variant="outlined"
          color="primary"
        />
      </Stack>
    </TableContainer>
  );
};

export default TransactionList;
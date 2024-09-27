'use client';

import React, { useEffect, useState } from 'react';

// material-ui
import { CircularProgress, IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useTheme } from '@mui/material/styles';

// hooks
import { useGetTransaction } from 'hooks/use-get-transaction';
import { useRefresh } from 'hooks/use-refresh';

// utils
import { formatDate } from 'package/util';
import { CustomerToken, StaffToken } from 'hooks/use-login';
import { Transaction } from 'package/api/transaction';
import { TransactionTableRender } from './TransactionTable';

// Dữ liệu fake giao dịch
// export const fakeTransactions: Transaction[] = [
//   {
//     id: 1,
//     accountId: 1001,
//     amount: 500000,
//     balanceAfterTransaction: 1500000,
//     typeId: 1, // 1: Nạp tiền
//     status: 1, // 1: Thành công
//     description: 'Nạp tiền vào tài khoản',
//     createdAt: '2024-08-01T10:15:30.000Z',
//     referId: 301,
//   },
//   {
//     id: 2,
//     accountId: 1002,
//     amount: 200000,
//     balanceAfterTransaction: 800000,
//     typeId: 2, // 2: Rút tiền
//     status: 1, // 1: Thành công
//     description: 'Rút tiền từ tài khoản',
//     createdAt: '2024-08-02T14:45:10.000Z',
//     referId: 302,
//   },
//   {
//     id: 3,
//     accountId: 1001,
//     amount: 100000,
//     balanceAfterTransaction: 1600000,
//     typeId: 3, // 3: Chuyển khoản nhận
//     status: 1, // 1: Thành công
//     description: 'Nhận tiền từ tài khoản 1003',
//     createdAt: '2024-08-03T09:25:50.000Z',
//     referId: 303,
//   },
//   {
//     id: 4,
//     accountId: 1003,
//     amount: 500000,
//     balanceAfterTransaction: 500000,
//     typeId: 4, // 4: Chuyển khoản gửi
//     status: 2, // 2: Đang xử lý
//     description: 'Chuyển tiền cho tài khoản 1001',
//     createdAt: '2024-08-04T16:10:15.000Z',
//     referId: 304,
//   },
//   {
//     id: 5,
//     accountId: 1002,
//     amount: 300000,
//     balanceAfterTransaction: 1100000,
//     typeId: 1, // 1: Nạp tiền
//     status: 3, // 3: Thất bại
//     description: 'Nạp tiền thất bại',
//     createdAt: '2024-08-05T11:35:40.000Z',
//     referId: 305,
//   }
// ];

const TransactionList = () => {
  const theme = useTheme();
  const { staffToken } = StaffToken();
  const { refresh, refreshTime } = useRefresh();
  const { transaction, loading: transactionLoading } = useGetTransaction({ pageSize: 1000, pageNumber: 1 }, staffToken, refreshTime);

  useEffect(() => {
    console.log('Transaction Data', transaction);
  }, [transaction]);

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
    <>
      {transaction.list.length > 0 ?
        (<TransactionTableRender transactionList={transaction.list} />)
        : (SkeletonTable())}
    </>
  );
};

export default TransactionList;

{/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>Mã giao dịch</TableCell>
              <TableCell>Số tiền giao dịch</TableCell>
              <TableCell>Loại giao dịch</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Ngày giờ tạo</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionLoading ? (
              <TableRow hover>
                <TableCell colSpan={6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : fakeTransactions.length > 0 ? (
              fakeTransactions.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                  <TableCell>{row.amount.toLocaleString()} VND</TableCell>
                  <TableCell>{transactionType(row.status)}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" noWrap>
                      {formatDate(row.createdAt, 'dd/MM/yyyy - hh:mm')}
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
      </TableContainer> */}
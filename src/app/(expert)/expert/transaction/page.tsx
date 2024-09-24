"use client";

import {
  Box,
  Chip,
  CircularProgress,
  Pagination,
  Skeleton,
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
    if (isNaN(value) || value === null || value === undefined) {
      return '0 đ';
    }
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  } catch (error) {
    console.error('Lỗi khi format currency:', error);
    return '0 đ';
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

  useEffect(() => {
    console.log("transactionCurrentWithdraw", transactionCurrentWithdraw);
    console.log("transactionType", transactionType);
  }, [transactionCurrentWithdraw, transactionType]);

  return (
    <MainCard title="Danh sách yêu cầu rút tiền">
      {transactionCurrentWithdraw && transactionCurrentWithdraw.list.length > 0 ? (<RenderTransactionCurrentWithdrawTable transactionCurrentWithdraw={transactionCurrentWithdraw} transactionType={transactionType} />) : (SkeletonTable())}
    </MainCard>
  );
}

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
      {transactionCurrentWithdraw && (<RenderTransactionCurrentWithdrawTable transactionCurrentWithdraw={transactionCurrentWithdraw} transactionType={transactionType} />)}
    </MainCard>
  );
}

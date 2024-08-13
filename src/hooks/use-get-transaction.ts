
import { GetTransaction, GetTransactionReq, TransactionRes } from "package/api/transaction";
import { GetTransactionCurrent, GetTransactionCurrentReq, TransactionCurrentRes } from "package/api/transaction/current";
import { GetTransactionCurrentWithdraw, GetTransactionCurrentWithdrawReq, TransactionCurrentWithdrawRes } from "package/api/transaction/current/withdraw";
import { useEffect, useState } from "react";

export const useGetTransactionCurrent = (params: GetTransactionCurrentReq, accessToken: string, refresh: number) => {
    const [transactionCurrent, setTransactionCurrent] = useState<TransactionCurrentRes>({ list: [], totalPage: 0 });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchTransactionCurrent = async () => {
        try {
            if (!accessToken) {
                return;
            }
            setLoading(true);
            const data = await GetTransactionCurrent(params, accessToken);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setTransactionCurrent(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTransactionCurrent() }, [accessToken, params.pageNumber, params.pageSize, refresh]);

    return {
        transactionCurrent, loading
    }
}

export const useGetTransaction = (params: GetTransactionReq, refresh: number) => {
    const [transaction, setTransaction] = useState<TransactionRes>({ list: [], totalPage: 0 });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchTransaction = async () => {
        try {
            setLoading(true);
            const data = await GetTransaction(params);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setTransaction(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTransaction() }, [params.pageNumber, params.pageSize, params.search, params.sortBy, refresh]);

    return {
        transaction, loading
    }
}

export const useGetTransactionCurrentWithdraw = (params: GetTransactionCurrentWithdrawReq, accessToken: string, refresh: number) => {
    const [transactionCurrentWithdraw, setTransactionCurrentWithdraw] = useState<TransactionCurrentWithdrawRes>({ list: [], totalPage: 0 });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchTransactionCurrentWithdraw = async () => {
        if (!accessToken) {
            return
        }
        try {
            setLoading(true);
            const data = await GetTransactionCurrentWithdraw(params, accessToken);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setTransactionCurrentWithdraw(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTransactionCurrentWithdraw() }, [params.pageNumber, params.pageSize, params.status, params.sortBy, refresh, accessToken]);

    return {
        transactionCurrentWithdraw, loading
    }
}
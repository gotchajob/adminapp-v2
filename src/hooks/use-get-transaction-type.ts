import { GetTransactionType, TransactionTypeRes } from "package/api/transaction-type";
import { useEffect, useState } from "react";

export const useGetTransactionType = (refresh: number) => {
    const [transactionType, setTransactionType] = useState<TransactionTypeRes[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchTransactionType = async () => {
        try {
            setLoading(true);
            const data = await GetTransactionType();
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setTransactionType(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTransactionType() }, [refresh]);

    return {
        transactionType, loading
    }
}
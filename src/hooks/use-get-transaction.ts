import { Balance } from "package/api/account/current/balance";
import { GetTransaction, GetTransactionReq, TransactionRes } from "package/api/account/current/transaction";
import { useEffect, useState } from "react";

export const useGetTransaction = (params: GetTransactionReq, accessToken: string) => {
    const [transaction, setTransaction] = useState<TransactionRes>();

    const fetchTransaction = async () => {
        try {
            const data = await GetTransaction(params, accessToken);
            setTransaction(data.data);
        } catch (error) {
            throw new Error();
        }
    }

    useEffect(() => { fetchTransaction() }, [accessToken, params.pageNumber, params.pageSize]);

    return {
        transaction
    }
}
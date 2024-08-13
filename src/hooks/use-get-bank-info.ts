
import { BankInfo } from "package/api/bank-info-controller";
import { GetBankInfoCurrent, GetBankInfoCurrentRes } from "package/api/bank-info-controller/current";
import { GetTransaction, GetTransactionReq, TransactionRes } from "package/api/transaction";
import { useEffect, useState } from "react";

export const useGetBankInfoCurrent = (accessToken: string, refresh: number) => {
    const [bankInfo, setBankInfo] = useState<BankInfo[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchBankInfo = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const data = await GetBankInfoCurrent(accessToken);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setBankInfo(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchBankInfo() }, [accessToken, refresh]);

    return {
        bankInfo, loading
    }
}
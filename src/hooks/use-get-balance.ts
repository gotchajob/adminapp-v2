import { Balance, GetBalance } from "package/api/account/current/balance";
import { useEffect, useState } from "react";

export const useGetBalance = (accessToken: string) => {
    const [balance, setBalance] = useState<Balance>();

    const fetchBalance = async () => {
        try {
            const data = await GetBalance(accessToken);
            setBalance(data.data);
        } catch (error) {
            throw new Error();
        }
    }

    useEffect(() => { fetchBalance() }, [accessToken]);

    return {
        balance
    }
}
import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBalanceResponse {
    status: string;
    responseText: string;
    data: Balance;
}

export interface Balance {
    balance: number;
}

export const GetBalance = async (accessToken: string): Promise<GetBalanceResponse> => {
    try {
        const res = await apiServerFetch(`/account/current/balance`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};
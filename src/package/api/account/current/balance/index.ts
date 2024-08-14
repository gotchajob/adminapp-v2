import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBalanceCurrentResponse {
    status: string;
    responseText: string;
    data: BalanceCurrent;
}

export interface BalanceCurrent {
    balance: number;
}

export const GetBalanceCurrent = async (accessToken: string): Promise<GetBalanceCurrentResponse> => {
    try {
        const res = await apiServerFetch(`/account/current/balance`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};
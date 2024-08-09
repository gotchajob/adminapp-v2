import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetTransactionReq {
    pageNumber: number;
    pageSize: number;
}

export interface GetTransactionRes {
    status: string;
    responseText: string;
    data: TransactionRes;
}

export interface TransactionRes {
    list: Transaction[],
    totalPage: number
}

export interface Transaction {
    id: number;
    amount: number;
    type: string;
    description: string;
    createdAt: string;
}

export const GetTransaction = async (params: GetTransactionReq, accessToken: string): Promise<GetTransactionRes> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        const res = await apiServerFetch(`account/current/transaction?` + url, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
    }
};
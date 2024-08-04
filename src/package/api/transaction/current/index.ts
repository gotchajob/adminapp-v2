import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetTransactionCurrentReq {
    pageNumber: number;
    pageSize: number;
}

export interface GetTransactionCurrentRes {
    status: string;
    responseText: string;
    data: TransactionCurrentRes;
}

export interface TransactionCurrentRes {
    list: TransactionCurrent[],
    totalPage: number
}

export interface TransactionCurrent {
    id: number;
    amount: number;
    typeId: number;
    description: string;
    createdAt: string;
}

export const GetTransactionCurrent = async (params: GetTransactionCurrentReq, accessToken: string): Promise<GetTransactionCurrentRes> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        const res = await apiServerFetch(`/transaction/current?` + url, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
    }
};
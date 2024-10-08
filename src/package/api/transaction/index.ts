import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetTransactionReq {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    search?: string[];
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
    accountId: number;
    amount: number;
    balanceAfterTransaction: number;
    typeId: number;
    status: number;
    description: string;
    createdAt: string;
    referId: number;
}

export const GetTransaction = async (params: GetTransactionReq, accessToken: string): Promise<GetTransactionRes> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        url.append("sortBy", params.sortBy + "");
        url.append("search", params.search + "");
        const res = await apiServerFetch(`/transaction?` + url, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
    }
};
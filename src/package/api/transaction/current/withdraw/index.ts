import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetTransactionCurrentWithdrawReq {
    pageNumber: number;
    pageSize: number;
    sortBy?: string | null;
    status?: string | null;
}

export interface GetTransactionCurrentWithdrawRes {
    status: string;
    responseText: string;
    data: TransactionCurrentWithdrawRes;
}

export interface TransactionCurrentWithdrawRes {
    list: TransactionCurrentWithdraw[],
    totalPage: number
}

export interface TransactionCurrentWithdraw {
    id: number;
    amount: number;
    balanceAfterTransaction: number;
    typeId: number;
    status: number;
    description: string;
    createdAt: string;
}

export const GetTransactionCurrentWithdraw = async (params: GetTransactionCurrentWithdrawReq, accessToken: string): Promise<GetTransactionCurrentWithdrawRes> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        if (params.sortBy) {
            url.append("sortBy", params.sortBy + "");
        }
        if (params.status) {
            url.append("status", params.status + "");
        }
        const res = await apiServerFetch(`/transaction/current/withdraw?` + url, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
    }
};
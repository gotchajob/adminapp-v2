import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetTransactionTypeRes {
    status: string;
    responseText: string;
    data: TransactionTypeRes[];
}

export interface TransactionTypeRes {
    id: number;
    type: string;
    description: string;
}

export const GetTransactionType = async (): Promise<GetTransactionTypeRes> => {
    try {
        const res = await apiServerFetch(`/transaction-type`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
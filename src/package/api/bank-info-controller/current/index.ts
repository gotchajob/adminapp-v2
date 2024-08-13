import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBankInfoCurrentRes {
    status: string;
    responseText: string;
    data: BankInfo[];
}

export interface BankInfo {
    id: number;
    bankCode: string,
    numberCard: string,
    nameHolder: string,
    status: number;
}

export const GetBankInfoCurrent = async (accessToken: string): Promise<GetBankInfoCurrentRes> => {
    try {
        const res = await apiServerFetch(`/bankInfo/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
}; 
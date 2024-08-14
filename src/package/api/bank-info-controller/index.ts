import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBankInfoRes {
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

export const GetBankInfo = async (): Promise<GetBankInfoRes> => {
    try {
        const res = await apiServerFetch(`/bankInfo`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface PostBankInfoReq {
    bankCode: string,
    numberCard: string,
    nameHolder: string
}

export interface PostBankInfoRes {
    status: string;
    responseText: string;
}

export const PostBankInfo = async (params: PostBankInfoReq, accessToken: string): Promise<GetBankInfoRes> => {
    try {
        const res = await apiServerFetch(`/bankInfo`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
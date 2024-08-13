import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBankInfoByIdRq {
    id: number;
}

export interface GetBankInfoByIdRes {
    status: string;
    responseText: string;
    data: BankInfo;
}

export interface BankInfo {
    id: number;
    bankCode: string,
    numberCard: string,
    nameHolder: string,
    status: number;
}

export const GetBankInfoById = async (params: GetBankInfoByIdRq, accessToken: string): Promise<GetBankInfoByIdRes> => {
    try {
        const res = await apiServerFetch(`/bankInfo/${params.id}`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface DelBankInfoByIdRq {
    id: number;
}

export interface DelBankInfoByIdRes {
    status: string;
    responseText: string;
}

export const DelBankInfoById = async (params: DelBankInfoByIdRq, accessToken: string): Promise<DelBankInfoByIdRes> => {
    try {
        const res = await apiServerFetch(`/bankInfo/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface PatchBankInfoByIdRq {
    id: number;
    bankCode: string,
    numberCard: string,
    nameHolder: string;
}

export interface PatchBankInfoByIdRes {
    status: string;
    responseText: string;
}

export const PatchBankInfoById = async (params: PatchBankInfoByIdRq, accessToken: string): Promise<PatchBankInfoByIdRes> => {
    try {
        const res = await apiServerFetch(`/bankInfo/${params.id}`, 'PATCH', {
            bankCode: params.bankCode,
            numberCard: params.numberCard,
            nameHolder: params.nameHolder
        }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
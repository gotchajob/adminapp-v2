import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchAccountCurrentWithdrawnRq {
    amount: number,
    description: string,
    bankInfoId: number
}

export interface PatchAccountCurrentWithdrawnRes {
    status: string;
    responseText: string;
}

export const PatchAccountCurrentWithdrawn = async (params: PatchAccountCurrentWithdrawnRq, accessToken: string): Promise<PatchAccountCurrentWithdrawnRes> => {
    try {
        const res = await apiServerFetch(`/account/current/withdrawn`, 'PATCH', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem(error.message, '');
    }
};
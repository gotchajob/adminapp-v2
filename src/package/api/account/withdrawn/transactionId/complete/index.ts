import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchCompleteWithdrawnRq {
    transactionId: number;
}

export interface PatchCompleteWithdrawnRes {
    status: string;
    responseText: string;
}

export const PatchCompleteWithdrawn = async (params: PatchCompleteWithdrawnRq, accessToken: string): Promise<PatchCompleteWithdrawnRes> => {
    try {
        const res = await apiServerFetch(`/account/withdrawn/${params.transactionId}/complete`, 'PATCH', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
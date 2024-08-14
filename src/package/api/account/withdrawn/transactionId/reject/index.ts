import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchRejectWithdrawnRq {
    transactionId: number;
    reason: string;
}

export interface PatchRejectWithdrawnRes {
    status: string;
    responseText: string;
}

export const PatchRejectWithdrawn = async (params: PatchRejectWithdrawnRq, accessToken: string): Promise<PatchRejectWithdrawnRes> => {
    try {
        const res = await apiServerFetch(`/account/withdrawn/${params.transactionId}/reject`, 'PATCH', { reason: params.reason }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchBookingCancelByExpertRq {
    id: number;
    reason?: string;
}

export interface PatchBookingCancelByExpertRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchBookingCancelByExpert = async (params: PatchBookingCancelByExpertRq, accessToken: string): Promise<PatchBookingCancelByExpertRes> => {
    try {
        const res = await apiServerFetch(`/booking/${params.id}/cancel-by-expert`, 'PATCH', { reason: params.reason }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Từ chối đặt lịch thất bại', "");
    }
};
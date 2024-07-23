import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchBookingRejectRq {
    id: number;
    reason?: string;
}

export interface PatchBookingRejectRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchBookingReject = async (params: PatchBookingRejectRq, accessToken: string): Promise<PatchBookingRejectRes> => {
    try {
        const res = await apiServerFetch(`/booking/${params.id}/reject`, 'PATCH', { reason: params.reason }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Từ chối đặt lịch thất bại', "");
    }
};
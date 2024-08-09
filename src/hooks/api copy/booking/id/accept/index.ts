import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchBookingAcceptRq {
    id: number;
}

export interface PatchBookingAcceptRes {
    status: string;
    responseText: string;
    data: string;
}

export const PatchBookingAccept = async (params: PatchBookingAcceptRq, accessToken: string): Promise<PatchBookingAcceptRes> => {
    try {
        const res = await apiServerFetch(`/booking/${params.id}/accept`, 'PATCH', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Chấp nhận đặt lịch thất bại', "");
    }
};
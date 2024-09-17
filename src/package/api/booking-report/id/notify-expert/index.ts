import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface StaffNotifyExpertRequest {
    id: number;
    note: string;
}
export interface StaffNotifyExpertResponse {
    status: string;
    responseText: string;
}

export const StaffNotifyExpert = async (params: StaffNotifyExpertRequest, accessToken: string): Promise<StaffNotifyExpertResponse> => {
    try {
        const res = await apiServerFetch(`/booking-report/${params.id}/notify-expert`, "PATCH", { note: params.note }, accessToken);
        return res
    } catch (error: any) {
        return errorSystem(error, "")
    }
};
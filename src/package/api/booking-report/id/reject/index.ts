import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface RejectBookingReportRequest {
    id: number;
    note: string;
}
export interface RejectBookingReportResponse {
    status: string;
    responseText: string;
}

export const RejectBookingReport = async (params: RejectBookingReportRequest, accessToken: string): Promise<RejectBookingReportResponse> => {
    try {
        const res = await apiServerFetch(`/booking-report/${params.id}/reject`, "PATCH", { note: params.note }, accessToken);
        return res
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", "")
    }
};
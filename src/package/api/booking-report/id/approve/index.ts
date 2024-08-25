import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface ApproveBookingReportRequest {
    id: number;
    note: string;
}
export interface ApproveBookingReportResponse {
    status: string;
    responseText: string;
}

export const ApproveBookingReport = async (params: ApproveBookingReportRequest, accessToken: string): Promise<ApproveBookingReportResponse> => {
    try {
        const res = await apiServerFetch(`booking-report/${params.id}/approve`, "PATCH", { note: params.note }, accessToken);
        return res
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", "")
    }
};
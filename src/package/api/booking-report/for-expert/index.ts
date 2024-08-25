import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingReportForExpertRequest {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
}

export interface GetBookingReportForExpertResponse {
    status: string;
    responseText: string;
    data: {
        list: BookingReportForExpert[];
        totalPage: number;
    };
}

export interface BookingReportForExpert {
    id: number,
    customerContent: string,
    customerEvidence: string,
    bookingId: number,
    createdAt: string;
    bookingReportSuggest: bookingReportSuggest[];
    updatedAt: string,
    status: number,
}

export interface bookingReportSuggest {
    id: number;
    reportSuggestId: number;
    reportSuggest: string;
}

export const GetBookingReportForExpert = async (params: GetBookingReportForExpertRequest, accessToken: string): Promise<GetBookingReportForExpertResponse> => {
    try {
        const url = new URLSearchParams();
        url.append("pageNumber", params.pageNumber + "");
        url.append("pageSize", params.pageSize + "");
        if (params.sortBy) {
            url.append("sortBy", params.sortBy + "");
        }
        const res = await apiServerFetch("/booking-report/for-expert?" + url, "GET", undefined, accessToken);
        return res;
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", { list: [], totalPage: 0 })
    }
};
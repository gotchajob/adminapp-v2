import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingReportByIdRequest {
    id: number;
}

export interface GetBookingReportByIdResponse {
    status: string;
    responseText: string;
    data: BookingReportById;
}

export interface BookingReportById {
    id: number,
    customerContent: string,
    customerEvidence: string,
    expertContent: string,
    expertEvidence: string,
    staffNote: string,
    processingBy: number,
    status: number,
    bookingId: number,
    createdAt: string,
    updatedAt: string,
    bookingReportSuggest: bookingReportSuggest[];
}

export interface bookingReportSuggest {
    id: number,
    reportSuggestId: number;
    reportSuggest: string;
}

export const GetBookingReportById = async (params: GetBookingReportByIdRequest, accessToken: string): Promise<GetBookingReportByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-report/${params.id}`, 'GET', undefined, accessToken);
        return res;
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", []);
    }
};
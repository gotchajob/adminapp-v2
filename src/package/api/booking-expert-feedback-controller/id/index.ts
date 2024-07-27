import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface GetBookingExpertFeedbackByIdRequest {
    id: number;
}

export interface GetBookingExpertFeedbackByIdResponse {
    status: string;
    responseText: string;
    data: BookingExpertFeedback;
}

export interface BookingExpertFeedback {

}

export const GetBookingExpertFeedbackById = async (params: GetBookingExpertFeedbackByIdRequest): Promise<GetBookingExpertFeedbackByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface DelBookingExpertFeedbackByIdRequest {
    id: number;
}

export interface DelBookingExpertFeedbackByIdResponse {
    status: string;
    responseText: string;
}

export const DelBookingExpertFeedbackById = async (params: DelBookingExpertFeedbackByIdRequest): Promise<DelBookingExpertFeedbackByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback/${params.id}`, 'DELETE', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};

export interface PatchBookingExpertFeedbackByIdRequest {
    id: number;
}

export interface PatchBookingExpertFeedbackByIdResponse {
    status: string;
    responseText: string;
}

export const PatchBookingExpertFeedbackById = async (params: PatchBookingExpertFeedbackByIdRequest): Promise<PatchBookingExpertFeedbackByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback/${params.id}`, 'PATCH', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface GetBookingCustomerFeedbackByIdRequest {
    id: number;
}

export interface GetBookingCustomerFeedbackByIdResponse {
    status: string;
    responseText: string;
    data: BookingCustomerFeedback;
}

export interface BookingCustomerFeedback {

}

export const GetBookingCustomerFeedbackById = async (params: GetBookingCustomerFeedbackByIdRequest): Promise<GetBookingCustomerFeedbackByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface DelBookingCustomerFeedbackByIdRequest {
    id: number;
}

export interface DelBookingCustomerFeedbackByIdResponse {
    status: string;
    responseText: string;
}

export const DelBookingCustomerFeedbackById = async (params: DelBookingCustomerFeedbackByIdRequest): Promise<DelBookingCustomerFeedbackByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback/${params.id}`, 'DELETE', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};

export interface PatchBookingCustomerFeedbackByIdRequest {
    id: number;
}

export interface PatchBookingCustomerFeedbackByIdResponse {
    status: string;
    responseText: string;
}

export const PatchBookingCustomerFeedbackById = async (params: PatchBookingCustomerFeedbackByIdRequest): Promise<PatchBookingCustomerFeedbackByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback/${params.id}`, 'PATCH', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
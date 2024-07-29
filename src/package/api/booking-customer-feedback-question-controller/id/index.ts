import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface GetBookingCustomerFeedbackQuestionByIdRequest {
    id: number;
}

export interface GetBookingCustomerFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
    data: BookingCustomerFeedbackQuestion;
}

export interface BookingCustomerFeedbackQuestion {
    id: number,
    question: string,
    type: string
}

export const GetBookingCustomerFeedbackQuestionById = async (params: GetBookingCustomerFeedbackQuestionByIdRequest): Promise<GetBookingCustomerFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback-question/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface DelBookingCustomerFeedbackQuestionByIdRequest {
    id: number;
}

export interface DelBookingCustomerFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
}

export const DelBookingCustomerFeedbackQuestionById = async (params: DelBookingCustomerFeedbackQuestionByIdRequest): Promise<DelBookingCustomerFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback-question/${params.id}`, 'DELETE', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};

export interface PatchBookingCustomerFeedbackQuestionByIdRequest {
    id: number;
    question: string;
    type: string;
}

export interface PatchBookingCustomerFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
}

export const PatchBookingCustomerFeedbackQuestionById = async (params: PatchBookingCustomerFeedbackQuestionByIdRequest): Promise<PatchBookingCustomerFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback-question/${params.id}`, 'PATCH', { question: params.question, type: params.type }, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
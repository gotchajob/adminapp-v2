import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingExpertFeedbackQuestionByIdRequest {
    id: number;
}

export interface GetBookingExpertFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
    data: BookingExpertFeedbackQuestion;
}

export interface BookingExpertFeedbackQuestion {
    id: number,
    question: string,
    type: string,
    categoryId: number,
    category: string
}

export const GetBookingExpertFeedbackQuestionById = async (params: GetBookingExpertFeedbackQuestionByIdRequest): Promise<GetBookingExpertFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface DelBookingExpertFeedbackQuestionByIdRequest {
    id: number;
}

export interface DelBookingExpertFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
}

export const DelBookingExpertFeedbackQuestionById = async (params: DelBookingExpertFeedbackQuestionByIdRequest): Promise<DelBookingExpertFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question/${params.id}`, 'DELETE', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};

export interface PatchBookingExpertFeedbackQuestionByIdRequest {
    id: number;
    question: string;
    type: string;
}

export interface PatchBookingExpertFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
}

export const PatchBookingExpertFeedbackQuestionById = async (params: PatchBookingExpertFeedbackQuestionByIdRequest): Promise<PatchBookingExpertFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question/${params.id}`, 'PATCH', { question: params.question, type: params.type }, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
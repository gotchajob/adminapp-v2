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

export const DelBookingExpertFeedbackQuestionById = async (params: DelBookingExpertFeedbackQuestionByIdRequest, accessToken: string): Promise<DelBookingExpertFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};

export interface PatchBookingExpertFeedbackQuestionByIdRequest {
    id: number,
    question: string,
    type: string,
    categoryId: number
}

export interface PatchBookingExpertFeedbackQuestionByIdResponse {
    status: string;
    responseText: string;
}

export const PatchBookingExpertFeedbackQuestionById = async (params: PatchBookingExpertFeedbackQuestionByIdRequest, accessToken: string): Promise<PatchBookingExpertFeedbackQuestionByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question/${params.id}`, 'PATCH', { question: params.question, type: params.type, categoryId: params.categoryId }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
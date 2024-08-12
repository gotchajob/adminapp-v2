import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBookingExpertFeedbackQuestionResponse {
    status: string;
    responseText: string;
    data: BookingExpertFeedbackQuestion[];
}

export interface BookingExpertFeedbackQuestion {
    id: number,
    question: string,
    type: string,
    categoryId: number,
    category: string
}

export const GetBookingExpertFeedbackQuestion = async (): Promise<GetBookingExpertFeedbackQuestionResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface PostBookingExpertFeedbackQuestionRequest {
    question: string,
    type: string,
    categoryId: number,
}

export interface PostBookingExpertFeedbackQuestionResponse {
    status: string;
    responseText: string;
}


export const PostBookingExpertFeedbackQuestion = async (params: PostBookingExpertFeedbackQuestionRequest, accessToken: string): Promise<PostBookingExpertFeedbackQuestionResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
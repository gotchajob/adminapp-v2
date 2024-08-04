import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBookingExpertFeedbackRequest {
    bookingId: number;
}

export interface GetBookingExpertFeedbackResponse {
    status: string;
    responseText: string;
    data: BookingExpertFeedback[];
}

export interface BookingExpertFeedback {
    id: number,
    content: string,
    description: string,
    type: number,
    createdAt: string,
    updatedAt: string,
}

export const GetBookingExpertFeedback = async (params: GetBookingExpertFeedbackRequest): Promise<GetBookingExpertFeedbackResponse> => {
    try {
        const url = new URLSearchParams();
        if (params.bookingId) {
            url.append('bookingId', params.bookingId + '');
        }
        const res = await apiServerFetch(`/booking-expert-feedback?${url.toString()}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface PostBookingExpertFeedbackRequest {
    bookingId: number,
    comment: string,
    answerList: BookingFeedbackAnwer[]
}

export interface BookingFeedbackAnwer {
    questionId: number,
    answer: string | number
}

export interface PostBookingExpertFeedbackResponse {
    status: string;
    responseText: string;
}

export const PostBookingExpertFeedback = async (params: PostBookingExpertFeedbackRequest, accessToken: string): Promise<PostBookingExpertFeedbackResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
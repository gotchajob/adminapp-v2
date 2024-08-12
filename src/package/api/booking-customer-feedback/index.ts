import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBookingCustomerFeedbackResponse {
    status: string;
    responseText: string;
    data: BookingCustomerFeedback[];
}

export interface BookingCustomerFeedback {
    id: number,
    question: string,
    type: string,
    categoryId: number,
    category: string
}

export const GetBookingCustomerFeedback = async (): Promise<GetBookingCustomerFeedbackResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface PostBookingCustomerFeedbackRequest {
    bookingId: number,
    rating: number,
    comment: string,
    answers: Answers[]
}

export interface Answers {
    questionId: number,
    answer: string
}

export interface PostBookingCustomerFeedbackResponse {
    status: string;
    responseText: string;
}


export const PostBookingCustomerFeedback = async (params: PostBookingCustomerFeedbackRequest, accessToken: string): Promise<PostBookingCustomerFeedbackResponse> => {
    try {
        const res = await apiServerFetch(`/booking-customer-feedback`, 'POST', params, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
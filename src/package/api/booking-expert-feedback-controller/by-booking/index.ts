import { apiServerFetch, errorSystem } from "hooks/api copy/api-fetch";

export interface GetBookingExpertFeedbackByBookingRequest {
    bookingId: number;
}

export interface GetBookingExpertFeedbackByBookingResponse {
    status: string;
    responseText: string;
    data: BookingExpertFeedbackByBooking;
}

export interface BookingExpertFeedbackByBooking {
    id: number,
    bookingId: number,
    comment: string,
    createdAt: string,
    answer: BookingExpertFeedbackAnswer[],
}

export interface BookingExpertFeedbackAnswer {
    id: number,
    question: string,
    questionType: string,
    questionId: number,
    answer: number,
    categoryId: number,
    category: string
}

export const GetBookingExpertFeedbackByBooking = async (params: GetBookingExpertFeedbackByBookingRequest): Promise<GetBookingExpertFeedbackByBookingResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback/by-booking/${params.bookingId}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
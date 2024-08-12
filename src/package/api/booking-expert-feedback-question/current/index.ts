import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingExpertFeedbackQuestionCurrentResponse {
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

export const GetBookingExpertFeedbackQuestionCurrent = async (accessToken: string): Promise<GetBookingExpertFeedbackQuestionCurrentResponse> => {
    try {
        const res = await apiServerFetch(`/booking-expert-feedback-question/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
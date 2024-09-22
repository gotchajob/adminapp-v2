import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetBookingCustomerFeedbackQuestionResponse {
  status: string;
  responseText: string;
  data: BookingCustomerFeedbackQuestion[];
}
export interface BookingCustomerFeedbackQuestion {
  id: number;
  question: string;
  type: string;
}

export const GetBookingCustomerFeedbackQuestion =
  async (): Promise<GetBookingCustomerFeedbackQuestionResponse> => {
    try {
      const res = await apiServerFetch(
        `/booking-customer-feedback-question`,
        "GET",
        undefined,
        undefined
      );
      return res;
    } catch (error: any) {
      return errorSystem("Lấy danh sách thất bại", []);
    }
  };

export interface PostBookingCustomerFeedbackQuestionRequest {
  question: string;
  type: string;
  categoryId: number;
}

export interface PostBookingCustomerFeedbackQuestionResponse {
  status: string;
  responseText: string;
}

export const PostBookingCustomerFeedbackQuestion = async (
  params: PostBookingCustomerFeedbackQuestionRequest, accessToken: string
): Promise<PostBookingCustomerFeedbackQuestionResponse> => {
  try {
    const res = await apiServerFetch(
      `/booking-customer-feedback-question`,
      "POST",
      params,
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lấy danh sách thất bại", "");
  }
};

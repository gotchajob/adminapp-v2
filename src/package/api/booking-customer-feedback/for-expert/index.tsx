import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingFeedbackRequest {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
}
export interface GetBookingFeedbackResponse {
  status: string;
  responseText: string;
  data: {
    list: BookingFeedback[];
  };
}
export interface BookingFeedback {
  id: number;
  bookingId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export const GetBookingFeedback = async (
  params: GetBookingFeedbackRequest,
  accessToken: string
): Promise<GetBookingFeedbackResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append("pageNumber", params.pageNumber + "");
    searchParams.append("pageSize", params.pageSize + "");
    searchParams.append("sortBy", params.sortBy);
    const res = await apiServerFetch(
      "/booking-customer-feedback/for-expert?" + searchParams.toString(),
      "GET",
      undefined,
      accessToken
    );
    return res;
  } catch (error) {
    return errorSystem("Lỗi không lấy được danh sách feedback", { list: [] });
  }
};

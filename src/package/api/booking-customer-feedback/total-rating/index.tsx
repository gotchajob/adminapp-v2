import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingTotalRatingRequest {}
export interface GetBookingTotalRatingResponse {
  status: string;
  responseText: string;
  data: BookingTotalRating[];
}

export interface BookingTotalRating {
  rating: number;
  count: number;
}

export const GetBookingTotalRating = async (
  params: GetBookingTotalRatingRequest,
  accessToken: string
): Promise<GetBookingTotalRatingResponse> => {
  try {
    const res = await apiServerFetch(
      "/booking-customer-feedback/total-rating",
      "GET",
      undefined,
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lỗi khong lấy được đánh giá", []);
  }
};

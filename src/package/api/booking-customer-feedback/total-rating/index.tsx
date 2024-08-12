import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface BookingTotalRatingRequest {}
export interface BookingTotalRatingResponse {
  status: string;
  responseText: string;
  data: BookingTotalRating[];
}

export interface BookingTotalRating {
  rating: number;
  count: number;
}

export const GetBookingTotalRating = async (
  params: BookingTotalRatingRequest,
  accessToken: string
): Promise<BookingTotalRatingResponse> => {
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

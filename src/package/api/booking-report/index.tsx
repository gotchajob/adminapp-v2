import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetBookingReportRequest {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
}

export interface GetBookingReportResponse {
  status: string;
  responseText: string;
  data: {
    list: BookingReport[];
    totalPage: number;
  };
}

export interface BookingReport {
  id: number,
  customerContent: string,
  expertContent: string,
  staffNote: string,
  status: number;
  bookingId: number;
}

export const GetBookingReport = async (params: GetBookingReportRequest, accessToken: string): Promise<GetBookingReportResponse> => {
  try {
    const url = new URLSearchParams();
    url.append("pageNumber", params.pageNumber + "");
    url.append("pageSize", params.pageSize + "");
    if (params.sortBy) {
      url.append("sortBy", params.sortBy + "");
    }
    const res = await apiServerFetch("/booking-report?" + url, "GET", undefined, accessToken);
    return res;
  } catch (error) {
    return errorSystem("Lỗi không thể gửi yêu cầu", { list: [], totalPage: 0 });
  }
};

export interface PostBookingReportRequest {
  bookingId: number;
  content: string;
  evidence: string;
  reportSuggestIds: number[];
}
export interface PostBookingReportResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PostBookingReport = async (params: PostBookingReportRequest, accessToken: string): Promise<PostBookingReportResponse> => {
  try {
    const res = await apiServerFetch("/booking-report", "POST", params, accessToken)
    return res
  } catch (error) {
    return errorSystem("Lỗi không thể gửi yêu cầu", "")
  }
};

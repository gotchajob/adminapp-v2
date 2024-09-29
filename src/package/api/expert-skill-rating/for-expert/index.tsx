import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetExpertSkillRatingRequest {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  expertSkillOptionId: number;
}
export interface GetExpertSkillRatingResponse {
  status: string;
  responseText: string;
  data: {
    list: ExpertSkillRating[];
    totalPage: number;
  };
}

export interface ExpertSkillRating {
  id: number;
  expertSkillOptionId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export const GetExpertSkillRating = async (
  params: GetExpertSkillRatingRequest,
  accessToken: string
): Promise<GetExpertSkillRatingResponse> => {
  const url = new URLSearchParams();
  url.append("pageNumber", params.pageNumber + "");
  url.append("pageSize", params.pageSize + "");
  url.append("sortBy", params.sortBy);
  url.append("expertSkillOptionId", params.expertSkillOptionId + "");
  try {
    const res = await apiServerFetch(
      "/expert-skill-rating/for-expert?" + url.toString(),
      "GET",
      undefined,
      accessToken
    );
    return res;
  } catch (error) {
    return errorSystem("Lỗi không lấy được thông tin đánh giá", {
      list: [],
      totalPage: 0,
    });
  }
};

import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetExpertTotalSkillRatingRequest {
  expertSkillOptionId: number;
}
export interface GetExpertTotalSkillRatingResponse {
  status: string;
  responseText: string;
  data: ExpertSkillRating[];
}

export interface ExpertSkillRating {
  rating: number;
  count: number;
}

export const GetExpertTotalSkillRating = async (
  params: GetExpertTotalSkillRatingRequest,
  accessToken: string
): Promise<GetExpertTotalSkillRatingResponse> => {
  try {
    const url = new URLSearchParams();
    url.append("expertSkillOptionId", params.expertSkillOptionId + "");
    const res = await apiServerFetch(
      "/expert-skill-rating/total-rating?" + url.toString(),
      "GET",
      undefined,
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lỗi khong lấy được đánh giá", []);
  }
};

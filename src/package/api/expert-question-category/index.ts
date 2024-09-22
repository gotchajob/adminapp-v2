import { C } from "@fullcalendar/core/internal-common";
import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetExpertQuestionCategoryResponse {
  status: string;
  responseText: string;
  data: QuestionCategory[];
}

export interface QuestionCategory {
  id: number;
  category: string;
  description: string;
}

export const GetExpertQuestionCategory =
  async (): Promise<GetExpertQuestionCategoryResponse> => {
    try {
      const res = await apiServerFetch(
        `/expert-question-category`,
        "GET",
        undefined,
        undefined
      );
      return res;
    } catch (error: any) {
      return errorSystem("Lấy danh sách thất bại", []);
    }
  };

export interface PostExpertQuestionCategoryRequest {
  category: string;
  description: string;
}

export interface PostExpertQuestionCategoryResponse {
  status: string;
  responseText: string;
}

export const PostExpertQuestionCategory = async (
  params: PostExpertQuestionCategoryRequest,
  accessToken: string
): Promise<PostExpertQuestionCategoryResponse> => {
    console.log(params)
    console.log(accessToken)
  try {
    const res = await apiServerFetch(
      `/expert-question-category`,
      "POST",
      params,
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lấy danh sách thất bại", "");
  }
};

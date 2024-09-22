import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetExpertQuestionCategoryByIdRequest {
  id: string;
}

export interface GetExpertQuestionCategoryByIdResponse {
  status: string;
  responseText: string;
  data: QuestionCategoryById;
}

export interface QuestionCategoryById {
  id: number;
  category: string;
  description: string;
}

export const GetExpertQuestionCategoryById = async (
  params: GetExpertQuestionCategoryByIdRequest
): Promise<GetExpertQuestionCategoryByIdResponse> => {
  try {
    const res = await apiServerFetch(
      `/expert-question-category/${params.id}`,
      "GET",
      undefined,
      undefined
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lấy danh sách thất bại", {});
  }
};

export interface DelExpertQuestionCategoryByIdRequest {
  id: string;
}

export interface DelExpertQuestionCategoryByIdResponse {
  status: string;
  responseText: string;
}

export const DelExpertQuestionCategoryById = async (
  params: DelExpertQuestionCategoryByIdRequest,
  accessToken: string
): Promise<DelExpertQuestionCategoryByIdResponse> => {
  try {
    const res = await apiServerFetch(
      `/expert-question-category/${params.id}`,
      "DELETE",
      undefined,
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lấy danh sách thất bại", "");
  }
};

export interface PatchExpertQuestionCategoryByIdRequest {
  id: string;
  category: string;
  description: string;
}

export interface PatchExpertQuestionCategoryByIdResponse {
  status: string;
  responseText: string;
}

export const PatchExpertQuestionCategoryById = async (
  params: PatchExpertQuestionCategoryByIdRequest,
  accessToken: string
): Promise<PatchExpertQuestionCategoryByIdResponse> => {
  try {
    const res = await apiServerFetch(
      `/expert-question-category/${params.id}`,
      "PATCH",
      {
        category: params.category,
        description: params.description,
      },
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lấy danh sách thất bại", "");
  }
};

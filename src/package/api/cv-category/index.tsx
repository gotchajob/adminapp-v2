import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetCVCategoryRequest {}
export interface GetCVCategoryResponse {
  status: string;
  responseText: string;
  data: CVCategory[];
}
export interface CVCategory {
  id: number;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export const GetCVCategory = async (
  params: GetCVCategoryRequest
): Promise<GetCVCategoryResponse> => {
  try {
    const res = await apiServerFetch("/cv-category", "GET");
    return res;
  } catch (error) {
    return errorSystem("Lỗi", []);
  }
};

export interface PostCVCategoryRequest {
  name: string;
  description: string;
  image: string;
  icon: string;
}
export interface PostCVCategoryResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PostCVCategory = async (
  params: PostCVCategoryRequest,
  accessToken: string
): Promise<PostCVCategoryResponse> => {
  try {
    const res = await apiServerFetch(
      "/cv-category",
      "POST",
      params,
      accessToken
    );
    return res;
  } catch (error) {
    return errorSystem("Lỗi không thể tạo mới danh mục", "");
  }
};

import { apiServerFetch, errorSystem } from "../api-fetch";

export interface ExpertFormRequireRequest {
  categoryIds?: number | null;
}

export interface ExpertFormRequireResponse {
  status: string;
  responseText: string;
  data: ExpertFormRequire[];
}

export interface ExpertFormRequire {
  id: number;
  categoryId: number;
  name: string;
  description: string;
}

export const GetExpertFormRequire = async (
  params: ExpertFormRequireRequest
): Promise<ExpertFormRequireResponse> => {
  try {
    const searchParams = new URLSearchParams();
    if (params.categoryIds) {
      searchParams.append("categoryId", params.categoryIds + "");
    }
    const res = await apiServerFetch(
      `/expert-form-require?${searchParams.toString()}`,
      "GET"
    );
    return res;
  } catch (error) {
    return errorSystem("Lỗi không thể lấy thông tin đăng kí", []);
  }
};

export interface PostExpertFormRequireRequest {
  categoryId: number;
  name: string;
  description: string;
}

export interface PostExpertFormRequireResponse {
  status: string;
  responseText: string;
}

export const PostExpertFormRequire = async (
  params: PostExpertFormRequireRequest
): Promise<PostExpertFormRequireResponse> => {
  try {
    const res = await apiServerFetch(
      `/expert-form-require`,
      "POST", params, undefined
    );
    return res;
  } catch (error) {
    return errorSystem("Lỗi không thể lấy thông tin đăng kí", '');
  }
};
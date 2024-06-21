import { apiServerFetch, errorSystem } from "../api-fetch";

export interface ExpertFormRequireRequest {
  categoryId?: number;
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
    if (params.categoryId) {
      searchParams.append("categoryId", params.categoryId + "");
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

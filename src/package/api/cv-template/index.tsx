import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetCVTemplateRequest {
  categoryId?: number;
}

export interface GetCVTemplateResponse {
  status: string;
  responseText: string;
  data: CVTemplateApi[];
}

export interface CVTemplateApi {
  id: number;
  cvCategoryId: number;
  name: string;
  image: string;
}

export const GetCVTemplate = async (
  params: GetCVTemplateRequest
): Promise<GetCVTemplateResponse> => {
  try {
    const url = new URLSearchParams();
    if (params.categoryId) {
      url.append("categoryId", params.categoryId + "");
    }
    const res = await apiServerFetch("/cv-template?" + url.toString(), "GET");
    return res;
  } catch (error: any) {
    return errorSystem("Lỗi không lấy được danh sách", []);
  }
};

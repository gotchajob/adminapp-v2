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
export interface PostCVTemplateRequest {
  cvCategoryId: number;
  templateJson: string;
  name: string;
  image: string;
}

export interface PostCVTemplateResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PostCVTemplate = async (params: PostCVTemplateRequest, accessToken: string) => {
  try {
    const res = await apiServerFetch(`/cv-template`, "POST", params, accessToken);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Lấy thông tin thất bại", []);
  }
};


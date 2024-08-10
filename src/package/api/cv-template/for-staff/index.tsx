import { apiServerFetch, errorSystem } from "../../api-fetch";

export interface GetCVTemplateStaffRequest {
  categoryId?: number;
}

export interface GetCVTemplateStaffResponse {
  status: string;
  responseText: string;
  data: CVTemplateStaff[];
}

export interface CVTemplateStaff {
  id: number;
  cvCategoryId: number;
  name: string;
  status: number;
  numberUse: number;
  image: string;
  createdAt: string;
}

export const GetCVTemplateForStaff = async (
  params: GetCVTemplateStaffRequest,
  accessToken: string
): Promise<GetCVTemplateStaffResponse> => {
  try {
    const url = new URLSearchParams();
    if (params.categoryId) {
      url.append("categoryId", params.categoryId + "");
    }
    const res = await apiServerFetch(
      "/cv-template/for-staff?" + url.toString(),
      "GET",
      undefined,
      accessToken
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lỗi không lấy được danh sách", []);
  }
};

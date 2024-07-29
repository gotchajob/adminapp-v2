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
    return errorSystem("Lỗi", [])
  }
};

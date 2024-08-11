import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetBlogCategoryRequest {}

export interface GetBlogCategoryResponse {
  status: string;
  responseText: string;
  data: BlogCategory[];
}

export interface BlogCategory {
  id: number;
  category: string;
  description: string;
}

export const GetBlogCategory = async (
  params: GetBlogCategoryRequest
): Promise<GetBlogCategoryResponse> => {
  try {
    const res = await apiServerFetch("/blog-category", "GET");
    return res;
  } catch (error) {
    return errorSystem("Lỗi không thể lấy thông tin danh mục", []);
  }
};

export interface PostBlogCategoryRequest {
  category: string;
  description: string;
}
export interface PostBlogCategoryResponse {
  status: string;
  responseText: string;
  data: string;
}
export const PostBlogCategory = async (
  params: PostBlogCategoryRequest
): Promise<PostBlogCategoryResponse> => {
  try {
    const res = await apiServerFetch("/blog-category", "POST", params);
    return res;
  } catch (error) {
    return errorSystem("Lỗi không thể tạo mới danh mục", "");
  }
};

import { apiServerFetch, errorSystem } from '../api-fetch';

export interface BlogGetRequest {
  pageNumber: number;
  pageSize: number;
  categoryId?: number;
}

export interface BlogGetResponse {
  status: string;
  responseText: string;
  data: { list: BlogList[]; totalPage: number };
}

export interface BlogList {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  createdAt: string;
  profile: Profile;
}

export interface PostBlogRequest {
  thumbnail: string;
  title: string;
  shortDescription: string;
  content: string;
  categoryId: number;
}

export interface PostBlogResponse {
  status: string;
  responseText: string;
  data: string;
}

export interface Profile {
  id: number;
  avatar: string;
  fullName: string;
}

export const GetBlog = async (params: BlogGetRequest, accessToken: string): Promise<BlogGetResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('pageNumber', params.pageNumber + '');
    searchParams.set('pageSize', params.pageSize + '');
    if (params.categoryId) {
      searchParams.set('categoryId', params.categoryId + '');
    }
    const res = await apiServerFetch('/blog?' + searchParams.toString(), 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
  }
};

export const PostBlog = async (params: PostBlogRequest, accessToken: string): Promise<PostBlogResponse> => {
  try {
    const res = await apiServerFetch('/blog', 'POST', params, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Đăng bài thất bại', '');
  }
};

import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BlogByCategoryReq {
  categoryId: number;
  limit: number;
}

export interface BlogList {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  createdAt: string;
  profile: Profile;
}

export interface Profile {
  id: number;
  avatar: string;
  fullName: string;
}

export interface BlogByCategoryRes {
  status: string;
  responseText: string;
  data: BlogList[];
}

export const GetBlogByCategory = async (params: BlogByCategoryReq, accessToken: string): Promise<BlogByCategoryRes> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('categoryId', params.categoryId + '');
    searchParams.set('limit', params.limit + '');
    const res = await apiServerFetch('/blog/category?' + searchParams.toString(), 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', { list: [], totalPage: 0 });
  }
};

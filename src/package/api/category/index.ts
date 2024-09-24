import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetCategoryRes {
  status: string;
  responseText: string;
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
}

export const getCategory = async (): Promise<GetCategoryRes> => {
  try {
    const res = await apiServerFetch('/category', 'GET', undefined, undefined);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', []);
  }
};

export interface PostCategoryRes {
  status: string;
  responseText: string;
}

export interface PostCategoryRq {
  name: string;
}

export const PostCategory = async (params: PostCategoryRq, accessToken: string): Promise<PostCategoryRes> => {
  try {
    const res = await apiServerFetch('/category', 'POST', { name: params.name }, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', '');
  }
};








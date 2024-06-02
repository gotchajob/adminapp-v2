import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetCategoryRes {
  status: string;
  responseText: string;
  data: Category[];
}

export interface Category {
  id: number;
  name: string;
  status: number;
}

export const getCategory = async (): Promise<GetCategoryRes> => {
  try {
    const res = await apiServerFetch('/category', 'GET');
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', []);
  }
};
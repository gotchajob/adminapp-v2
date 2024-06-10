
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface getExpertListRequest {
  page: number;
  limit: number;
  sortBy?: string;
  search?: string;
}

export interface getExpertListResponse {
  status: string;
  responseText: string;
  data: {
    list: Expert[];
    totalPage: number;
  };
}

export interface Expert {
  userId: number;
  expertId: number;
  userStatus: number;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  birthDate: string;
  bio: string;
  portfolioUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  education: string;
}

export const getExpertList = async (params: getExpertListRequest, accessToken: string): Promise<getExpertListResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');
    if (params.search) {
      searchParams.set('search', params.search + '');
    }
    if (params.sortBy) {
      searchParams.set('sortBy', params.sortBy + '');
    }
    const res = await apiServerFetch('/expert?' + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error();
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], totalPage: 0 });
  }
};


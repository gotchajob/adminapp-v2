
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetExpertListRequest {
  page: number;
  limit: number;
  sortBy?: string;
  search?: string[];
}

export interface GetExpertListResponse {
  status: string;
  responseText: string;
  data: {
    list: ExpertListType[];
    totalPage: number;
  };
}

export interface ExpertListType {
  yearExperience: number;
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

export const getExpertList = async (params: GetExpertListRequest, accessToken: string): Promise<GetExpertListResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');
    if (params.search) {
      params.search.forEach((value) => {
        searchParams.set('search', value + '');
      })
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



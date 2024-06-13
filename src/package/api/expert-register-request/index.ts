import { apiServerFetch, errorSystem } from '../api-fetch';

export interface ExpertRegisterRequestRq {
  page: number;
  limit: number;
  search?: string[];
}

export interface ExpertRegisterRequestResponse {
  status: string;
  responseText: string;
  data: {
    list: ExpertRegister[];
    total: number;
  };
}

export interface ExpertRegister {
  id: number;
  status: number;
  expertId: number;
  email: string;
  createdAt: string;
  updatedAt: string
}

export interface PostExpertRegisterRequest {
  email: string;
}

export interface PostExpertRegisterResponse {
  status: string;
  responseText: string;
  data: string;
}

export const GetExpertRegisterRequest = async (
  params: ExpertRegisterRequestRq,
  accessToken: string
): Promise<ExpertRegisterRequestResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('pageNumber', params.page + '');
    searchParams.append('pageSize', params.limit + '');
    if (params.search) {
      params.search.forEach((value) => {
        searchParams.append('search', value);
      });
    }
    const res = await apiServerFetch('/expert-register-request?' + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], total: 0 });
  }
};

export const PostExpertRegister = async (params: PostExpertRegisterRequest, accessToken: string): Promise<PostExpertRegisterResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('email', params.email + '');

    const res = await apiServerFetch('/expert-register-request?' + searchParams.toString(), 'POST', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

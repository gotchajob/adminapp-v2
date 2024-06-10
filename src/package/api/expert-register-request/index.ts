import { apiServerFetch, errorSystem } from '../api-fetch';

export interface ExpertRegisterRequestRq {
  pageNumber: number;
  limit: number;
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
  email: string;
  createdAt: string;
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
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');
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

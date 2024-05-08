import { apiServerFetch, errorSystem } from '../api-fetch';

export interface MentorRegisterRequest {
  page: number;
  limit: number;
}

export interface GetMentorRegisterRequest {
  status: string;
  responseText: string;
  data: {
    list: MentorRegister[];
    total: number;
  };
}

export interface MentorRegister {
  id: number;
  email: string;
  createAt: string;
}

export const GetMentor = async (params: MentorRegisterRequest, accessToken: string): Promise<GetMentorRegisterRequest> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');

    const res = await apiServerFetch('/mentor-register-request?' + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], total: 0 });
  }
};

import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  status: string;
  responseText: string;
  data: {
    token: string;
    roleId: number;
  };
}

export const UserLogin = async (params: UserLoginRequest): Promise<UserLoginResponse> => {
  try {
    const res = await apiServerFetch('/user/login', 'POST', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', { token: '', roleId: 0 });
  }
};

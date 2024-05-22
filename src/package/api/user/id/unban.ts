import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface UnBanUserRequest {
  id: number;
}

export interface UnBanUserListRespone {
  status: string;
  responseText: string;
  data: string;
}

export const PostUnBanUser = async (params: UnBanUserRequest, accessToken: string): Promise<UnBanUserListRespone> => {
  try {
    const res = await apiServerFetch(`/user/${params.id}/unban`, 'POST', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', '');
  }
};

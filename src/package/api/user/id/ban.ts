import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BanUserRequest {
  id: number;
}

export interface BanUserListRespone {
  status: string;
  responseText: string;
  data: string;
}

export const PostBanUser = async (params: BanUserRequest, accessToken: string): Promise<BanUserListRespone> => {
  try {
    const res = await apiServerFetch(`/user/${params.id}/ban`, 'POST', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', '');
  }
};

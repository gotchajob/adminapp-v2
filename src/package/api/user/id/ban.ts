import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BanUserRequest {
  id: number;
}

export interface BanUserListResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PatchBanUser = async (params: BanUserRequest, accessToken: string): Promise<BanUserListResponse> => {
  try {
    const res = await apiServerFetch(`/user/${params.id}/ban`, 'PATCH', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', '');
  }
};

import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface UnBanUserRequest {
  id: number;
}

export interface UnBanUserListResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PatchUnBanUser = async (params: UnBanUserRequest, accessToken: string): Promise<UnBanUserListResponse> => {
  try {
    const res = await apiServerFetch(`/user/${params.id}/unban`, 'PATCH', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', '');
  }
};

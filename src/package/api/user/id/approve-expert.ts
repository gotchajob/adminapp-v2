import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface rejectExpertRq {
  id: number;
}

export interface rejectExpertResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PatchApproveExpert = async (params: rejectExpertRq, accessToken: string): Promise<rejectExpertResponse> => {
  try {
    const res = await apiServerFetch(`/user/${params.id}/approve-expert`, 'PATCH', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Kích hoạt thất bại', '');
  }
};

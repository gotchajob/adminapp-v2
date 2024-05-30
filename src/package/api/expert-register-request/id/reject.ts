import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface MentorRegisterRejectRequest {
  id: number;
  note: string;
}

export interface MentorRegisterRejectResponse {
  status: string;
  responseText: string;
  data: string;
}

export const ExpertRegisterReject = async (
  params: MentorRegisterRejectRequest,
  accessToken: string
): Promise<MentorRegisterRejectResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/reject`, 'POST', { note: params.note }, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

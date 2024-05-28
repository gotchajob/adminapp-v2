import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface MentorRegisterRejectRequest {
  id: number;
}

export interface MentorRegisterRejectResponse {
  status: string;
  responseText: string;
  data: string;
}

export const MentorRegisterReject = async (
  params: MentorRegisterRejectRequest,
  accessToken: string
): Promise<MentorRegisterRejectResponse> => {
  try {
    const res = await apiServerFetch(`/mentor-register-request/${params.id}/reject`, 'POST', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

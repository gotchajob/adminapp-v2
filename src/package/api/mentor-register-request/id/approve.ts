import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface MentorRegisterApproveRequest {
  id: number;
}

export interface MentorRegisterApproveResponse {
  status: string;
  responseText: string;
  data: string;
}

export const MentorRegisterApprove = async (
  params: MentorRegisterApproveRequest,
  accessToken: string
): Promise<MentorRegisterApproveResponse> => {
  try {
    const res = await apiServerFetch(`/mentor-register-request/${params.id}/approve`, 'POST', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

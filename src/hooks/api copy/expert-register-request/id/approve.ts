import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertRegisterApproveRequest {
  id: number;
  url: string;
}

export interface ExpertRegisterApproveResponse {
  status: string;
  responseText: string;
  data: string;
}
//Gửi mail
export const ExpertRegisterApprove = async (
  params: ExpertRegisterApproveRequest,
  accessToken: string
): Promise<ExpertRegisterApproveResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/approve`, 'PATCH', { url: params.url }, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

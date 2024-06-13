import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertRegisterRejectRequest {
  id: number;
  url: string;
  reasonReject: string;
}

export interface ExpertRegisterRejectResponse {
  status: string;
  responseText: string;
  data: string;
}

export const ExpertRegisterRejectForm = async (
  params: ExpertRegisterRejectRequest
): Promise<ExpertRegisterRejectResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/reject-form`, 'PATCH', {
      reasonReject: params.reasonReject,
      url: params.url
    });
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

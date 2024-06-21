import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertRegisterRejectRequest {
  id: number;
  url: string;
  reasonReject: string;
  criteriaList: Criteria[]
}

export interface ExpertRegisterRejectResponse {
  status: string;
  responseText: string;
  data: string;
}
export interface Criteria {
  criteria: string;
  description: string;
  status: number
}

export const ExpertRegisterRejectForm = async (
  params: ExpertRegisterRejectRequest
): Promise<ExpertRegisterRejectResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/reject-form`, 'PATCH', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

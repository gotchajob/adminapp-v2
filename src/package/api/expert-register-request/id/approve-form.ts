import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertRegisterApproveFormRequest {
  id: number;
}

export interface ExpertRegisterApproveFormResponse {
  status: string;
  responseText: string;
  data: string;
}
//Xác nhận mail
export const ExpertRegisterApproveForm = async (
  params: ExpertRegisterApproveFormRequest,
  accessToken: string
): Promise<ExpertRegisterApproveFormResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/approve-form`, 'PATCH', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

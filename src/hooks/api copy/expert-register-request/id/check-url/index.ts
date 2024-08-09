import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface ExpertRegisterCheckUrlRequest {
  id: string;
}
export interface ExpertRegisterCheckUrlResponse {
  status: string;
  responseText: string;
  data: string;
}

export const ExpertRegisterCheckUrl = async (params: ExpertRegisterCheckUrlRequest): Promise<ExpertRegisterCheckUrlResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/check-url`, 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', { list: [], total: 0 });
  }
};

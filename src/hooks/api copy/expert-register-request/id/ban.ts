import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface ExpertRegisterBanRequest {
  id: number;
}
export interface ExpertRegisterBanResponse {
  status: string;
  responseText: string;
  data: string;
}
//chặn
export const PatchExpertRegisterBan = async (
  params: ExpertRegisterBanRequest,
): Promise<ExpertRegisterBanResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}/ban`, 'PATCH');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thể lấy thông tin', '');
  }
};

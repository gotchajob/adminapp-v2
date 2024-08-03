import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface CheckMailRequest {
  email: string;
}
export interface CheckMailResponse {
  status: string;
  responseText: string;
  data: string;
}

export const CheckMail = async (params: CheckMailRequest): Promise<CheckMailResponse> => {
  try {
    const res = await apiServerFetch('/user/check-email/' + params.email, 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', '');
  }
};

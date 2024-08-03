import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetExpertRegisterRequestId {
  id: number;
}
export interface GetExpertRegisterResponse {
  status: string;
  responseText: string;
  data: {
    id: number;
    status: number;
    email: string;
    url: string;
    note: string;
    expertId: number;
    createdAt: string;
    updatedAt: string;
  };
}
export const GetExpertRegisterRequestById = async (params: GetExpertRegisterRequestId): Promise<GetExpertRegisterResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.id}`, 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error) {
    return errorSystem('Không thể lấy thông tin', {
      id: 0,
      status: 0,
      email: '',
      url: '',
      note: '',
      expertId: '',
      createdAt: '',
      updatedAt: ''
    });
  }
};

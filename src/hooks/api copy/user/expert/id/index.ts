import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetUserExpertRequest {
  userId: number;
}

export interface GetUserExpertResponse {
  status: string;
  responseText: string;
  data: Expert;
}

export interface Expert {
  userId: number;
  expertId: number;
  userStatus: number;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: number;
  yearExperience: number;
  birthDate: string;
  bio: number;
  portfolioUrl: string;
  facebookUrl: number;
  twitterUrl: number;
  linkedinUrl: number;
  education: string;
}

export async function GetUserExpert(params: GetUserExpertRequest, accessToken: string): Promise<GetUserExpertResponse> {
  try {
    const res = await apiServerFetch(`/user/expert/${params.userId}`, 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', {});
  }
}

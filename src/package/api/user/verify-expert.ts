import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from '../../../../../../webapp_branch/webapp-v2/src/package/api/api-fetch';

export interface UserVerifyExpertRequest {
  page: string;
  limit: string;
}
export interface UserVerifyExpertResponse {
  status: string;
  responseText: string;
  data: {
    list: UserVerifyExpert[];
    totalPage: number;
  };
}

export interface UserVerifyExpert {
  userId: number;
  expertId: number;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthDate: string;
  bio: string;
  portfolioUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  education: string;
}

export const GetUserVerifyExpert = async (params: UserVerifyExpertRequest, accessToken: string): Promise<UserVerifyExpertResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('page', params.page + '');
    searchParams.set('limit', params.limit + '');
    const userRegister = await apiServerFetch('/user/verify-expert?' + searchParams.toString(), 'GET', accessToken);
    return userRegister;
  } catch (error: any) {
    return errorSystem('Xác thực thất bại', { list: [], totalPage: 0 });
  }
};

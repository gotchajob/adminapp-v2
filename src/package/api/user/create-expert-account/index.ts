import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface CreateExpertRequest {
  expertRegisterRequestId: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar: string;
  address: string;
  birthDate: string;
  bio: string;
  portfolioUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedInUrl: string;
  education: string;
  yearExperience: number;
  nationSupport: string[];
  expertSKillOptionList: ExpertSkillOption[];
}

export interface ExpertSkillOption {
  skillOptionId: number;
  certificate: string;
}

export interface CreateExpertResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PostCreateExpertAccount = async (params: CreateExpertRequest): Promise<CreateExpertResponse> => {
  try {
    const res = await apiServerFetch('/user/create-expert-account', 'POST', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error) {
    return errorSystem('Không thể gửi form đăng kí', '');
  }
};

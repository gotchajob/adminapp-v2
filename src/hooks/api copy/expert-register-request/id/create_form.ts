import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface CreateExpertFormRequest {
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

export interface CreateExpertFormResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PostCreateExpertForm = async (params: CreateExpertFormRequest): Promise<CreateExpertFormResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.expertRegisterRequestId}/create_form`, 'POST', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error) {
    return errorSystem('Không thể gửi form đăng kí', '');
  }
};

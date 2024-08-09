import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface UpdateExpertFormRequest {
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
  certification: string;
  expertSKillOptionList: ExpertSkillOption[];
}

export interface ExpertSkillOption {
  skillOptionId: number;
  certificate: string;
}

export interface UpdateExpertFormResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PatchUpdateExpertForm = async (params: UpdateExpertFormRequest): Promise<UpdateExpertFormResponse> => {
  try {
    const res = await apiServerFetch(`/expert-register-request/${params.expertRegisterRequestId}/update-form`, 'PATCH', params);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error) {
    return errorSystem('Không thể gửi form đăng kí', '');
  }
};

import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertSkillOptionRq {
  expertId: number;
}

export interface ExpertSkillOptionResponse {
  status: string;
  responseText: string;
  data: ExpertSkillOption[];
}

export interface ExpertSkillOption {
  id: number;
  skillOptionId: number;
  skillOptionName: string;
  defaultPoint?: number;
  certificate: string;
  sumPoint: number;
  totalRating: number;
}

export const GetExpertSkillOption = async (params: ExpertSkillOptionRq, accessToken: string): Promise<ExpertSkillOptionResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('expertId', params.expertId + '');
    const res = await apiServerFetch(`/expert-skill-option?` + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Kích hoạt thất bại', []);
  }
};

export interface PutExpertSkillOptionRq {
  expertSkillOptionId: number;
  newDefaultPoint: number;
}

export interface PutExpertSkillOptionResponse {
  status: string;
  responseText: string;
  data: string;
}

export const PutExpertSkillOpton = async (params: PutExpertSkillOptionRq, accessToken: string): Promise<PutExpertSkillOptionResponse> => {
  try {
    const res = await apiServerFetch(`/expert-skill-option/`, 'PUT', params, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Kích hoạt thất bại', '');
  }
};

import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetSkillOptionRequest {
  skillId?: string;
}

export interface GetSkillOptionResponse {
  status: string;
  responseText: string;
  data: SkillOption[];
}

export interface SkillOption {
  id: number;
  name: string;
  skillId: number;
}

export const GetSkillOption = async (params: GetSkillOptionRequest): Promise<GetSkillOptionResponse> => {
  try {
    const res = await apiServerFetch(`/skill-option`, 'GET');
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', []);
  }
};

import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetSkillRequest {
  categoryId?: string;
}

export interface GetSkillResponse {
  status: string;
  responseText: string;
  data: Skill[];
}

export interface Skill {
  id: number;
  name: string;
  categoryId: number;
}

export const GetSkill = async (params: GetSkillRequest): Promise<GetSkillResponse> => {
  try {
    const res = await apiServerFetch(`/skill`, 'GET');
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', []);
  }
};

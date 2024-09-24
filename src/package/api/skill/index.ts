import { apiServerFetch, errorSystem } from '../api-fetch';

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

export const GetSkill = async (): Promise<GetSkillResponse> => {
  try {
    const res = await apiServerFetch(`/skill`, 'GET');
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', []);
  }
};

export interface PostSkillRequest {
  categoryId: number;
  name: string;
}

export interface PostSkillResponse {
  status: string;
  responseText: string;
}

export const PostSkill = async (params: PostSkillRequest, accessToken: string): Promise<PostSkillResponse> => {
  try {
    const res = await apiServerFetch(`/skill`, 'POST', { categoryId: params.categoryId, name: params.name }, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', "");
  }
};

export interface PatchSkillRequest {
  id: number;
  skillName: string;
}

export interface PatchSkillResponse {
  status: string;
  responseText: string;
}

export const PatchSkill = async (params: PatchSkillRequest): Promise<PatchSkillResponse> => {
  try {
    const res = await apiServerFetch(`/skill/${params.id}`, 'PATCH', { skillName: params.skillName }, undefined);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', "");
  }
};


import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetSkillOptionRequest {
  categoryId?: string;
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

export interface PostSkillOptionRequest {
  skillId: number;
  name: string;
}

export interface PostSkillOptionResponse {
  status: string;
  responseText: string;
}

export const PostSkillOption = async (params: PostSkillOptionRequest): Promise<PostSkillOptionResponse> => {
  try {
    const res = await apiServerFetch(`/skill-option`, 'POST', { skillId: params.skillId, name: params.name }, undefined);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', "");
  }
};

export interface PatchSkillOptionRequest {
  id: number;
  name: string;
}

export interface PatchSkillOptionResponse {
  status: string;
  responseText: string;
}

export const PatchSkillOption = async (params: PatchSkillOptionRequest): Promise<PatchSkillOptionResponse> => {
  try {
    const res = await apiServerFetch(`/skill-option/${params.id}`, 'PATCH', { name: params.name }, undefined);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy danh sách thất bại', "");
  }
};

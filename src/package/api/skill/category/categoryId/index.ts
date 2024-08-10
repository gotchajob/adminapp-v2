import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface GetSkillByCategoryIdRequest {
    categoryId?: string;
}

export interface GetSkillByCategoryIdResponse {
    status: string;
    responseText: string;
    data: Skill[];
}

export interface Skill {
    id: number;
    name: string;
    categoryId: number;
}

export const GetSkillByCategoryId = async (params: GetSkillByCategoryIdRequest): Promise<GetSkillByCategoryIdResponse> => {
    try {
        const res = await apiServerFetch(`/skill/category/${params.categoryId}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
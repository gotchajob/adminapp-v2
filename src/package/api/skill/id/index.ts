import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface DelSkillRequest {
    id: number;
}

export interface DelSkillResponse {
    status: string;
    responseText: string;
}

export const DelSkill = async (params: DelSkillRequest): Promise<DelSkillResponse> => {
    try {
        const res = await apiServerFetch(`/skill/${params.id}`, 'DELETE', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
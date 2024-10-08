import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface DeleteSkillOptionRequest {
    id: number;
}

export interface DeleteSkillOptionResponse {
    status: string;
    responseText: string;
}

export const DeleteSkillOption = async (params: DeleteSkillOptionRequest, accessToken: string): Promise<DeleteSkillOptionResponse> => {
    try {
        const res = await apiServerFetch(`/skill-option/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
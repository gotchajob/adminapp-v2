import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface PatchExpertSkillOptionShowRq {
    id: number;
}

export interface PatchExpertSkillOptionShowResponse {
    status: string;
    responseText: string;
}

export const PatchExpertSkillOptonShow = async (params: PatchExpertSkillOptionShowRq, accessToken: string): Promise<PatchExpertSkillOptionShowResponse> => {
    try {
        const res = await apiServerFetch(`/expert-skill-option/${params.id}/show`, 'PATCH', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Kích hoạt thất bại', '');
    }
};

export interface PatchExpertSkillOptionHiddenRq {
    id: number;
}

export interface PatchExpertSkillOptionHiddenResponse {
    status: string;
    responseText: string;
}

export const PatchExpertSkillOptonHidden = async (params: PatchExpertSkillOptionHiddenRq, accessToken: string): Promise<PatchExpertSkillOptionHiddenResponse> => {
    try {
        const res = await apiServerFetch(`/expert-skill-option/${params.id}/hidden`, 'PATCH', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Kích hoạt thất bại', '');
    }
};
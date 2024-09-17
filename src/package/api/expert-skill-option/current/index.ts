import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface ExpertSkillOptionCurrentResponse {
    status: string;
    responseText: string;
    data: ExpertSkillOptionCurrent[];
}

export interface ExpertSkillOptionCurrent {
    id: number;
    skillOptionId: number;
    skillOptionName: string;
    defaultPoint?: number;
    certificate: string;
    sumPoint: number;
    totalRating: number;
    status: number;
}

export const GetExpertSkillOptionCurrent = async (accessToken: string): Promise<ExpertSkillOptionCurrentResponse> => {
    try {
        const res = await apiServerFetch(`/expert-skill-option/current`, 'GET', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Kích hoạt thất bại', []);
    }
};
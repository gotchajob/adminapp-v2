import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetExpertNationResponnse {
    status: string;
    responseText: string;
    data: ExpertNation[];
}

export interface ExpertNation {
    id: number;
    nation: string;
}

export const GetExpertNationSupportCurrent = async (accessToken: string): Promise<GetExpertNationResponnse> => {
    try {
        const res = await apiServerFetch(`/expert-nation-support/current`, 'GET', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Không thẻ lấy thông tin', [{}]);
    }
};
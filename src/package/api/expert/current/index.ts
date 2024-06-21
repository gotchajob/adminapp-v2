import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetExpertResponse {
    status: string;
    responseText: string;
    data: Expert;
}

export interface Expert {
    userId: number;
    expertId: number;
    userStatus: number;
    email: string;
    avatar: string;
    firstName: string;
    lastName: string;
    address: string;
    yearExperience: number;
    phone: string;
    birthDate: string;
    bio: string;
    portfolioUrl: string;
    facebookUrl: string;
    twitterUrl: string;
    linkedinUrl: string;
    education: string;
}

export const GetExpertCurrent = async (accessToken: string): Promise<GetExpertResponse> => {
    try {
        const res = await apiServerFetch(`/expert/current`, 'GET', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Không thẻ lấy thông tin', {});
    }
};
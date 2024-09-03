import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchExpertUpdateProfileRequest {
    emailContact: string,
    birthDate: string,
    bio: string,
    portfolioUrl: string,
    facebookUrl: string,
    twitterUrl: string,
    linkedInUrl: string,
    education: string,
    yearExperience: number,
    backgroundImage: string
    firstName: string,
    lastName: string,
    phone: string,
    address: string,
    avatar: string,
}

export interface PatchExpertUpdateProfileResponse {
    status: string;
    responseText: string;
}

export const PatchExpertUpdateProfile = async (params: PatchExpertUpdateProfileRequest, accessToken: string): Promise<PatchExpertUpdateProfileResponse> => {
    try {
        const res = await apiServerFetch(`/expert/update-profile`, 'PATCH', params, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Không thẻ lấy thông tin', '');
    }
};
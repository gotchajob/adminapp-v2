import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchExpertUpdateProfileRequest {
    shortDescription: string,
}

export interface PatchExpertUpdateProfileResponse {
    status: string;
    responseText: string;
}

export const PatchExpertUpdateDescription = async (params: PatchExpertUpdateProfileRequest, accessToken: string): Promise<PatchExpertUpdateProfileResponse> => {
    try {
        const res = await apiServerFetch(`/expert/update-description`, 'PATCH', { shortDescription: params.shortDescription }, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Không thẻ lấy thông tin', '');
    }
};
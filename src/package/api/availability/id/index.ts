import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface DelAvailabilityRequest {
    id: number;
}

export interface DelAvailabilityResponse {
    status: string;
    responseText: string;
    data: string;
}

export const DelAvailability = async (params: DelAvailabilityRequest, accessToken: string): Promise<DelAvailabilityResponse> => {
    try {
        const res = await apiServerFetch(`/availability/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetAvailabilityRequest {
    expertId: number;
}

export interface GetAvailabilityResponse {
    status: string;
    responseText: string;
    data: Availability[];
}

export interface Availability {
    id: number,
    expertId: number,
    date: string,
    startTime: string,
    endTime: string,
    status: number;
}

export const GetAvailability = async (params: GetAvailabilityRequest): Promise<GetAvailabilityResponse> => {
    try {
        const url = new URLSearchParams();
        if (params.expertId) {
            url.append('expertId', params.expertId + '');
        }
        const res = await apiServerFetch(`/availability?${url.toString()}`, 'GET');
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface PostAvailabilityRequest {
    request: PostAvailabilityData[],
}

export interface PostAvailabilityData {
    date: string,
    startTime: string,
    endTime: string
}

export interface PostAvailabilityResponse {
    status: string;
    responseText: string;
    data: string;
}

export const PostAvailability = async (params: PostAvailabilityRequest, accessToken: string): Promise<PostAvailabilityResponse> => {
    try {
        const res = await apiServerFetch(`/availability`, 'POST', params, accessToken);
        if (res.status === 'error') {
            throw new Error(res.responseText)
        }
        return res;
    } catch (error: any) {
        return errorSystem(error.message, '');
    }
};
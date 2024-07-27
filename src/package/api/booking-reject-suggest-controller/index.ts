import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBookingRejectSuggestRequest {
    type: number;
}

export interface GetBookingRejectSuggestResponse {
    status: string;
    responseText: string;
    data: BookingReject[];
}

export interface BookingReject {
    id: number,
    content: string,
    description: string,
    type: number,
    createdAt: string,
    updatedAt: string,
}

export const GetBookingRejectSuggest = async (params: GetBookingRejectSuggestRequest): Promise<GetBookingRejectSuggestResponse> => {
    try {
        const url = new URLSearchParams();
        if (params.type) {
            url.append('type', params.type + '');
        }
        const res = await apiServerFetch(`/booking-reject-suggest?${url.toString()}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface PostBookingRejectSuggestRequest {
    content: string,
    description: string,
    type: number,
}

export interface PostBookingRejectSuggestResponse {
    status: string;
    responseText: string;
}


export const PostBookingRejectSuggest = async (params: PostBookingRejectSuggestRequest): Promise<PostBookingRejectSuggestResponse> => {
    try {
        const res = await apiServerFetch(`/booking-reject-suggest`, 'POST', params, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
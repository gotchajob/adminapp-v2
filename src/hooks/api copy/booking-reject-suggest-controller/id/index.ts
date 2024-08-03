import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface GetBookingRejectSuggestByIdRequest {
    id: number;
}

export interface GetBookingRejectSuggestByIdResponse {
    status: string;
    responseText: string;
    data: BookingReject;
}

export interface BookingReject {
    id: number,
    content: string,
    description: string,
    type: number,
    createdAt: string,
    updatedAt: string,
}

export const GetBookingRejectSuggestById = async (params: GetBookingRejectSuggestByIdRequest): Promise<GetBookingRejectSuggestByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-reject-suggest/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

export interface DelBookingRejectSuggestByIdRequest {
    id: number;
}

export interface DelBookingRejectSuggestByIdResponse {
    status: string;
    responseText: string;
}

export const DelBookingRejectSuggestById = async (params: DelBookingRejectSuggestByIdRequest, accessToken: string): Promise<DelBookingRejectSuggestByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-reject-suggest/${params.id}`, 'DELETE', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};

export interface PatchBookingRejectSuggestByIdRequest {
    id: number;
    content: string;
    description: string;
    type: number;
}

export interface PatchBookingRejectSuggestByIdResponse {
    status: string;
    responseText: string;
}

export const PatchBookingRejectSuggestById = async (params: PatchBookingRejectSuggestByIdRequest, accessToken: string): Promise<PatchBookingRejectSuggestByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking-reject-suggest/${params.id}`, 'PATCH', { content: params.content, description: params.description, type: params.type }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', "");
    }
};
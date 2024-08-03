import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetBookingPriceResponse {
    status: string;
    responseText: string;
    data: BookingPrice;
}

export interface BookingPrice {
    price: number;
}

export const GetBookingPrice = async (): Promise<GetBookingPriceResponse> => {
    try {
        const res = await apiServerFetch(`/booking/price`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};

export interface PatchBookingPriceRequest {
    price: number;
}

export interface PatchBookingPriceResponse {
    status: string;
    responseText: string;
}

export const PatchBookingPrice = async (params: PatchBookingPriceRequest, accessToken: string): Promise<GetBookingPriceResponse> => {
    try {
        const res = await apiServerFetch(`/booking/price`, 'PATCH', { price: params.price }, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};
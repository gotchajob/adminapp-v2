import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BookingCurrent {
    id: number,
    expertId: number,
    customerId: number,
    availabilityId: number,
    startInterviewDate: string,
    endInterviewDate: string,
    customerCvId: number,
    note: string,
    rejectReason: string,
    status: number,
    createdAt: string,
    canCancel: boolean,
    expertSkillOptionId: []
}

export interface GetBookingCurrentRes {
    status: string;
    responseText: string;
    data: BookingCurrent[];
}

export const GetBookingCurrent = async (accessToken: string): Promise<GetBookingCurrentRes> => {
    try {
        const res = await apiServerFetch(`/booking/expert/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
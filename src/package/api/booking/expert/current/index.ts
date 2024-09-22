import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BookingCurrent {
    id: number,
    expertId: number,
    customerId: number,
    customerCv: CustomerCv
    startInterviewDate: string,
    endInterviewDate: string,
    note: string,
    rejectReason: string,
    status: number,
    createdAt: string,
    canCancel: boolean,
    skillOptionBooking: skillOptionBooking[],
    customerInfo: CustomerInfo
}

export interface CustomerCv {
    id: 0,
    name: string,
    image: string
}

export interface CustomerInfo {
    avatar: string;
    fullName: string;
    email: string;
}

export interface GetBookingCurrentRes {
    status: string;
    responseText: string;
    data: BookingCurrent[];
}

export interface skillOptionBooking {
    expertSkillOptionId: number,
    skillId: number,
    skillName: string,
    skillOptionId: number,
    skillOptionName: string
}

export const GetBookingCurrent = async (accessToken: string): Promise<GetBookingCurrentRes> => {
    try {
        const res = await apiServerFetch(`/booking/expert/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
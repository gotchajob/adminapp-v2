import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetBookingResponse {
    status: string;
    responseText: string;
    data: Booking[];
}

export interface Booking {
    id: number,
    expertId: number,
    customerId: number,
    availabilityId: number,
    startInterviewDate: string,
    endInterviewDate: string,
    note: string,
    rejectReason: string,
    status: number,
    createdAt: string,
    expertSkillOptionId: []
}

export const GetBooking = async (): Promise<GetBookingResponse> => {
    try {
        const res = await apiServerFetch(`/booking`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};

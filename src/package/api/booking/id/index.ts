import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingByIdRequest {
    id: number;
}

export interface GetBookingByIdResponse {
    status: string;
    responseText: string;
    data: Booking;
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

export const GetBookingById = async (params: GetBookingByIdRequest): Promise<GetBookingByIdResponse> => {
    try {
        const res = await apiServerFetch(`/booking/${params.id}`, 'GET', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
};
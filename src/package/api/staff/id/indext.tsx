import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetStaffByIdResponse {
    status: string;
    responseText: string;
    data: StaffDetail;
}

export interface StaffDetail {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    avatar: string,
    status: number,
    createdAt: string,
}

export interface GetStaffByIdRequest {
    id: number,
}

export async function GetStaffById(params: GetStaffByIdRequest, accessToken: string): Promise<GetStaffByIdResponse> {
    try {
        const res = await apiServerFetch(`/staff/${params.id}`, 'GET', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, {});
    }
}

export interface PatchStaffByIdResponse {
    status: string;
    responseText: string;
}

export interface PatchStaffByIdRequest {
    id: number,
    password: string,
    firstName: string,
    lastName: string
}

export async function PatchStaffById(params: PatchStaffByIdRequest, accessToken: string): Promise<PatchStaffByIdResponse> {
    try {
        const res = await apiServerFetch(`/staff/${params.id}`, 'PATCH', { password: params.password, firstName: params.firstName, lastName: params.lastName }, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, "");
    }
}

import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetAllStaffResponse {
    status: string;
    responseText: string;
    data: Staff[],
}

export interface Staff {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string,
    status: number,
}

export async function GetAllStaff(accessToken: string): Promise<GetAllStaffResponse> {
    try {
        const res = await apiServerFetch(`/staff/all`, 'GET', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, []);
    }
}

import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetUserCurrentResponse {
    status: string;
    responseText: string;
    data: userCurrent;
}

export interface userCurrent {
    id: number,
    avatar: string,
    email: string,
    fullName: string,
    phone: string,
    address: string,
    roleId: number
}

export async function GetUserCurrent(accessToken: string): Promise<GetUserCurrentResponse> {
    try {
        const res = await apiServerFetch(`/user/current`, 'GET', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, {});
    }
}

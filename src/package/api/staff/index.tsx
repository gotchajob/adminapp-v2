import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface PostStaffResponse {
    status: string;
    responseText: string;
}

export interface PostStaffRequest {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export async function PostStaff(params: PostStaffRequest, accessToken: string): Promise<PostStaffResponse> {
    try {
        const res = await apiServerFetch(`/staff`, 'POST', params, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, "");
    }
}

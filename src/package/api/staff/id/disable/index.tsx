import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface PatchStaffDisableResponse {
    status: string;
    responseText: string;
}

export interface PatchStaffDisableRequest {
    id: number,
}

export async function PatchStaffDisable(params: PatchStaffDisableRequest, accessToken: string): Promise<PatchStaffDisableResponse> {
    try {
        const res = await apiServerFetch(`/staff/${params.id}/disable`, 'PATCH', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, "");
    }
}
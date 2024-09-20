import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface PatchStaffEnableResponse {
    status: string;
    responseText: string;
}

export interface PatchStaffEnableRequest {
    id: number,
}

export async function PatchStaffEnable(params: PatchStaffEnableRequest, accessToken: string): Promise<PatchStaffEnableResponse> {
    try {
        const res = await apiServerFetch(`/staff/${params.id}/enable`, 'PATCH', undefined, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, "");
    }
}
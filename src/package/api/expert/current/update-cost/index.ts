import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchExpertUpdateCostRequest {
    cost: number;
}

export interface PatchExpertUpdateCostResponse {
    status: string;
    responseText: string;
}

export const PatchExpertUpdateCost = async (params: PatchExpertUpdateCostRequest, accessToken: string): Promise<PatchExpertUpdateCostResponse> => {
    try {
        const res = await apiServerFetch(`/expert/current/update-cost`, 'PATCH', { cost: params.cost }, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Không thẻ lấy thông tin', '');
    }
};
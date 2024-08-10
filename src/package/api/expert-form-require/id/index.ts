import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface PatchExpertFormRequireRequest {
    id: number;
    categoryId: number;
    name: string;
    description: string;
}

export interface PatchExpertFormRequireResponse {
    status: string;
    responseText: string;
}

export const PatchExpertFormRequire = async (
    params: PatchExpertFormRequireRequest
): Promise<PatchExpertFormRequireResponse> => {
    try {
        const res = await apiServerFetch(
            `/expert-form-require/${params.id}`,
            "PATCH", { categoryId: params.categoryId, name: params.name, description: params.description }, undefined
        );
        return res;
    } catch (error) {
        return errorSystem("Lỗi không thể lấy thông tin đăng kí", '');
    }
};

export interface DelExpertFormRequireRequest {
    id: number;
}

export interface DelExpertFormRequireResponse {
    status: string;
    responseText: string;
}

export const DelExpertFormRequire = async (
    params: DelExpertFormRequireRequest
): Promise<DelExpertFormRequireResponse> => {
    try {
        const res = await apiServerFetch(
            `/expert-form-require/${params.id}`,
            "DELETE", undefined, undefined
        );
        return res;
    } catch (error) {
        return errorSystem("Lỗi không thể lấy thông tin đăng kí", '');
    }
};
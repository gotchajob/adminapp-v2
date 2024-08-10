import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface DelCategoryRes {
    status: string;
    responseText: string;
}

export interface DelCategoryRq {
    id: number;
}

export const DelCategory = async (params: DelCategoryRq): Promise<DelCategoryRes> => {
    try {
        const res = await apiServerFetch(`/category/${params.id}`, 'DELETE', undefined, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};

export interface PatchCategoryRes {
    status: string;
    responseText: string;
}

export interface PatchCategoryRq {
    id: number;
    name: string;
}

export const PatchCategory = async (params: PatchCategoryRq): Promise<PatchCategoryRes> => {
    try {
        const res = await apiServerFetch(`/category/${params.id}`, 'PATCH', { name: params.name }, undefined);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', '');
    }
};
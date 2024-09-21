import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetPolicyByIdRq {
    id: number;
}

export interface GetPolicyByIdRes {
    status: string,
    responseText: string,
    data: PolicyById;
}

export interface PolicyById {
    id: number;
    key: string;
    value: number;
    description: string;
}

export const getPolicyById = async (params: GetPolicyByIdRq, accessToken: string): Promise<GetPolicyByIdRes> => {
    try {
        const res = await apiServerFetch(
            `/policy/${params.id}`,
            "GET",
            undefined,
            accessToken
        );
        return res;
    } catch (error: any) {
        return errorSystem("Lấy danh sách thất bại", {});
    }
}

export interface PatchPolicyByIdRq {
    id: number;
    value: string,
    description: string,
}

export interface PatchPolicyByIdRes {
    status: string,
    responseText: string,
}

export const PatchPolicyById = async (params: PatchPolicyByIdRq, accessToken: string): Promise<PatchPolicyByIdRes> => {
    try {
        const res = await apiServerFetch(
            `/policy/${params.id}`,
            "PATCH",
            {
                value: params.value,
                description: params.description
            },
            accessToken
        );
        return res;
    } catch (error: any) {
        return errorSystem("Lấy danh sách thất bại", "");
    }
}

export interface DelPolicyByIdRq {
    id: number;
}

export interface DelPolicyByIdRes {
    status: string,
    responseText: string,

}

export const DelPolicyById = async (params: DelPolicyByIdRq, accessToken: string): Promise<DelPolicyByIdRes> => {
    try {
        const res = await apiServerFetch(
            `/policy/${params.id}`,
            "DELETE",
            undefined,
            accessToken
        );
        return res;
    } catch (error: any) {
        return errorSystem("Lấy danh sách thất bại", "");
    }
}
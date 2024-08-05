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

export const getPolicyById = async (params: GetPolicyByIdRq): Promise<GetPolicyByIdRes> => {
    try {
        const res = await apiServerFetch(
            `/policy/${params.id}`,
            "GET",
            undefined,
            undefined
        );
        return res;
    } catch (error: any) {
        return errorSystem("Lấy danh sách thất bại", {});
    }
}
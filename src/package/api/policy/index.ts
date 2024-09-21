import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetPolicyRes {
    status: string,
    responseText: string,
    data: Policy[];
}

export interface Policy {
    id: number;
    key: string;
    value: string;
    description: string;
}

export const GetPolicy = async (accessToken: string): Promise<GetPolicyRes> => {
    try {
        const res = await apiServerFetch(
            `/policy`,
            'GET',
            undefined,
            accessToken
        );
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', []);
    }
}

export interface PostPolicyRq {
    key: string,
    value: string,
    description: string
}

export interface PostPolicyRes {
    status: string,
    responseText: string,
}

export const PostPolicy = async (params: PostPolicyRq, accessToken: string): Promise<PostPolicyRes> => {
    try {
        const res = await apiServerFetch(
            `/policy`,
            'POST',
            params,
            accessToken
        );
        return res;
    } catch (error: any) {
        return errorSystem(error, '');
    }
}
import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface UserChangePasswordRequest {
    oldPassword: string,
    newPassword: string,
}

export interface UserChangePasswordResponse {
    status: string;
    responseText: string;
}

export async function UserChangePassword(params: UserChangePasswordRequest, accessToken: string): Promise<UserChangePasswordResponse> {
    try {
        const res = await apiServerFetch(`/user/change-password`, 'PATCH', { oldPassword: params.oldPassword, newPassword: params.newPassword }, accessToken);
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Không thẻ lấy thông tin', "");
    }
}

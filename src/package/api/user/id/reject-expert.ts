import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface rejectExpertRq {
    id: number;
}

export interface rejectExpertResponse{
    status: string
    responseText: string;
    data: string
}

export const PatchRejectExpert = async(params: rejectExpertRq , accessToken:string): Promise<rejectExpertResponse>=>{
    try {
        const res = await apiServerFetch(`/user/${params.id}/reject-expert`, 'PATCH', undefined, accessToken);
        if (res.status === 'error') {
          throw new Error('');
        }
        return res;
      } catch (error: any) {
        return errorSystem('Từ chối thất bại', '');
      }
}
import { accessToken } from 'mapbox-gl';
import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetExpertNationSupportRequest {
  expertId: number;
}

export interface GetExpertNationResponnse {
  status: string;
  responseText: string;
  data: ExpertNation[];
}

export interface ExpertNation{
  id:number;
  nation:string;
}

export const GetExpertNation = async (params: GetExpertNationSupportRequest,): Promise<GetExpertNationResponnse> => {
  try {
    console.log(params)
    const searchParams = new URLSearchParams();
    searchParams.append('expertId', params.expertId + '');
    const res = await apiServerFetch(`/expert-nation-support?` + searchParams.toString(), 'GET');
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', {});
  }
};

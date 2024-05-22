import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetUserListRequest {
  pageNumber: number;
  pageSize: number;
}

export interface GetUserListRespone {
  status: string;
  responseText: string;
  data: {
    list: UserList[];
    totalPage: number;
  };
}

export interface UserList {
  id: number;
  avatar: string;
  email: string;
  fullName: string;
  phone: string;
  address: string;
  status: number;
  createdAt: string;
}

export const GetUserList = async (params: GetUserListRequest, accessToken: string): Promise<GetUserListRespone> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('pageNumber', params.pageNumber + '');
    searchParams.set('pageSize', params.pageSize + '');
    const res = await apiServerFetch('/user?' + searchParams.toString(), 'GET', undefined, accessToken);
    if (res.status === 'error') {
      throw new Error('');
    }
    return res;
  } catch (error: any) {
    return errorSystem('Không thẻ lấy thông tin', { list: [], totalPage: 0 });
  }
};

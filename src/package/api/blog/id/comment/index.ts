import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface GetBlogCommentReq {
  id?: number;
  parentCommentId?: number;
  pageNumber: number;
  pageSize: number;
}

export interface GetBlogCommentRes {
  status: string;
  responseText: string;
  data: { list: CommentList[]; totalPage: number };
}

export interface Like {
  liked: Boolean;
  value: number;
}

export interface Profile {
  id: number;
  avatar: string;
  fullName: string;
}

export interface CommentList {
  id: number;
  content: string;
  createdAt: string;
  reply: number;
  likes: Like;
  profile: Profile;
}

export interface PostCommentReq {
  id: number;
}

export interface PostCommentBody {
  commentId?: number;
  content: string;
}

export interface PostCommentRes {
  status: string;
  responseText: string;
}

export const GetBlogComment = async (params: GetBlogCommentReq, accessToken: string): Promise<GetBlogCommentRes> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('pageNumber', params.pageNumber + '');
    searchParams.set('pageSize', params.pageSize + '');
    const res = await apiServerFetch(`/blog/${params.id}/comment?` + searchParams.toString(), 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy comment thất bại', '');
  }
};

export const GetReplyComment = async (params: GetBlogCommentReq, accessToken: string): Promise<GetBlogCommentRes> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set('parentCommentId', params.parentCommentId + '');
    searchParams.set('pageNumber', params.pageNumber + '');
    searchParams.set('pageSize', params.pageSize + '');
    const res = await apiServerFetch(`/blog/${params.id}/comment?` + searchParams.toString(), 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy comment thất bại', '');
  }
};

export const PostBlogComment = async (params: PostCommentReq, body: PostCommentBody, accessToken: string): Promise<PostCommentRes> => {
  try {
    const res = await apiServerFetch(`/blog/${params.id}/comment`, 'POST', body, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy comment thất bại', '');
  }
};

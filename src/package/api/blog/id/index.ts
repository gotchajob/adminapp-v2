import { apiServerFetch, errorSystem } from 'package/api/api-fetch';

export interface BlogDetaiReq {
  id: number;
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

export interface RelatedBlog {
  id: number;
  title: string;
  thumbnail: string;
  shortDescription: string;
  createdAt: string;
  profile: Profile;
}

export interface BlogDetailData {
  id: number;
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  createdAt: string;
  likes: Like;
  profile: Profile;
  numberComment?: number;
  averageRating?:number;
  ratingQuantity?: number;
  rated?: number;
  relateBlog: RelatedBlog[];
}

export interface BlogDetailRes {
  status: string;
  responseText: string;
  data: BlogDetailData;
}

export const getBlogDetail = async (params: BlogDetaiReq, accessToken: string): Promise<BlogDetailRes> => {
  try {
    const res = await apiServerFetch(`/blog/${params.id}`, 'GET', undefined, accessToken);
    return res;
  } catch (error: any) {
    return errorSystem('Lấy detail bài viết thất bại', null);
  }
};

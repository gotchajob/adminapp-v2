import { apiServerFetch, errorSystem } from '../api-fetch';

export interface GetReportSuggestRequest { }

export interface GetReportSuggestResponse {
  status: string;
  responseText: string;
  data: ReportSuggest[];
}
export interface ReportSuggest {
  id: number;
  report: string;
}

export const GetReportSuggest = async (params: GetReportSuggestRequest, accessToken: string): Promise<GetReportSuggestResponse> => {
  try {
    const res = await apiServerFetch('/report-suggest', 'GET', undefined, undefined);
    return res
  } catch (error: any) {
    return errorSystem('Lỗi không lấy được yêu cầu', []);
  }
};

export interface PostReportSuggestRequest {
  report: string,
  description: string
}

export interface PostReportSuggestResponse {
  status: string;
  responseText: string;
}

export const PostReportSuggest = async (params: PostReportSuggestRequest, accessToken: string): Promise<PostReportSuggestResponse> => {
  try {
    const res = await apiServerFetch('/report-suggest', 'POST', params, accessToken);
    return res
  } catch (error: any) {
    return errorSystem('Lỗi không lấy được yêu cầu', '');
  }
};

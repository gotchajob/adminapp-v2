import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetReportSuggestByIdRequest {
    id: string;
}

export interface GetReportSuggestByIdResponse {
    status: string;
    responseText: string;
    data: ReportSuggestById;
}
export interface ReportSuggestById {
    id: number;
    report: string;
    description: string,
    createdAt: string,
}

export const GetReportSuggestById = async (params: GetReportSuggestByIdRequest, accessToken: string): Promise<GetReportSuggestByIdResponse> => {
    try {
        const res = await apiServerFetch(`/report-suggest/${params.id}`, 'GET', undefined, accessToken);
        return res
    } catch (error: any) {
        return errorSystem('Lỗi không lấy được yêu cầu', {});
    }
};

export interface DeleteReportSuggestByIdRequest {
    id: number,
}

export interface DeleteReportSuggestByIdResponse {
    status: string;
    responseText: string;
}

export const DeleteReportSuggestById = async (params: DeleteReportSuggestByIdRequest, accessToken: string): Promise<DeleteReportSuggestByIdResponse> => {
    try {
        const res = await apiServerFetch(`/report-suggest/${params.id}`, 'DELETE', undefined, accessToken);
        return res
    } catch (error: any) {
        return errorSystem('Lỗi không lấy được yêu cầu', '');
    }
};


export interface PatchReportSuggestByIdRequest {
    id: number,
    report: string,
    description: string
}

export interface PatchReportSuggestByIdResponse {
    status: string;
    responseText: string;
}

export const PatchReportSuggestById = async (params: PatchReportSuggestByIdRequest, accessToken: string): Promise<PatchReportSuggestByIdResponse> => {
    try {
        const res = await apiServerFetch(`/report-suggest/${params.id}`, 'PATCH', { report: params.report, description: params.description }, accessToken);
        return res
    } catch (error: any) {
        return errorSystem('Lỗi không lấy được yêu cầu', '');
    }
};
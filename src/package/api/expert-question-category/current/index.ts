import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetExpertQuestionCategoryCurrentResponse {
    status: string;
    responseText: string;
    data: QuestionCategoryCurrent;
}

export interface QuestionCategoryCurrent {
    id: number,
    category: string,
    description: string
}

export const GetExpertQuestionCategoryCurrent = async (accessToken: string): Promise<GetExpertQuestionCategoryCurrentResponse> => {
    try {
        const res = await apiServerFetch(`/expert-question-category/current`, 'GET', undefined, accessToken);
        return res;
    } catch (error: any) {
        return errorSystem('Lấy danh sách thất bại', {});
    }
};
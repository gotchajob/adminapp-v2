import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface ExpertUpEvidenceRequest {
    id: number;
    content: string;
    evidence: string;
}
export interface ExpertUpEvidenceResponse {
    status: string;
    responseText: string;
}

export const ExpertUpReportEvidence = async (params: ExpertUpEvidenceRequest, accessToken: string): Promise<ExpertUpEvidenceResponse> => {
    try {
        const res = await apiServerFetch(`/booking-report/${params.id}/expert-up-evidence`, "PATCH", { content: params.content, evidence: params.evidence }, accessToken);
        return res
    } catch (error) {
        return errorSystem("Lỗi không thể gửi yêu cầu", "")
    }
};
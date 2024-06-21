import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface RegisterCriteriaRequest {
  requestId: number;
}
export interface RegisterCriteriaResponse {
  status: string;
  responseText: string;
  data: RegisterCriteria[];
}
export interface RegisterCriteria {
  id: number;
  expertRegisterRequestId: number;
  criteria: string;
  description: string;
  status: number;
}

export const GetRegisterCriteria = async (
  params: RegisterCriteriaRequest
): Promise<RegisterCriteriaResponse> => {
  try {
    const res = await apiServerFetch(
      `/expert-register-request/${params.requestId}/criteria`,
      "GET"
    );
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error) {
    return errorSystem("Không thể lấy thông tin", []);
  }
};

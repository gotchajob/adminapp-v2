import { apiServerFetch, errorSystem } from "../api-fetch";

export interface UpdateAdviceStatusRequest {
  id: string;
  status: number;
}
export interface UpdateAdviceStatusResponse {
  status: string;
  responseText: string;
  data: any;
}
export const UpdateAdviceStatus = async (
    params: UpdateAdviceStatusRequest,
    accessToken: string
  ): Promise<UpdateAdviceStatusResponse> => {
    try {
      const res = await apiServerFetch(
        "/advice-service/update-status",
        "POST",
        params,
        accessToken
      );
      if (res.status === "error") {
        throw new Error("");
      }
      return res;
    } catch (error: any) {
      return errorSystem("Thất bại", { token: "" });
    }
  };
  
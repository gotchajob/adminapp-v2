import { apiServerFetch, errorSystem } from "../api-fetch";

export interface UpdateOrderStatusRequest {
  id: string;
  status: number;
}
export interface UpdateOrderStatusResponse {
  status: string;
  responseText: string;
  data: any;
}
export const UpdateOrderStatus = async (
    params: UpdateOrderStatusRequest,
    accessToken: string
  ): Promise<UpdateOrderStatusResponse> => {
    try {
      const res = await apiServerFetch(
        "/order-service/update-status",
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
  
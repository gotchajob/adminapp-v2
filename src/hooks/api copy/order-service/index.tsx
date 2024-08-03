import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetOrderSericeResponse {
  status: string;
  responseText: string;
  data: {
    orderList: OrderService[];
    total: number;
  };
}

export interface OrderService {
  id: string;
  email: string;
  name: string;
  phone: string;
  service: string;
  payment: string;
  status: number;
  created: string;
  total: number;
  processingBy: string;
  code: string;
}
export interface GetOrderSericeRequest {
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortOrder: "asc" | "desc";
}
export const GetOrder = async (
  params: GetOrderSericeRequest,
  accessToken: string
): Promise<GetOrderSericeResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.page + "");
    searchParams.set("limit", params.limit + "");
    searchParams.set("sortBy", params.sortBy);
    searchParams.set("sortOrder", params.sortOrder);

    const res = await apiServerFetch(
      "/order-service?" + searchParams.toString(),
      "GET",
      undefined,
      accessToken
    );
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể lấy thông tin", { token: "" });
  }
};


export interface CreateOrderServiceRequest {
  serviceId: number;
  name: string;
  phone: string;
  email: string;
  paymentId: number;
  total: number;
}
export interface CreateOrderServiceResponse {
  status: string;
  responseText: string;
  data: {
    id: string;
    email: string;
    name: string;
    phone: string;
    service: string;
    payment: string;
    status: number;
    created: string;
    total: number;
    processingBy: string;
    code: string;
  };
}
export const CreateOrderSerivce = async (
  params: CreateOrderServiceRequest
): Promise<CreateOrderServiceResponse> => {
  try {
    const res = await apiServerFetch("/order-service", "POST", params);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể gửi yêu cầu", { token: "" });
  }
};
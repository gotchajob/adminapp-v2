import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetAdviceSericeResponse {
  status: string;
  responseText: string;
  data: {
    adviseList: AdviceService[];
    total: number;
  };
}

export interface AdviceService {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  status: number;
  createdAt: string;
  advise: string;
  processingBy: string;
}
export interface GetAdviceSericeRequest {
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortOrder: "asc" | "desc";
}
export const GetAdvice = async (
  params: GetAdviceSericeRequest,
  accessToken: string
): Promise<GetAdviceSericeResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.page + "");
    searchParams.set("limit", params.limit + "");
    searchParams.set("sortBy", params.sortBy);
    searchParams.set("sortOrder", params.sortOrder);

    const res = await apiServerFetch(
      "/advice-service?" + searchParams.toString(),
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

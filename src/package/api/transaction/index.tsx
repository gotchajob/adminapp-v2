import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetTransactionResponse {
  status: string;
  responseText: string;
  data: {
    transactionList: Transaction[];
    total: number;
  };
}

export interface Transaction {
  id: string;
  email: string;
  name: string;
  phone: string;
  serviceName: string;
  total: number;
  createdAt: string;
}
export interface GetTransactionRequest {
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortOrder: "asc" | "desc";
}
export const GetTransaction = async (
  params: GetTransactionRequest,
  accessToken: string
): Promise<GetTransactionResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.page + "");
    searchParams.set("limit", params.limit + "");
    searchParams.set("sortBy", params.sortBy);
    searchParams.set("sortOrder", params.sortOrder);

    const res = await apiServerFetch(
      "/transaction?" + searchParams.toString(),
      "GET",
      undefined,
      accessToken
    );
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể lấy thông tin", {});
  }
};

import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetDashboardTransactionRequest {
  year: number;
  month: number;
}
export interface Transaction {
  service: string;
  transactionPerDay: number[];
  total: number;
  revenue: number;
}

export interface GetDashboardTransactionResponse {
  status: string;
  responseText: string;
  data: {
    totalTransaction: Transaction;
    listTransaction: Transaction[];
    count: number;
    sumCost: number;
  };
}
export const GetDashboardTransaction = async (
  params: GetDashboardTransactionRequest,
  accessToken: string
): Promise<GetDashboardTransactionResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("year", params.year + "");
    searchParams.set("month", params.month + "");

    const res = await apiServerFetch(
      "/dash-board/transaction?" + searchParams.toString(),
      "GET",
      undefined,
      accessToken
    );
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thể lấy thông tin", {
      totalTransaction: {
        service: "",
        transactionPerDay: [],
        total: 0,
        revenue: 0,
      },
      listTransaction: [
        {
          service: "",
          transactionPerDay: [],
          total: 0,
          revenue: 0,
        },
      ],
      count: 0,
      sumCost: 0,
    });
  }
};

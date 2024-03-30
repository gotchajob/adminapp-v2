import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetDashboardUserRequest {
  year: number;
  month: number;
}
export interface GetDashboardUserResponse {
  status: string;
  responseText: string;
  data: {
    timeAccess: number[];
    newUser: number[];
    totalUser: number;
    newAdvise: number;
    totalAccess: number;
    totalUserBefore: number
  };
}
export const GetDashboardUser = async (
  params: GetDashboardUserRequest,
  accessToken: string
): Promise<GetDashboardUserResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("year", params.year + "");
    searchParams.set("month", params.month + "");

    const res = await apiServerFetch(
      "/dash-board/user?" + searchParams.toString(),
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

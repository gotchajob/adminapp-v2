import { apiServerFetch, errorSystem } from "../api-fetch";

export interface BanUserRequest {
  userIdList: string[];
}
export interface BanUserResponse {
  status: string;
  responseText: string;
  data: any;
}
export const BanUser = async (
  params: BanUserRequest,
  accessToken: string
): Promise<BanUserResponse> => {
  try {
    const res = await apiServerFetch(
      "/user/ban-user",
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

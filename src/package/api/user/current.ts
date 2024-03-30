import { apiServerFetch, errorSystem } from "../api-fetch";

export interface UserCurrentRequest {}
export interface UserCurrentResponse {
  status: string;
  responseText: string;
  data: {
    id: string;
    fullName: string;
    email: string;
    roleId: number;
    status: number;
  };
}
export const UserCurrent = async (
  accessToken: string
): Promise<UserCurrentResponse> => {
  try {
    const res = await apiServerFetch("/user/current", "GET", undefined, accessToken);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Đăng nhập thất bại", { token: "" });
  }
};

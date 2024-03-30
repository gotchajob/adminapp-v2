import { apiServerFetch, errorSystem } from "../api-fetch";

export interface GetUserRequest {
  page: number;
  limit: number;
  sortBy: "createdAt";
  sortOrder: "asc" | "desc";
}
export interface GetUserResponse {
  status: string;
  responseText: string;
  data: {
    userList: User[];
    total: 0;
  };
}
export interface User {
  id: string;
  fullName: string;
  email: string;
  roleId: number;
  status: number;
  created: string;
}
export const GetUser = async (
  params: GetUserRequest,
  accessToken: string
): Promise<GetUserResponse> => {
  try {
    const searchParams = new URLSearchParams();
    searchParams.set("page", params.page + "");
    searchParams.set("limit", params.limit + "");
    searchParams.set("sortBy", params.sortBy);
    searchParams.set("sortOrder", params.sortOrder);

    const res = await apiServerFetch(
      "/user?" + searchParams.toString(),
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

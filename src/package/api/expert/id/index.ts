import { apiServerFetch, errorSystem } from "package/api/api-fetch";
export interface GetExpertRequest {
  id: number;
}

export interface GetExpertResponse {
  status: string;
  responseText: string;
  data: Expert;
}

export interface Expert {
  userId: number;
  expertId: number;
  userStatus: number;
  email: string;
  avatar: string;
  firstName: string;
  lastName: string;
  address: string;
  yearExperience: number;
  phone: string;
  birthDate: string;
  emailContact: string;
  bio: string;
  portfolioUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  education: string;
}

export const GetExpert = async (
  params: GetExpertRequest
): Promise<GetExpertResponse> => {
  try {
    const res = await apiServerFetch(`/expert/${params.id}`, "GET", undefined);
    if (res.status === "error") {
      throw new Error("");
    }
    return res;
  } catch (error: any) {
    return errorSystem("Không thẻ lấy thông tin", {});
  }
};

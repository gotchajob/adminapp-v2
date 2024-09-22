import { apiServerFetch, errorSystem } from "package/api/api-fetch";

export interface GetBookingByIdRequest {
  id: number;
}

export interface GetBookingByIdResponse {
  status: string;
  responseText: string;
  data: BookingById;
}

export interface CustomerInfo {
  avatar: string;
  fullName: string;
  email: string;
}

export interface CustomerCV {
  id: string;
  name: string;
  image: string;
}

export interface SkillOptions {
  skillId: number,
  skillName: string,
  skillOptionId: number,
  skillOptionName: string
}

export interface BookingById {
  canCancel: boolean;
  id: number;
  expertId: number;
  customerId: number;
  customerCv: CustomerCV;
  availabilityId: number;
  startInterviewDate: string;
  endInterviewDate: string;
  note: string;
  rejectReason: string;
  status: number;
  createdAt: string;
  skillOptionBooking: SkillOptions[];
  customerInfo: CustomerInfo;
}

export const GetBookingById = async (
  params: GetBookingByIdRequest
): Promise<GetBookingByIdResponse> => {
  try {
    const res = await apiServerFetch(
      `/booking/${params.id}`,
      "GET",
      undefined,
      undefined
    );
    return res;
  } catch (error: any) {
    return errorSystem("Lấy danh sách thất bại", {});
  }
};

import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface CVTemplateByIdRequest {
    id: number;
}

export interface CVTemplateByIdResponse {
    status: string;
    responseText: string;
    data: CVTemplateById;
}

export interface CVTemplateById {
    id: number,
    cvCategoryId: number,
    cvCategoryName: string,
    cvCategoryDescription: string,
    name: string,
    templateJson: string,
    image: string
}

export const GetCVTemplateById = async (params: CVTemplateByIdRequest) => {
    try {
        const res = await apiServerFetch(`/cv-template/${params.id}`, 'GET');
        if (res.status === 'error') {
            throw new Error('');
        }
        return res;
    } catch (error: any) {
        return errorSystem('Lấy thông tin thất bại', []);
    }
};

export interface PatchCVTemplateRequest {
    id: number;
    templateJson: string;
    name: string;
    image: string;
  }
  
  export interface PatchCVTemplateResponse {
    status: string;
    responseText: string;
    data: string;
  }
  
  export const PatchCVTemplate = async (params: PatchCVTemplateRequest, accessToken: string) => {
    try {
      const res = await apiServerFetch(`/cv-template/${params.id}`, "PATCH", params, accessToken);
      if (res.status === "error") {
        throw new Error("");
      }
      return res;
    } catch (error: any) {
      return errorSystem("Lấy thông tin thất bại", []);
    }
  };
  
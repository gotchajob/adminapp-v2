import { apiServerFetch, errorSystem } from "package/api/api-fetch";


export interface PatchExpertNationSupportRequest {
    nations: string[];
}

export interface PatchExpertNationResponnse {
    status: string;
    responseText: string;
}

export const PatchExpertCurrentNation = async (params: PatchExpertNationSupportRequest, accessToken: string): Promise<PatchExpertNationResponnse> => {
    try {
        const res = await apiServerFetch(`/expert-nation-support/update-list`, 'PATCH', { nations: params.nations }, accessToken);
        if (res.status === 'error') {
            throw new Error(res.responseText);
        }
        return res;
    } catch (error: any) {
        return errorSystem(error, "");
    }
};
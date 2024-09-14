import { GetReportSuggest, GetReportSuggestResponse, ReportSuggest } from "package/api/report-suggest";
import { GetReportSuggestById, GetReportSuggestByIdRequest, ReportSuggestById } from "package/api/report-suggest/id";
import { useEffect, useState } from "react";

export function UseGetReportSuggest(accessToken: string, refresh: number) {
    const [reportSuggest, setReportSuggest] = useState<ReportSuggest[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchReportSuggest = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetReportSuggest(accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setReportSuggest(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReportSuggest();
    }, [accessToken, refresh]);

    return {
        reportSuggest,
        loading
    }
}

export function UseGetReportSuggestById(params: GetReportSuggestByIdRequest, accessToken: string, refresh: number) {

    const [reportSuggestById, setReportSuggestById] = useState<ReportSuggestById>({
        id: 0,
        report: "",
        description: "",
        createdAt: "",
    });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchReportSuggestById = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const res = await GetReportSuggestById(params, accessToken);
            if (res.status !== "success") {
                throw new Error();
            }
            setReportSuggestById(res.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchReportSuggestById();
    }, [params.id, accessToken, refresh]);

    return {
        reportSuggestById,
        loading
    }
}
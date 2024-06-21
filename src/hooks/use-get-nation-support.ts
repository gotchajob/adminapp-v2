import { ExpertNation, GetExpertNationSupportCurrent } from "package/api/expert-nation-support/current";
import { useEffect, useState } from "react";

export function useGetNationSupportCurrent(params: string, refresh: any) {
    const [loading, setLoading] = useState<boolean>(true);

    const [nationSupportCurrent, setNationSupportCurrent] = useState<ExpertNation[] | undefined>();

    const fetchExpertCurrent = async () => {
        try {
            setLoading(true);
            const data = await GetExpertNationSupportCurrent(params);
            if (data.status == 'error') {
                throw new Error();
            }
            setNationSupportCurrent(data.data);
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpertCurrent();
    }, [refresh, params]);

    return {
        nationSupportCurrent,
        loading,
    };
}
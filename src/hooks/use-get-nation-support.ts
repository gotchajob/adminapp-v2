import { ExpertNation, GetExpertNationSupportCurrent } from "package/api/expert-nation-support/current";
import { useEffect, useState } from "react";

export function useGetNationSupportCurrent(accessToken: string, refresh: any) {
    const [loading, setLoading] = useState<boolean>(false);

    const [nationSupportCurrent, setNationSupportCurrent] = useState<ExpertNation[] | undefined>();

    const fetchExpertCurrent = async () => {
        try {
            setLoading(true);
            const data = await GetExpertNationSupportCurrent(accessToken);
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
        if (accessToken) {
            fetchExpertCurrent();
        }
    }, [refresh, accessToken]);

    return {
        nationSupportCurrent,
        loading,
    };
}
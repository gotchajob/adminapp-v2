import { Availability, GetAvailability, GetAvailabilityRequest } from 'package/api/availability';
import { useEffect, useState } from 'react';

export const useGetAvailability = (params: GetAvailabilityRequest, refreshTime: number) => {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);

    const [loading, setLoading] = useState<boolean>();

    const fetchAvailability = async () => {
        if (!params.expertId) {
            return;
        }
        try {
            setLoading(true);
            const data = await GetAvailability(params);
            setAvailabilities(data.data);
            setLoading(false);
        } catch (error) { }
    };

    useEffect(() => {
        console.log("useGetAvailability", params.expertId);
        fetchAvailability();
    }, [params.expertId, refreshTime]);

    return {
        availabilities,
        loading
    };
};
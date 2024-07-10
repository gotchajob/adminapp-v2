import { Availability, GetAvailability, GetAvailabilityRequest } from 'package/api/availability';
import { useEffect, useState } from 'react';

export const useGetAvailability = (params: GetAvailabilityRequest) => {
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);

    const fetchAvailability = async () => {
        try {
            const data = await GetAvailability(params);
            setAvailabilities(data.data);
        } catch (error) { }
    };

    useEffect(() => {
        fetchAvailability();
    }, [params.expertId]);

    return {
        availabilities
    };
};
import { CLIENT_STATIC_FILES_RUNTIME_POLYFILLS } from "next/dist/shared/lib/constants";
import { GetAllStaff, Staff } from "package/api/staff/all";
import { useEffect, useState } from "react";

export function UseGetAllStaff(accessToken: string, refresh: number) {
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchAllStaff = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const response = await GetAllStaff(accessToken);
            if (response.status !== 'success') {
                throw new Error();
            }
            setStaffs(response.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllStaff();
    }, [accessToken, refresh])

    return {
        staffs,
        loading
    }
}

import { getPolicyById, GetPolicyByIdRq, PolicyById } from "package/api/policy/[id]";
import { useEffect, useState } from "react";

export const useGetPolicyById = (params: GetPolicyByIdRq, refresh: number) => {
    const [policyById, setPolicyById] = useState<PolicyById>({
        id: 0,
        key: '',
        value: 0,
        description: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPolicyById = async () => {
        try {
            setLoading(true);
            const data = await getPolicyById(params);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setPolicyById(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchPolicyById() }, [params.id, refresh]);

    return {
        policyById, loading
    }
}
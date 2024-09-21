
import { GetPolicy, Policy } from "package/api/policy";
import { getPolicyById, GetPolicyByIdRq, PolicyById } from "package/api/policy/[id]";
import { useEffect, useState } from "react";

export const useGetPolicyById = (params: GetPolicyByIdRq, accessToken: string, refresh: number) => {
    const [policyById, setPolicyById] = useState<PolicyById>({
        id: 0,
        key: '',
        value: 0,
        description: '',
    });

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPolicyById = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const data = await getPolicyById(params, accessToken);
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

    useEffect(() => { fetchPolicyById() }, [params.id, refresh, accessToken]);

    return {
        policyById, loading
    }
}

export const useGetPolicy = (accessToken: string, refresh: number) => {
    const [policy, setPolicy] = useState<Policy[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const fetchPolicy = async () => {
        if (!accessToken) {
            return;
        }
        try {
            setLoading(true);
            const data = await GetPolicy(accessToken);
            if (data.status !== "success") {
                throw new Error(data.responseText);
            }
            setPolicy(data.data);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchPolicy() }, [refresh, accessToken]);

    return {
        policy, loading
    }
}
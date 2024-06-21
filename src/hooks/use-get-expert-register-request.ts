import { ExpertRegister, ExpertRegisterRequestRq, GetExpertRegisterRequest } from 'package/api/expert-register-request';
import { useEffect, useState } from 'react';

export const useGetExpertRegisterRequest = (params: ExpertRegisterRequestRq, refresh: number) => {
  const [expertRegisterRequest, setExpertRegisterRequest] = useState<ExpertRegister[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const GetExpertRegisterList = async () => {
    try {
      setLoading(true);
      const data = await GetExpertRegisterRequest({ ...params }, '');
      setExpertRegisterRequest(data.data.list);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetExpertRegisterList();
  }, [refresh, params.limit, params.page]);

  return {
    expertRegisterRequest,
    loading
  };
};

import { GetUserVerifyExpert, UserVerifyExpert, UserVerifyExpertRequest } from 'package/api/user/verify-expert';
import { useEffect, useState } from 'react';

export const useGetUserVerifyExpert = (params: UserVerifyExpertRequest, refresh: number) => {
  const [verifyExpert, setVerifyExpert] = useState<UserVerifyExpert[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const getUserVerifyExpert = async () => {
    try {
      setLoading(true);
      const data = await GetUserVerifyExpert(params, '');
      setVerifyExpert(data.data.list);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserVerifyExpert();
  }, [refresh]);

  return {
    verifyExpert,
    loading
  };
};

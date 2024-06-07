import { GetUserVerifyExpert, UserVerifyExpert, UserVerifyExpertRequest } from 'package/api/user/verify-expert';
import { useEffect, useState } from 'react';

export const useGetUserVerifyExpert = (params: UserVerifyExpertRequest) => {
  const [verifyExpert, setVerifyExpert] = useState<UserVerifyExpert[]>([]);

  const getUserVerifyExpert = async () => {
    const data = await GetUserVerifyExpert(params, '');
    setVerifyExpert(data.data.list);
  };

  useEffect(() => {
    getUserVerifyExpert();
  }, []);

  return {
    verifyExpert
  };
};

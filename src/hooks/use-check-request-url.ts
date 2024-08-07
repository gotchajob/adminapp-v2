import { ExpertRegisterCheckUrl, ExpertRegisterCheckUrlRequest } from 'package/api/expert-register-request/id/check-url';
import { useEffect, useState } from 'react';

export const useCheckRequestUrl = (params: ExpertRegisterCheckUrlRequest) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);

  const handleCheckUrl = async () => {
    try {
      setIsLoading(true);
      const data = await ExpertRegisterCheckUrl(params);
      if (data.status === 'error') {
        throw new Error('');
      }
      setIsValid(true);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleCheckUrl();
  }, [params.id]);

  return {
    isLoading,
    isValid
  }
};

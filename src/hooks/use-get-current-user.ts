import { accessToken } from 'mapbox-gl';
import { GetUserCurrent } from 'package/api/user/current';

import { useState, useEffect } from 'react';

export const useGetCustomer = (userToken: string) => {
  const [customer, setCustomer] = useState<any>(null);

  const getCustomer = async () => {
    try {
      const res = await GetUserCurrent(userToken);
      if (res.status === 'error') {
        throw new Error('Không thể lấy token');
      }
      setCustomer(res.data);
    } catch (error: any) {}
  };

  useEffect(() => {
    if (userToken) {
      getCustomer();
    }
  }, [userToken]);

  return {
    customer
  };
};

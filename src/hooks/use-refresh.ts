import { useState } from 'react';

export const useRefresh = () => {
  const [refreshTime, setRefreshTime] = useState(0);

  const refresh = () => {
    setRefreshTime(refreshTime + 1);
  };

  return {
    refreshTime,
    refresh
  };
};

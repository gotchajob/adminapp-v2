import { Expert, getExpertList, getExpertListRequest } from 'package/api/expert';
import { useEffect, useState } from 'react';

export default function useGetExpertList(params: getExpertListRequest, refresh: number) {
  const [loading, setLoading] = useState<boolean>(true);

  const [expertList, setExpertList] = useState<Expert[]>([]);

  const fetchExpertList = async () => {
    try {
      setLoading(true);
      const data = await getExpertList(params, '');
      setExpertList(data.data.list);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertList();
  }, [refresh]);

  return { loading, expertList };
}

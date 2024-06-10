import { GetUserList, GetUserListRequest, UserList } from 'package/api/user';
import { useEffect, useState } from 'react';

export default function useGetUserList(params: GetUserListRequest, refresh: any) {
  const [loading, setLoading] = useState<boolean>(true);

  const [userList, setUserList] = useState<UserList[]>([]);

  const fetchUserList = async () => {
    try {
      setLoading(true);
      const data = await GetUserList(params, '');
      if (data.status == 'error') {
        throw new Error();
      }
      setUserList(data.data.list);
      setLoading(false);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [refresh]);

  return {
    userList,
    loading
  };
}

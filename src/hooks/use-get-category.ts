import { Category, getCategory } from 'package/api/category';
import { useEffect, useState } from 'react';

export const useGetCategories = (refresh: number) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getClientCategories = async () => {

    try {
      setLoading(true);
      const data = await getCategory();
      if (data.status !== 'success') {
        throw new Error(data.responseText);
      }
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientCategories();
  }, [refresh]);

  return {
    categories, loading
  };
};
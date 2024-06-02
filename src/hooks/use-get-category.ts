import { Category, getCategory } from 'package/api/category';
import { useEffect, useState } from 'react';

export const useGetCategories = (params: {}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getClientCategories = async () => {
    const data = await getCategory();
    setCategories(data.data);
  };

  useEffect(() => {
    getClientCategories();
  }, []);

  return {
    categories
  };
};
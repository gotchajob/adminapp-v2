import { CVCategory, GetCVCategory } from "package/api/cv-category";
import { useEffect, useState } from "react";

export const useGetCVCategory = (page?: number, refreshTime?: number) => {
  const [cvCategory, setCVCategory] = useState<CVCategory[]>([]);

  const getCVCategory = async () => {
    try {
      const data = await GetCVCategory({});
      setCVCategory(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCVCategory();
  }, [refreshTime]);
  return {
    cvCategory,
  };
};

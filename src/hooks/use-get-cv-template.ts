import { CVTemplateApi, GetCVTemplate } from "package/api/cv-template";
import { useEffect, useState } from "react";

export const useGetCVTemplate = ({
  categoryId,
  page = 1,
}: {
  categoryId?: number;
  page?: number;
}) => {
  const [cvTemplateList, setCVTemplateList] = useState<CVTemplateApi[]>([]);
  const getCVTemplate = async () => {
    try {
      const data = await GetCVTemplate({ categoryId });
      setCVTemplateList(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getCVTemplate();
  }, [categoryId]);

  return {
    cvTemplateList,
  };
};

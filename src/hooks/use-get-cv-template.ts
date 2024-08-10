import { CVTemplateApi, GetCVTemplate } from "package/api/cv-template";
import {
  CVTemplateStaff,
  GetCVTemplateForStaff,
} from "package/api/cv-template/for-staff";
import { useEffect, useState } from "react";
import { StaffToken } from "./use-login";
import { CVTemplateById, CVTemplateByIdRequest, GetCVTemplateById } from 'package/api/cv-template/id';

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

export const useGetCVTemplateForStaff = ({
  categoryId,
  page = 1,
}: {
  categoryId?: number;
  page?: number;
}) => {
  const [cvTemplateStaffList, setCVTemplateList] = useState<CVTemplateStaff[]>(
    []
  );
  const { staffToken } = StaffToken();
  const getCVTemplate = async () => {
    try {
      const data = await GetCVTemplateForStaff({ categoryId }, staffToken);
      setCVTemplateList(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    if (staffToken !== "") {
      getCVTemplate();
    }
  }, [categoryId, staffToken]);

  return {
    cvTemplateStaffList,
  };
};

export const UseGetCVTemplateById = (params: CVTemplateByIdRequest) => {
  const [CVTemplateById, setCVTemplateById] = useState<CVTemplateById>();

  const [loading, setLoading] = useState(false);

  const fetchCVTemplateById = async () => {
    try {
      setLoading(true);
      const data = await GetCVTemplateById(params);
      setCVTemplateById(data.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVTemplateById();
  }, [params.id]);
  return { CVTemplateById, loading };
};

import { CVTemplateApi, GetCVTemplate } from "package/api/cv-template";
import {
  CVTemplateStaff,
  GetCVTemplateForStaff,
} from "package/api/cv-template/for-staff";
import { useEffect, useState } from "react";
import { StaffToken } from "./use-login";

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

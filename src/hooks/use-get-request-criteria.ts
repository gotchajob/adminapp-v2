import {
  GetRegisterCriteria,
  RegisterCriteria,
  RegisterCriteriaRequest,
} from "package/api/expert-register-request/id/criteria";
import { useEffect, useState } from "react";

export const useGetRegisterCriteria = (params: RegisterCriteriaRequest) => {
  const [registerCriteria, setRegisterCriteria] = useState<RegisterCriteria[]>(
    []
  );

  const getRegisterCriteria = async () => {
    try {
      const data = await GetRegisterCriteria(params);
      setRegisterCriteria(data.data);
    } catch {}
  };
  useEffect(() => {
    getRegisterCriteria();
  }, [params.requestId]);

  return {
    registerCriteria,
  };
};

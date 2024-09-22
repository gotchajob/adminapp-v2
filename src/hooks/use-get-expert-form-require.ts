import {
  ExpertFormRequire,
  ExpertFormRequireRequest,
  GetExpertFormRequire,
} from "package/api/expert-form-require";
import { useEffect, useState } from "react";

export const useGetExpertFormRequire = (params: ExpertFormRequireRequest, refresh: number) => {
  const [expertFormRequire, setExpertFormRequire] = useState<
    ExpertFormRequire[]
  >([]);
  const handleGetExpertFormRequire = async () => {
    try {
      const data = await GetExpertFormRequire(params);
      setExpertFormRequire(data.data);
    } catch (error) {

    }
  };
  useEffect(() => {
    handleGetExpertFormRequire();
  }, [refresh]);

  return {
    expertFormRequire
  }
};

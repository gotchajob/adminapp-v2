import { Expert } from "package/api/expert";
import {
  ExpertNation,
  GetExpertNation,
  GetExpertNationSupportRequest,
} from "package/api/expert-nation-support";
import {
  ExpertSkillOption,
  ExpertSkillOptionRq,
  GetExpertSkillOption,
} from "package/api/expert-skill-option";
import { GetExpert, GetExpertRequest } from "package/api/expert/id";
import { useEffect, useState } from "react";

export function useGetExpertProfile(params: GetExpertRequest, refresh: any) {
  const [loading, setLoading] = useState<boolean>(true);

  const [expert, setExpert] = useState<Expert | undefined>(undefined);

  const fetchExpertProfile = async () => {
    try {
      setLoading(true);
      const data = await GetExpert(params, "");
      if (data.status == "error") {
        throw new Error();
      }
      setExpert(data.data);
      setLoading(false);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertProfile();
  }, [refresh]);

  return {
    expert,
    loading,
  };
}

export function useGetExpertSkillOption(params: ExpertSkillOptionRq) {
  const [skillOptions, setSkillOptions] = useState<
    ExpertSkillOption[] | undefined
  >(undefined);

  const fetchExpertProfile = async () => {
    try {
      const data = await GetExpertSkillOption(params, "");
      if (data.status == "error") {
        throw new Error();
      }
      setSkillOptions(data.data);
    } catch (error: any) {
    } finally {
    }
  };

  useEffect(() => {
    fetchExpertProfile();
  }, []);

  return {
    skillOptions,
  };
}

export function useGetExpertNatonSupport(
  params: GetExpertNationSupportRequest
) {
  const [nation, setNation] = useState<ExpertNation[]>([]);

  const fetchExpertProfile = async () => {
    try {
      const data = await GetExpertNation(params, "");
      if (data.status == "error") {
        throw new Error();
      }
      setNation(data.data);
    } catch (error: any) {
    } finally {
    }
  };

  useEffect(() => {
    fetchExpertProfile();
  }, []);

  return {
    nation,
  };
}


import { ExpertNation, GetExpertNation, GetExpertNationSupportRequest } from 'package/api/expert-nation-support';
import { ExpertSkillOption, ExpertSkillOptionRq, GetExpertSkillOption } from 'package/api/expert-skill-option';
import { GetExpertCurrent } from 'package/api/expert/current';
import { Expert, GetExpert, GetExpertRequest } from 'package/api/expert/id';
import { useEffect, useState } from 'react';


export function useGetExpertProfile(params: GetExpertRequest, refresh: any) {
  const [loading, setLoading] = useState<boolean>(true);

  const [expert, setExpert] = useState<Expert | undefined>(undefined);

  const fetchExpertProfile = async () => {
    try {
      setLoading(true);

      const data = await GetExpert(params);
      if (data.status == "error") {
        throw new Error();
      }
      setExpert(data.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertProfile();
  }, [refresh, params]);

  return {
    expert,
    loading,
  };
}

export function useGetExpertCurrent(params: string, refresh: any) {
  const [loading, setLoading] = useState<boolean>(true);

  const [expertCurrent, setExpertCurrent] = useState<Expert | undefined>(undefined);

  const fetchExpertCurrent = async () => {
    try {
      setLoading(true);
      const data = await GetExpertCurrent(params);
      if (data.status == 'error') {
        throw new Error();
      }
      setExpertCurrent(data.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpertCurrent();
  }, [refresh, params]);

  return {
    expertCurrent,
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
  }, [params]);

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
      const data = await GetExpertNation(params);
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
  }, [params.expertId]);

  return {
    nation,
  };
}

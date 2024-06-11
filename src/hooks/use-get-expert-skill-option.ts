import { ExpertSkillOption, ExpertSkillOptionRq, GetExpertSkillOption } from 'package/api/expert-skill-option';
import { useEffect, useState } from 'react';

export const useGetExpertSkillOptions = (params: ExpertSkillOptionRq) => {
  const [experSkillOptions, setExpertSkillOptions] = useState<ExpertSkillOption[]>([]);

  const getExpertSkillOptions = async () => {
    const data = await GetExpertSkillOption(params, '');
    setExpertSkillOptions(data.data);
  };

  useEffect(() => {
    getExpertSkillOptions();
  }, []);

  return {
    experSkillOptions
  };
};

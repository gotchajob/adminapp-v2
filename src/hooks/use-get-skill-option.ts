import { GetSkillOption, SkillOption } from 'package/api/skill-option';
import { useEffect, useState } from 'react';

export const useGetSkillOptions = (params: {}) => {
  const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);

  const getClientSkillOptions = async () => {
    const data = await GetSkillOption({});
    setSkillOptions(data.data);
  };

  useEffect(() => {
    getClientSkillOptions();
  }, []);

  return {
    skillOptions
  };
};

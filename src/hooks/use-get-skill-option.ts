import { GetSkillOption, SkillOption } from 'package/api/skill-option';
import { useEffect, useState } from 'react';

export const useGetSkillOptions = (refresh: number) => {
  const [skillOptions, setSkillOptions] = useState<SkillOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getClientSkillOptions = async () => {
    try {
      setLoading(true);
      const data = await GetSkillOption({});
      if (data.status !== 'success') {
        throw new Error(data.responseText);
      }
      setSkillOptions(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientSkillOptions();
  }, [refresh]);

  return {
    skillOptions, loading
  };
};

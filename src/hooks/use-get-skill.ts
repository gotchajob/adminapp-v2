import { GetSkill, Skill } from 'package/api/skill';
import { useEffect, useState } from 'react';

export const useGetSkill = (refresh: number) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getClientSkills = async () => {
    try {
      setLoading(true);
      const data = await GetSkill();
      if (data.status !== 'success') {
        throw new Error(data.responseText);
      }
      setSkills(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getClientSkills();
  }, [refresh]);

  return {
    skills, loading
  };
};

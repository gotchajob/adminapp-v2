import { GetSkill, Skill } from 'package/api/skill';
import { useEffect, useState } from 'react';

export const useGetSkill = (params: {}) => {
  const [skills, setSkills] = useState<Skill[]>([]);

  const getClientSkills = async () => {
    const data = await GetSkill({});
    setSkills(data.data);
  };

  useEffect(() => {
    getClientSkills();
  }, []);

  return {
    skills
  };
};

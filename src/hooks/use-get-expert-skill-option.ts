import { Category } from "package/api/category";
import {
  ExpertSkillOption,
  ExpertSkillOptionRq,
  GetExpertSkillOption,
} from "package/api/expert-skill-option";
import { Skill } from "package/api/skill";
import { SkillOption } from "package/api/skill-option";
import { useEffect, useState } from "react";

export const useGetExpertSkillOptions = (
  params: { expertId?: number },
  categories?: Category[],
  skills?: Skill[],
  skillOptions?: SkillOption[]
) => {
  const [expertSkillOptions, setExpertSkillOptions] = useState<
    ExpertSkillOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const getExpertSkillOptions = async () => {
    if (params.expertId) {
      try {
        setIsLoading(true);
        const data = await GetExpertSkillOption(params as ExpertSkillOptionRq, "");
        setExpertSkillOptions(data.data);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getMoreData = () => {
    if (categories && skills && skillOptions) {
      let newSkillOptionList: SkillOption[] = [];
      let newSkillList: Skill[] = [];
      let newCategoryList: Category[] = [];

      newSkillOptionList = skillOptions.filter((skillOption) => {
        return expertSkillOptions.find(
          (expertSkillOption) =>
            expertSkillOption.skillOptionId === skillOption.id
        );
      });

      newSkillList = skills.filter((skill) => {
        return newSkillOptionList.find(
          (skillOption) => skillOption.skillId === skill.id
        );
      });

      newCategoryList = categories.filter((category) => {
        return newSkillList.find((skill) => skill.categoryId === category.id);
      });
      return {
        newCategoryList,
        newSkillList,
        newSkillOptionList,
      };
    }
  };
  useEffect(() => {
    getExpertSkillOptions();
  }, [params.expertId, categories, skills, skillOptions]);

  return {
    isLoading,
    expertSkillOptions,
    ...getMoreData(),
  };
};

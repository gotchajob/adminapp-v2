'use client';

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useGetCategories } from 'hooks/use-get-category';
import { useGetSkill } from 'hooks/use-get-skill';
import { useGetSkillOptions } from 'hooks/use-get-skill-option';
import { Category } from 'package/api/category';
import { Skill } from 'package/api/skill';
import { SkillOption } from 'package/api/skill-option';
import { useEffect, useState } from 'react';
import { gridSpacing } from 'store/constant';
import Autocomplete from '@mui/material/Autocomplete';
import { ExpertSkillOption } from 'package/api/expert-skill-option';
import { useGetExpertSkillOptions } from 'hooks/use-get-expert-skill-option';
import { useRefresh } from 'hooks/use-refresh';

export const ReadSkillForm = ({ expertId }: { expertId: number }) => {
  const { categories } = useGetCategories({});
  const { skills } = useGetSkill({});
  const { skillOptions } = useGetSkillOptions({});

  const [addingCategories, setAddingCategories] = useState<Category[]>([]);
  const [addingSkills, setAddingSkills] = useState<Skill[]>([]);
  const [addingSkillOptions, setAddingSkillOptions] = useState<SkillOption[]>([]);

  const filterSkillByCategory = (skills: Skill[], categoryId: number) => {
    return skills.filter((value) => value.categoryId === categoryId);
  };

  const filterSkillOptionBySkill = (skillOptions: SkillOption[], skillId: number) => {
    return skillOptions.filter((value) => value.skillId === skillId);
  };
  
  const { expertSkillOptions, newCategoryList, newSkillList, newSkillOptionList, isLoading } = useGetExpertSkillOptions(
    { expertId },
    categories,
    skills,
    skillOptions
  );

  useEffect(() => {
    setAddingCategories(newCategoryList || []);
    setAddingSkills(newSkillList || []);
    setAddingSkillOptions(newSkillOptionList || []);
  }, [isLoading, expertId]);
  return (
    <Grid container alignItems="center" spacing={gridSpacing}>
      {addingCategories.map((category, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <TextField size="small" fullWidth label="Ngành nghề" value={category.name} />
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={3}>
                  {filterSkillByCategory(addingSkills, category.id).map((skill, index) => {
                    return (
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <TextField size="small" fullWidth label="Kĩ năng" value={skill.name}></TextField>
                          </Grid>
                          <Grid item xs={8}>
                            <Autocomplete
                              size="small"
                              multiple
                              sx={{ '.MuiInputBase-root': { height: 40 } }}
                              disabled={true}
                              options={skillOptions}
                              getOptionLabel={(option) => option.name}
                              filterSelectedOptions
                              renderInput={(params) => <TextField {...params} label="Chọn kĩ năng" />}
                              defaultValue={filterSkillOptionBySkill(addingSkillOptions, skill.id)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};

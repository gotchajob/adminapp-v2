'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Iconify from 'components/iconify/iconify';
import { useGetCategories } from 'hooks/use-get-category';
import { useGetSkill } from 'hooks/use-get-skill';
import { useGetSkillOptions } from 'hooks/use-get-skill-option';
import { Category } from 'package/api/category';
import { Skill } from 'package/api/skill';
import { SkillOption } from 'package/api/skill-option';
import { ExpertSkillOption } from 'package/api/user/create-expert-account';
import { useEffect, useMemo, useState } from 'react';
import { gridSpacing } from 'store/constant';
import { Text } from 'views/forms/input/text/text';
import { number } from 'yup';

export interface SkillOptionComponent extends SkillOption {
  certificate: string;
}
export const SkillForm = ({ setExpertSkillOptionList }: { setExpertSkillOptionList: (value: ExpertSkillOption[]) => void }) => {
  const { categories } = useGetCategories({});
  const { skills } = useGetSkill({});
  const { skillOptions } = useGetSkillOptions({});

  const [addingCategories, setAddingCategories] = useState<Category[]>([]);
  const [addingSkills, setAddingSkills] = useState<Skill[]>([]);
  const [addingSkillOptions, setAddingSkillOptions] = useState<SkillOptionComponent[]>([]);

  const [isUpdate, setIsUpdate] = useState(0);
  useEffect(() => {
    const data: ExpertSkillOption[] = [];
    addingSkillOptions.forEach((value) => data.push({ certificate: value.certificate, skillOptionId: value.id }));
    setExpertSkillOptionList(data);
  }, [isUpdate]);

  const getNotIncludedCategories = () => {
    let array: Category[] = [];
    categories.forEach((category) => {
      if (addingCategories.find((value) => value.id === category.id)) {
      } else {
        array.push(category);
      }
    });
    return array;
  };

  const getNotIncludedSkills = () => {
    let array: Skill[] = [];
    skills.forEach((skill) => {
      if (addingSkills.find((value) => value.id === skill.id)) {
      } else {
        array.push(skill);
      }
    });
    return array;
  };

  const getNotIncludedSkillOptions = () => {
    let array: SkillOption[] = [];
    skillOptions.forEach((skillOption) => {
      if (addingSkillOptions.find((value) => value.id === skillOption.id)) {
      } else {
        array.push(skillOption);
      }
    });
    return array;
  };

  const filterSkillByCategory = (skills: Skill[], categoryId: number) => {
    return skills.filter((value) => value.categoryId === categoryId);
  };

  const filterSkillOptionBySkill = (skillOptions: SkillOption[], skillId: number) => {
    return skillOptions.filter((value) => value.skillId === skillId);
  };

  const handleAddingCategory = (category: Category) => {
    if (category) {
      setAddingCategories([...addingCategories, category]);
    }
    setIsUpdate(isUpdate + 1);
  };

  const handleUpdateCategory = (category: Category, index: number) => {
    if (category) {
      const newAddingCategories = addingCategories;
      newAddingCategories[index] = category;
      setAddingCategories(newAddingCategories);
    }
    setIsUpdate(isUpdate + 1);
  };

  const handleAddingSkill = (skill: Skill) => {
    if (skill) {
      setAddingSkills([...addingSkills, skill]);
    }
    setIsUpdate(isUpdate + 1);
  };

  const handleUpdateSkill = (skill: Skill, index: number) => {
    if (skill) {
      const newAddingSkills = addingSkills;
      newAddingSkills[index] = skill;
      setAddingSkills(newAddingSkills);
    }
    setIsUpdate(isUpdate + 1);
  };

  const handleAddingSkillOption = (skillOption: SkillOptionComponent) => {
    if (skillOption) {
      setAddingSkillOptions([...addingSkillOptions, skillOption]);
    }
    setIsUpdate(isUpdate + 1);
  };

  const handleUpdateSkillOption = (skillOption: SkillOptionComponent, index: number) => {
    if (skillOption) {
      const newAddingSkillOptions = addingSkillOptions;
      newAddingSkillOptions[index] = skillOption;
      setAddingSkillOptions(newAddingSkillOptions);
    }
    setIsUpdate(isUpdate + 1);
  };

  return (
    <Grid container alignItems="center" spacing={gridSpacing}>
      {addingCategories.map((category, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Grid container spacing={3}>
              <Grid item xs={2.5}>
                <CategoryInput categories={categories} handleUpdateCategory={handleUpdateCategory} defaultValue={category} index={index} />
              </Grid>
              <Grid item xs={9.5}>
                <Grid container spacing={3}>
                  {filterSkillByCategory(addingSkills, category.id).map((skill, index) => {
                    const skillOptionsSelect = filterSkillOptionBySkill(skillOptions, skill.id);
                    return (
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={3}>
                            <SkillInput
                              defaultValue={skill}
                              handleUpdateSkill={handleUpdateSkill}
                              index={index}
                              skills={filterSkillByCategory(skills, category.id)}
                              key={skill.id}
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <Grid container spacing={3}>
                              {filterSkillOptionBySkill(addingSkillOptions, skill.id).map((skillOption, index) => (
                                <Grid item xs={12} key={index}>
                                  <SkillOptionInput
                                    handleUpdateSkillOption={handleUpdateSkillOption}
                                    index={index}
                                    skillOptions={skillOptionsSelect}
                                    defaultValue={skillOption as SkillOptionComponent}
                                  />
                                </Grid>
                              ))}
                              <Grid item xs={3}>
                                <Button
                                  fullWidth
                                  variant="outlined"
                                  onClick={(e) => {
                                    handleAddingSkillOption({
                                      ...filterSkillOptionBySkill(getNotIncludedSkillOptions(), skill.id)[0],
                                      certificate: ''
                                    });
                                  }}
                                >
                                  Thêm
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                  <Grid item xs={2.5}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={(e) => {
                        handleAddingSkill(getNotIncludedSkills()[0]);
                      }}
                    >
                      Thêm kĩ năng
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
      <Grid item xs={2.5}>
        <Button
          fullWidth
          variant="outlined"
          onClick={(e) => {
            handleAddingCategory(getNotIncludedCategories()[0]);
          }}
        >
          Thêm ngành nghề
        </Button>
      </Grid>
    </Grid>
  );
};

const CategoryInput = ({
  categories,
  handleUpdateCategory,
  defaultValue,
  index,
  readonly = false
}: {
  categories: Category[];
  index: number;
  readonly?: boolean;
  defaultValue: Category;
  handleUpdateCategory: (category: Category, index: number) => void;
}) => {
  return (
    <TextField size="small" select fullWidth label="Ngành nghề" disabled={readonly} value={defaultValue.id}>
      {categories?.map((option) => (
        <MenuItem
          key={option.id}
          value={option.id}
          onClick={() => {
            handleUpdateCategory(option, index);
          }}
        >
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

const SkillInput = ({
  skills,
  handleUpdateSkill,
  defaultValue,
  index,
  readonly = false
}: {
  skills: Skill[];
  index: number;
  readonly?: boolean;
  defaultValue: Skill;
  handleUpdateSkill: (skill: Skill, index: number) => void;
}) => {
  return (
    <TextField size="small" select fullWidth label="Kĩ năng" disabled={readonly} value={defaultValue.id}>
      {skills?.map((option) => (
        <MenuItem
          key={option.id}
          value={option.id}
          onClick={() => {
            handleUpdateSkill(option, index);
          }}
        >
          {option.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

const SkillOptionInput = ({
  skillOptions,
  readonly = false,
  defaultValue,
  index,
  handleUpdateSkillOption
}: {
  skillOptions: SkillOption[];
  index: number;
  readonly?: boolean;
  defaultValue: SkillOptionComponent;
  handleUpdateSkillOption: (skillOption: SkillOptionComponent, index: number) => void;
}) => {
  const handleUpdateOption = (skillOption: SkillOption) => {
    handleUpdateSkillOption({ ...skillOption, certificate: defaultValue.certificate }, index);
  };
  const handleUpdateCertificate = (certificate: string) => {
    handleUpdateSkillOption({ ...defaultValue, certificate }, index);
  };
  return (
    <Grid container>
      <Grid item xs={4}>
        <TextField size="small" select fullWidth label="" disabled={readonly} value={defaultValue.id}>
          {skillOptions?.map((option) => (
            <MenuItem
              key={option.id}
              value={option.id}
              onClick={(e) => {
                handleUpdateOption(option);
              }}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={0.5} justifyContent={'center'} alignItems={'center'} display={'flex'}>
        <Text fontWeight={'bold'}>:</Text>
      </Grid>
      <Grid item xs={7.5}>
        <TextField size="small" fullWidth value={defaultValue.certificate} onChange={(e) => handleUpdateCertificate(e.target.value)} />
      </Grid>
    </Grid>
  );
};

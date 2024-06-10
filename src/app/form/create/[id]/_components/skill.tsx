'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
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
import ClearIcon from '@mui/icons-material/Clear';
import Autocomplete from '@mui/material/Autocomplete';

export const SkillForm = ({ setExpertSkillOptionList }: { setExpertSkillOptionList: (value: ExpertSkillOption[]) => void }) => {
  const { categories } = useGetCategories({});
  const { skills } = useGetSkill({});
  const { skillOptions } = useGetSkillOptions({});

  const [addingCategories, setAddingCategories] = useState<Category[]>([]);
  const [addingSkills, setAddingSkills] = useState<Skill[]>([]);
  const [addingSkillOptions, setAddingSkillOptions] = useState<SkillOption[]>([]);

  const [isUpdate, setIsUpdate] = useState(0);
  useEffect(() => {
    const data: ExpertSkillOption[] = [];
    addingSkillOptions.forEach((value) => data.push({ certificate: '', skillOptionId: value.id }));
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

  const handleUpdateCategory = (oldCategory?: Category, newCategory?: Category) => {
    let newAddingCategories = addingCategories;
    let newAddingSkills: Skill[] = [];
    let newAddingSkillOptions: SkillOption[] = [];
    if (oldCategory && newCategory && oldCategory.id === newCategory.id) {
      return;
    }
    if (newCategory && newAddingCategories.find((category) => category.id === newCategory.id)) {
      return;
    }
    if (oldCategory) {
      addingSkills
        .filter((skill) => skill.categoryId == oldCategory.id)
        .forEach((skill) => {
          addingSkillOptions
            .filter((skillOption) => skillOption.skillId !== skill.id)
            .forEach((skillOption) => newAddingSkillOptions.push({ ...skillOption }));
        });
      addingSkills
        .filter((skill) => skill.categoryId !== oldCategory.id)
        .forEach((skill) => {
          newAddingSkills.push(skill);
        });

      newAddingCategories = newAddingCategories.filter((category) => category.id !== oldCategory.id);
    }

    if (newCategory) {
      newAddingCategories.push(newCategory);
    }
    setAddingCategories(newAddingCategories);
    setAddingSkills(newAddingSkills);
    setAddingSkillOptions(newAddingSkillOptions);
    setIsUpdate(isUpdate + 1);
  };

  const handleAddingSkill = (skill: Skill) => {
    if (skill) {
      setAddingSkills([...addingSkills, skill]);
    }
    setIsUpdate(isUpdate + 1);
  };

  const handleUpdateSkill = (oldSkill?: Skill, newSkill?: Skill) => {
    let newAddingSkills: Skill[] = addingSkills;
    let newAddingSkillOptions: SkillOption[] = [];
    if (oldSkill && newSkill && oldSkill.id === newSkill.id) {
      return;
    }
    if (newSkill && newAddingSkills.find((skill) => skill.id === newSkill.id)) {
      return;
    }
    if (oldSkill) {
      addingSkillOptions
        .filter((skillOptions) => skillOptions.skillId !== oldSkill.id)
        .forEach((skillOptions) => newAddingSkillOptions.push(skillOptions));
      newAddingSkills = newAddingSkills.filter((skill) => skill.id !== oldSkill.id);
    }
    if (newSkill) {
      newAddingSkills.push(newSkill);
    }
    setAddingSkills(newAddingSkills);
    setAddingSkillOptions(newAddingSkillOptions);
    setIsUpdate(isUpdate + 1);
  };

  const handleUpdateSkillOption = (skillOptionList: SkillOption[]) => {
    let newAddingSkillOptions = addingSkillOptions;
    if (skillOptionList.length > 1) {
      newAddingSkillOptions = newAddingSkillOptions.filter((skillOption) => skillOption.skillId !== skillOptionList[0].id);
      newAddingSkillOptions = [...newAddingSkillOptions, ...skillOptionList];
    }
    setAddingSkillOptions(newAddingSkillOptions);
    setIsUpdate(isUpdate + 1);
  };

  return (
    <Grid container alignItems="center" spacing={gridSpacing}>
      {addingCategories.map((category, index) => {
        return (
          <Grid item xs={12} key={index}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <CategoryInput categories={categories} handleUpdateCategory={handleUpdateCategory} defaultValue={category} />
              </Grid>
              <Grid item xs={9}>
                <Grid container spacing={3}>
                  {filterSkillByCategory(addingSkills, category.id).map((skill, index) => {
                    const skillOptionsSelect = filterSkillOptionBySkill(skillOptions, skill.id);
                    return (
                      <Grid item xs={12} key={index}>
                        <Grid container spacing={3}>
                          <Grid item xs={4}>
                            <SkillInput
                              defaultValue={skill}
                              handleUpdateSkill={handleUpdateSkill}
                              skills={filterSkillByCategory(skills, category.id)}
                              key={skill.id}
                            />
                          </Grid>
                          <Grid item xs={8}>
                            <SkillOptionInput
                              handleUpdateSkillOption={handleUpdateSkillOption}
                              skillOptions={skillOptionsSelect}
                              defaultValue={filterSkillOptionBySkill(addingSkillOptions, skill.id)}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  })}
                  <Grid item xs={3}>
                    <Button
                      fullWidth
                      size="small"
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
          size="small"
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
  readonly = false
}: {
  categories: Category[];
  readonly?: boolean;
  defaultValue: Category;
  handleUpdateCategory: (oldCategory?: Category, newCategory?: Category) => void;
}) => {
  return (
    <Box position={'relative'}>
      <ClearIcon
        onClick={() => {
          handleUpdateCategory(defaultValue);
        }}
        fontSize={'small'}
        color="error"
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: -8,
          right: -8,
          bgcolor: 'white',
          ':hover': { color: '#fd0100', boxShadow: '0px 1px 1px gray' },
          cursor: 'pointer',
          borderRadius: 10
        }}
      />
      <TextField size="small" select fullWidth label="Ngành nghề" disabled={readonly} value={defaultValue.id}>
        {categories?.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={() => {
              handleUpdateCategory(defaultValue, option);
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

const SkillInput = ({
  skills,
  handleUpdateSkill,
  defaultValue,
  readonly = false
}: {
  skills: Skill[];
  readonly?: boolean;
  defaultValue: Skill;
  handleUpdateSkill: (oldSkill?: Skill, newSkill?: Skill) => void;
}) => {
  return (
    <Box position={'relative'}>
      <ClearIcon
        fontSize={'small'}
        onClick={() => {
          handleUpdateSkill(defaultValue);
        }}
        color="error"
        sx={{
          position: 'absolute',
          zIndex: 1,
          top: -8,
          right: -8,
          bgcolor: 'white',
          ':hover': { color: '#fd0100', boxShadow: '0px 1px 1px gray' },
          cursor: 'pointer',
          borderRadius: 10
        }}
      />
      <TextField size="small" select fullWidth label="Kĩ năng" disabled={readonly} value={defaultValue.id}>
        {skills?.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={() => {
              handleUpdateSkill(defaultValue, option);
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

const SkillOptionInput = ({
  skillOptions,
  readonly = false,
  defaultValue,
  handleUpdateSkillOption
}: {
  skillOptions: SkillOption[];
  readonly?: boolean;
  defaultValue: SkillOption[];
  handleUpdateSkillOption: (skillOptionList: SkillOption[]) => void;
}) => {
  return (
    <Autocomplete
      size="small"
      multiple
      sx={{ '.MuiInputBase-root': { height: 40 } }}
      options={skillOptions}
      getOptionLabel={(option) => option.name}
      filterSelectedOptions
      renderInput={(params) => <TextField {...params} label="Chọn kĩ năng" />}
      defaultValue={defaultValue}
      onChange={(e, v) => {
        handleUpdateSkillOption(v);
      }}
    />
  );
};

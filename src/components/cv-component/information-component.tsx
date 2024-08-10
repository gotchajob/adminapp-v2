import Box from '@mui/material/Box';
import { CVComponent, PersonalComponent } from './interface';
import Typography from '@mui/material/Typography';
import Iconify from 'components/iconify/iconify';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { EnchantInput } from 'components/common/enchant-input';
import { useEffect, useState } from 'react';
import { CVTemplate } from 'components/cv-component/interface';
import { ContactlessOutlined } from '@mui/icons-material';
import { FlexBox } from 'components/common/box/flex-box';

export const InformationComponent = ({
  component,
  information,
  onChangeComponent,
  primaryColor
}: {
  primaryColor: string;
  component: CVComponent;
  information: PersonalComponent[];
  onChangeComponent: (newCVPersonalComponent: PersonalComponent[], newCVComponent: CVComponent) => void;
}) => {
  const handleChangeHeader = (newHeader: any) => {
    console.log(newHeader.target)
    const newCVComponent = { ...component };
    newCVComponent.header = newHeader;
    onChangeComponent(information, newCVComponent);
  };

  const handleChangePersonalComponent = (newPersonalInformation: string, index: number) => {
    const newCVPersonalComponent = information;
    newCVPersonalComponent[index].title = newPersonalInformation;
    onChangeComponent(newCVPersonalComponent, component);
  };

  return (
    <Stack direction={'column'}>
      <EnchantInput initValue={component.header} onChange={handleChangeHeader} />
      <Box borderBottom={`2px solid ${primaryColor}`}/>
      {information.map((e, index) => (
        <FlexBox
          key={index}
          sx={{
            ' p': {
              my: 1.5
            }
          }}
        >
          <Iconify icon={e.icon} width={20} color={primaryColor} />
          <Box pl={1}>
            <EnchantInput initValue={e.title} onChange={(value: string) => handleChangePersonalComponent(value, index)} />
          </Box>
        </FlexBox>
      ))}
    </Stack>
  );
};

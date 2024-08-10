import Box from '@mui/material/Box';
import { CVComponent } from './interface';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { EnchantInput } from 'components/common/enchant-input';

export const HeaderComponent = ({
  component,
  onChangeComponent,
  primaryColor
}: {
  component: CVComponent;
  onChangeComponent: (newCVComponent: CVComponent) => void;
  primaryColor: string

}) => {
  const handleChangeDescription = (newDescription: string) => {
    const newCVComponent = { ...component };
    newCVComponent.description = newDescription;
    onChangeComponent(newCVComponent);
  };

  const handleChangeHeader = (newHeader: string) => {
    console.log(newHeader)
    const newCVComponent = { ...component };
    newCVComponent.header = newHeader;
    onChangeComponent(newCVComponent);
  };

  return (
    <Stack direction={'column'}>
      <EnchantInput initValue={component.header} onChange={handleChangeHeader} />
      <Box borderBottom={`2px solid ${primaryColor}`}/>
      <Box mt={'0px !important'}>
        <EnchantInput initValue={component.description} onChange={handleChangeDescription} />
      </Box>
    </Stack>
  );
};

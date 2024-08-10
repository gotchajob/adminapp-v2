import Box from '@mui/material/Box';
import { CVComponent } from './interface';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { EnchantInput } from 'components/common/enchant-input';

export const DefaultComponent = ({
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


  return (
    <Stack direction={'column'}>
      <Box mt={'0px !important'}>
        <EnchantInput initValue={component.description} onChange={handleChangeDescription} />
      </Box>
    </Stack>
  );
};

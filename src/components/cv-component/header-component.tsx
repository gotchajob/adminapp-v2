import Box from '@mui/material/Box';
import { CVComponent } from './interface';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { EnchantInput } from 'components/common/enchant-input';

export const HeaderComponent = ({
  component,
  onChangeComponent
}: {
  component: CVComponent;
  onChangeComponent: (newCVComponent: CVComponent) => void;
}) => {
  const handleChangeDescription = (newDescription: string) => {
    const newCVComponent = { ...component };
    newCVComponent.description = newDescription;
    onChangeComponent(newCVComponent);
  };

  const handleChangeHeader = (newHeader: string) => {
    const newCVComponent = { ...component };
    newCVComponent.header = newHeader;
    onChangeComponent(newCVComponent);
  };

  return (
    <Stack direction={'column'}>
      <EnchantInput initValue={component.header} onBlur={handleChangeHeader} />
      <Divider />
      <Box mt={'0px !important'}>
        <EnchantInput initValue={component.description} onBlur={handleChangeDescription} />
      </Box>
    </Stack>
  );
};

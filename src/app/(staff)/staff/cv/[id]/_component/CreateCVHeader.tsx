'use client';

import ImageIcon from '@mui/icons-material/Image';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import RedoIcon from '@mui/icons-material/Redo';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveIcon from '@mui/icons-material/Save';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import UndoIcon from '@mui/icons-material/Undo';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FlexBetween, FlexBox } from 'components/common/box/flex-box';
import { StyledLink } from 'components/common/link/styled-link';
import { CVTemplate } from 'components/cv-component/interface';
import IconButton from '@mui/material/IconButton';
import { PRIMARYCOLOR } from 'components/common/config';

const CreateCVHeader = ({
  cv,
  onChangeCV,
  download,
  review,
  saveCV
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
  download: () => void;
  review: () => void;
  saveCV: () => void;
}) => {
  const handleSaveAndDowload = () => {
    if (download) {
      download();
    }
  };

  const handleReview = () => {
    review();
  };

  const handleSave = () => {
    saveCV();
  };
  const handleChangeName = (event: any) => {
    const newCV = { ...cv };
    newCV.name = event.target.value;
    onChangeCV(newCV);
  };
  return (
    <FlexBetween>
      <TextField placeholder="CV chưa đặt tên" value={cv.name} onChange={handleChangeName} />
      <Stack flexDirection={'row'}>
        <IconButton>
          <UndoIcon sx={{ color: PRIMARYCOLOR }} />
        </IconButton>
        <IconButton>
          <RedoIcon sx={{ color: PRIMARYCOLOR }} />
        </IconButton>
      </Stack>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          onClick={handleReview}
          sx={{
            paddingX: '10px',
            backgroundColor: '#59ABD9',
            '&:hover': {
              backgroundColor: '#1976D2'
            },
            color: 'white'
          }}
        >
          <RemoveRedEyeIcon sx={{ fontSize: 35, pr: '5px' }} />
          Xem trước
        </Button>
        <Button
          variant="contained"
          onClick={handleSaveAndDowload}
          sx={{
            paddingX: '10px',
            backgroundColor: '#59ABD9',
            '&:hover': {
              backgroundColor: '#1976D2'
            },
            color: 'white'
          }}
        >
          <SaveAltIcon sx={{ fontSize: 35, pr: '5px' }} />
          Lưu và tải xuống
        </Button>
        <Button
          variant="contained"
          sx={{
            paddingX: '10px',
            backgroundColor: '#1976D2',
            color: 'white'
          }}
          onClick={handleSave}
        >
          <SaveIcon sx={{ fontSize: 35, pr: '5px' }} />
          Lưu lại
        </Button>
      </Stack>
    </FlexBetween>
  );
};

export default CreateCVHeader;

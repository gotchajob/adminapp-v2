import Box from '@mui/material/Box';
import { UploadImageButton } from 'components/common/button/upload-button';
import Image from 'next/image';

export const CVUploadImage = ({
  column = 4,
  avatar,
  handleChangeAvatar
}: {
  column?: number;
  avatar: string;
  handleChangeAvatar: (value: string) => void;
}) => {
  const columnWidth = ((900 - 16) / 12) * column;
  const imageWidth = (columnWidth / 4) * 2;
  const imageHeight = (columnWidth / 4) * 2.2;
  return (
    <Box justifyContent={'center'} alignItems={'center'} display={'flex'} py={5} position={'relative'}>
      <UploadImageButton setImage={handleChangeAvatar} />
      <Image
        src={avatar}
        alt="avatar"
        width={imageWidth}
        height={imageHeight}
        style={{
          position: 'absolute',
          zIndex: 1,
          border: '1px solid black',
          borderRadius: 20,
          borderColor: '#2188ff',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
      />
    </Box>
  );
};

import Box from '@mui/material/Box';
import Image from 'next/image';

export const CVUploadImage = ({ column = 4 }: { column?: number }) => {
  const columnWidth = ((900 - 16) / 12) * column;
  const imageWidth = (columnWidth / 4) * 2;
  const imageHeight = (columnWidth / 4) * 2.2;
  return (
    <Box justifyContent={'center'} alignItems={'center'} display={'flex'} py={2}>
      <Image
        src={'https://app.resumecoach.com/editor/images/loader/stepDefault-dIIv.svg'}
        alt="avatar"
        width={imageWidth}
        height={imageHeight}
        style={{ border: '1px solid black', borderRadius: 20, borderColor: '#2188ff', objectFit: 'cover', objectPosition: 'center' }}
      />
    </Box>
  );
};

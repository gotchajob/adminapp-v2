'use client';

import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ReactDraftWysiwyg from 'components/forms/plugins/Wysiwug/ReactDraftWysiwyg';
import ReactQuillDemo from 'components/forms/plugins/Wysiwug/ReactQuill';
import { ExpertToken } from 'hooks/use-login';
import dynamic from 'next/dynamic';
import { enqueueSnackbar } from 'notistack';
import { ExpertCurrent } from 'package/api/expert/current';
import { PatchExpertUpdateCost } from 'package/api/expert/current/update-cost';
import { PatchExpertUpdateDescription } from 'package/api/expert/update-description';
import { useEffect, useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| PROFILE 1 - MY ACCOUNT ||============================== //

const ReactDraftWysiwyg_2 = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const MyAccount = ({ expert }: { expert?: ExpertCurrent }) => {
  const { expertToken } = ExpertToken();
  const [content, setContent] = useState('<p></p>');
  const [newPrice, setNewPrice] = useState(expert?.cost || 0);
  const [updatingService, setUpdatingService] = useState(false);
  const [updatingCost, setUpdatingCost] = useState(false);

  useEffect(() => {
    console.log("expert", expert);
    if (expert) {
      setContent(expert.shortDescription || "<p></p>");
    }
  }, [expert, expert?.shortDescription]);

  const handleUpdateDescription = async () => {
    setUpdatingService(true);
    try {
      const res = await PatchExpertUpdateDescription({ shortDescription: content }, expertToken);
      if (res.status === 'success') {
        enqueueSnackbar('Cập nhật mô tả thành công!', { variant: 'success' });
      } else {
        enqueueSnackbar('Có lỗi xảy ra khi cập nhật mô tả.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Lỗi hệ thống khi cập nhật mô tả.', { variant: 'error' });
    } finally {
      setUpdatingService(false);
    }
  };

  const handleUpdatePrice = async () => {
    setUpdatingCost(true);
    try {
      const res = await PatchExpertUpdateCost({ cost: newPrice }, expertToken);
      if (res.status === 'success') {
        enqueueSnackbar('Cập nhật giá thành công!', { variant: 'success' });
      } else {
        enqueueSnackbar('Có lỗi xảy ra khi cập nhật giá.', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Lỗi hệ thống khi cập nhật giá.', { variant: 'error' });
    } finally {
      setUpdatingCost(false);
    }
  };

  return (
    <Grid container spacing={2}>
      {/* Cập nhật mô tả dịch vụ */}
      <Grid item xs={12}>
        <SubCard title="Mô tả dịch vụ">
          <ReactQuillDemo data={content} setData={setContent} />
          {/* <ReactDraftWysiwyg data={content} setData={setContent} /> */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <AnimateButton>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateDescription}
                disabled={updatingService}
              >
                {updatingService ? <CircularProgress size={20} sx={{ mr: 1 }} /> : 'Cập nhật'}
              </Button>
            </AnimateButton>
          </Box>
        </SubCard>
      </Grid>

      {/* Cập nhật giá dịch vụ */}
      <Grid item xs={12}>
        <SubCard title="Giá dịch vụ">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>Giá hiện tại</Typography>
              <Box display="flex" alignItems="center">
                <Typography fontWeight={700} variant="body2" color="primary.main">
                  {`${expert?.cost?.toLocaleString()} VND/ 1 buổi phỏng vấn`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" gutterBottom>Thay đổi giá</Typography>
              <TextField
                fullWidth
                variant="outlined"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                InputProps={{
                  endAdornment: <Typography sx={{ ml: -15 }}>VND/1 buổi phỏng vấn</Typography>,
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <AnimateButton>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdatePrice}
                disabled={updatingCost}
              >
                {updatingCost ? <CircularProgress size={20} sx={{ mr: 1 }} /> : 'Cập nhật giá'}
              </Button>
            </AnimateButton>
          </Box>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default MyAccount;

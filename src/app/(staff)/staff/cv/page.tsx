'use client';

import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { dispatch, useSelector } from 'store';
import { gridSpacing } from 'store/constant';
import { addComment, addReply, editComment, getPosts, likeComment, likePost, likeReply } from 'store/slices/user';
import MainCard from 'ui-component/cards/MainCard';
import Posts from 'ui-component/cards/Post';
import AnimateButton from 'ui-component/extended/AnimateButton';

import ImageList from 'ui-component/extended/ImageList';
import Avatar from 'ui-component/extended/Avatar';
import useConfig from 'hooks/useConfig';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import ChatTwoToneIcon from '@mui/icons-material/ChatTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';

// third-party
import * as yup from 'yup';
import uniqueId from 'lodash/uniqueId';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// types
import { PostDataType, Reply } from 'types/user-profile';
import { ThemeMode } from 'types/config';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const theme = useTheme();
  const { borderRadius } = useConfig();
  const downMD = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorSharedEl, setAnchorSharedEl] = React.useState<Element | null>(null);

  const handleSharedClick = (event: React.MouseEvent) => {
    setAnchorSharedEl(event.currentTarget);
  };

  const handleSharedClose = () => {
    setAnchorSharedEl(null);
  };

  let commentsResult:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>[] = <></>;

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={12} md={4} lg={6} style={{ margin: 'auto' }}>
        <MainCard>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container wrap="nowrap" alignItems="center" spacing={1}>
                <Grid item>
                  <Avatar alt="User 1" src={`/assets/images/users/avatar-1.png`} />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Typography variant="h5">Doan Ming Quang</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="caption">
                        <FiberManualRecordIcon sx={{ width: '10px', height: '10px', opacity: 0.5, m: '0 5px' }} />
                        12 June 2024
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <ButtonBase sx={{ borderRadius: '12px' }} onClick={handleClick} aria-label="Add to Cart product">
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.smallAvatar,
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : 'secondary.light',
                        color: theme.palette.mode === ThemeMode.DARK ? 'dark.light' : 'secondary.dark',
                        zIndex: 1,
                        transition: 'all .2s ease-in-out',
                        '&[aria-controls="menu-list-grow"],&:hover': { bgcolor: 'secondary.main', color: 'secondary.light' }
                      }}
                      aria-controls="menu-post"
                      aria-haspopup="true"
                    >
                      <MoreVertTwoToneIcon fontSize="inherit" />
                    </Avatar>
                  </ButtonBase>
                  <Menu
                    id="menu-post"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>

            {/* post - content */}
            <Grid item xs={12} sx={{ '& > p': { ...theme.typography.body1, mb: 0 } }}>
              <Markdown remarkPlugins={[remarkGfm]}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                There are many variations of passages.
              </Markdown>
            </Grid>

            {/* post - photo grid */}
            <Grid item xs={12}>
              <ImageList itemData={[{ img: 'cv.png', featured: true }]} />
            </Grid>

            {/* post - video */}
            {/* {data.video && (
                            <Grid item xs={12} sx={{ '&.MuiGrid-root': { pt: 2 } }}>
                                <CardMedia
                                    sx={{ borderRadius: `${borderRadius}px`, height: { xs: 220, lg: 330 } }}
                                    component="iframe"
                                    src={`https://www.youtube.com/embed/${data.video}`}
                                />
                            </Grid>
                        )} */}

            {/* post - comment, likes and replay history */}
            <Grid item xs={12}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                sx={{ mt: 0, color: theme.palette.mode === ThemeMode.DARK ? 'grey.700' : 'grey.800' }}
              >
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="text"
                      onClick={() => {}}
                      color="inherit"
                      size="small"
                      startIcon={<ThumbUpAltTwoToneIcon color={true ? 'primary' : 'inherit'} />}
                    >
                      21
                      <Typography color="inherit" sx={{ fontWeight: 500, ml: 0.5, display: { xs: 'none', sm: 'block' } }}>
                        likes
                      </Typography>
                    </Button>
                    <Button
                      onClick={() => {}}
                      size="small"
                      variant="text"
                      color="inherit"
                      startIcon={<ChatBubbleTwoToneIcon color="secondary" />}
                    >
                      3 comments
                    </Button>
                  </Stack>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleSharedClick} size="large" aria-label="more options">
                    <ShareTwoToneIcon sx={{ width: '16px', height: '16px' }} />
                  </IconButton>
                  <Menu
                    id="menu-post"
                    anchorEl={anchorSharedEl}
                    keepMounted
                    open={Boolean(anchorSharedEl)}
                    onClose={handleSharedClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '14px',
                        fontSize: '1.25rem'
                      }
                    }}
                  >
                    <MenuItem onClick={handleSharedClose}>
                      <ShareTwoToneIcon fontSize="inherit" /> Share Now
                    </MenuItem>
                    <MenuItem onClick={handleSharedClose}>
                      <PeopleAltTwoToneIcon fontSize="inherit" /> Share to Friends
                    </MenuItem>
                    <MenuItem onClick={handleSharedClose}>
                      <ChatTwoToneIcon fontSize="inherit" /> Send in Messanger
                    </MenuItem>
                    <MenuItem onClick={handleSharedClose}>
                      <ContentCopyTwoToneIcon fontSize="inherit" /> Copy Link
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
};
export default Dashboard;

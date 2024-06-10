'use client';

import { useEffect, useState } from 'react';

//next

// material-ui
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// project imports
import { StyledLink } from 'components/common/link/styled-link';
import { dispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

// types

// assets
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { format, parseISO } from 'date-fns';
import { ExpertRegister, GetExpertRegisterRequest } from 'package/api/expert-register-request';
import { PatchApproveExpert } from 'package/api/user/id/approve-expert';
import { PatchRejectExpert } from 'package/api/user/id/reject-expert';
import { useGetUserVerifyExpert } from 'hooks/use-get-user-verify-expert';
import Avatar from 'ui-component/extended/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { UserVerifyExpert } from 'package/api/user/verify-expert';
import { useRouter } from 'next/navigation';
import { useRefresh } from 'hooks/use-refresh';
import { enqueueSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { formatDate } from 'package/util';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';


const avatarImage = '/assets/images/experts';

// ==============================|| USER LIST 1 ||============================== //

const ExpertRequestList = () => {
  const theme = useTheme();

  const params = { limit: 10, page: 1 };

  const { refreshTime, refresh } = useRefresh();

  //State loading button dialog
  const [isLoading, setIsLoading] = useState(false);

  const { verifyExpert, loading } = useGetUserVerifyExpert(params, refreshTime);

  //expert selection state
  const [expertApprove, setExpertApprove] = useState<UserVerifyExpert | null>(null);

  const [expertReject, setExpertReject] = useState<UserVerifyExpert | null>(null);

  //Approve expert handle
  const openExpertApprove = (expert: UserVerifyExpert) => {
    setExpertApprove(expert);
  };

  //Reject expert handle
  const openExpertReject = (expert: UserVerifyExpert) => {
    setExpertReject(expert);
  };

  //Approve handle
  const approveHandle = async () => {
    try {
      setIsLoading(true);
      const action = await PatchApproveExpert({ id: expertApprove ? expertApprove.userId : 0 }, '');
      if (action.status === 'error') {
        throw new Error('');
      }
      refresh();
      enqueueSnackbar(`Kích hoạt tài khoản thành công`, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Kích hoạt tài khoản thất bại`, {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      setExpertApprove(null)
    }
  };

  //Reject handle
  const rejectHandle = async () => {
    try {
      setIsLoading(true);
      const action = await PatchRejectExpert({ id: expertReject ? expertReject.userId : 0 }, '');
      if (action.status === 'error') {
        throw new Error('');
      }
      refresh();
      enqueueSnackbar(`Từ chối tài khoản thành công`, {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(`Từ chối tài khoản thất bại`, {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      setExpertReject(null)
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Ngày sinh</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Grid container justifyContent="center" alignItems="center" style={{ maxHeight: 100 }}>
                  <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress aria-label="progress" />
                  </Box>
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {verifyExpert.length > 0 ? (
                verifyExpert.map((row, index) => (
                  <TableRow hover key={index}>
                    <TableCell sx={{ pl: 3 }}>{row.expertId}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <StyledLink href={`/staff/expert-request/expert-skill-option/${row.expertId}`} passHref>
                          <Avatar alt="User 1" src={row.avatar} />
                        </StyledLink>
                        <Stack direction="row" alignItems="center" spacing={0.25}>
                          <Typography variant="subtitle1">{row.lastName + ' ' + row.firstName}</Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{formatDate(row.birthDate, 'dd-MM-yyyy')}</TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Stack direction="row" justifyContent="center" alignItems="center">
                        <Tooltip placement="top" title="Chấp nhận">
                          <IconButton
                            color="primary"
                            aria-label="approve"
                            size="large"
                            onClick={() => {
                              openExpertApprove(row);
                            }}
                          >
                            <LockOpenIcon sx={{ fontSize: '1.1rem' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Từ chối">
                          <IconButton
                            color="primary"
                            sx={{
                              color: 'orange.dark',
                              borderColor: 'orange.main',
                              '&:hover ': { bgcolor: 'orange.light' }
                            }}
                            size="large"
                            onClick={() => {
                              openExpertReject(row);
                            }}
                          >
                            <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                      Hiện chưa có đơn đăng ký tài khoản nào
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>

      {/* Approve dialog */}
      <Dialog open={Boolean(expertApprove)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">Xác nhận kích hoạt tài khoản ?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bạn muốn kích hoạt tài khoản : {expertApprove ? expertApprove.email : ''}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" type="button" onClick={() => setExpertApprove(null)}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={approveHandle}>
            Kích hoạt
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={Boolean(expertReject)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">Xác nhận từ chối kích hoạt tài khoản ?</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bạn muốn từ chối kích hoạt tài khoản : {expertReject ? expertReject.email : ''}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" type="button" onClick={() => setExpertReject(null)}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={rejectHandle}> Chấp nhận</LoadingButton>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ExpertRequestList;

'use client';

import { useEffect, useState } from 'react';

//next
import NextLink from 'next/link';

// material-ui
import Chip from '@mui/material/Chip';
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
import Avatar from '@mui/material/Avatar';

//assets
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';

//type import
import { GetExpertRegisterRequest, ExpertRegister } from 'package/api/expert-register-request';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { ExpertRegisterApprove } from 'package/api/expert-register-request/id/approve';
import { StaffToken } from 'hooks/use-login';
import { useRouter } from 'next/navigation';
import { ExpertRegisterReject } from 'package/api/expert-register-request/id/reject';
import { useRefresh } from 'hooks/use-refresh';
import { useGeteExpertRegisterRequest } from 'hooks/use-get-expert-register-request';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

const avatarImage = '/assets/images/users';

const RegisterRequestList = () => {

  const [expertApprove, setExpertApprove] = useState<ExpertRegister | null>();

  const [expertReject, setExpertReject] = useState<ExpertRegister | null>();

  //State loading button dialog
  const [isLoading, setIsLoading] = useState(false);

  const { refreshTime, refresh } = useRefresh();

  const { staffToken } = StaffToken();

  const params = { limit: 100, page: 1 };

  //Get Expert Register Request Hook
  const { expertRegisterRequest, loading } = useGeteExpertRegisterRequest(params, refreshTime);

  //Approve expert handle
  const handleOpenApprove = (value: any) => {
    setExpertApprove(value);
  };

  //Reject expert handle
  const handleOpenReject = (value: ExpertRegister) => {
    setExpertReject(value);
  };

  //Approve handle
  const handleApprove = async () => {
    try {
      setIsLoading(true);
      const currentHost = window.location.hostname;
      const data = await ExpertRegisterApprove(
        { id: expertApprove ? expertApprove.id : 0, url: `${currentHost}:3000/form/create/${expertApprove?.email}-${expertApprove?.id}` },
        staffToken
      );
      if (data.status === 'error') {
        throw new Error('');
      }
      refresh();
      enqueueSnackbar('Gửi thành công !', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Gửi thất bại !', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      setExpertApprove(null);
    }
  };

  //Reject handle
  const handleReject = async () => {
    try {
      setIsLoading(true);
      const data = await ExpertRegisterReject({ id: expertReject ? expertReject.id : 0, note: 'Email không hợp lệ' }, staffToken);
      refresh();
      if (data.status === 'error') {
        throw new Error('');
      }
      enqueueSnackbar('Gửi thành công !', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Gửi thất bại !', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
      setExpertReject(null);
    }
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Grid container justifyContent="center" alignItems="center" style={{ maxHeight: 100 }}>
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                      <CircularProgress aria-label="progress" />
                    </Box>
                  </Grid>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {expertRegisterRequest.length > 0 ? (
                  expertRegisterRequest.map((row, index) => (
                    <TableRow hover key={index}>
                      <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Stack>
                            <NextLink href={`/staff/expert/profile`} passHref>
                              <Avatar alt="User 1" src={`${avatarImage}/`} />
                            </NextLink>
                          </Stack>
                          <Stack direction="row" alignItems="center" spacing={0.25}>
                            <Typography>{row.email}</Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell align="center" sx={{ pr: 2 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                          <Tooltip placement="top" title="Duyệt">
                            <IconButton color="primary" aria-label="approve" size="large" onClick={() => handleOpenApprove(row)}>
                              <LockOpenIcon sx={{ fontSize: '1.1rem' }} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip placement="top" title="Từ chối">
                            <IconButton
                              color="primary"
                              sx={{
                                color: 'orange.dark',
                                borderColor: 'orange.main',
                                '&:hover ': { bgcolor: 'orange.light' },
                              }}
                              size="large"
                              onClick={() => handleOpenReject(row)}
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
                    <TableCell colSpan={3}>
                      <Typography variant="h5" align="center" sx={{ pb: 20 }}>
                        Hiện chưa có yêu cầu nào
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Approve */}
      <Dialog maxWidth="xs" fullWidth open={Boolean(expertApprove)}>
        <DialogTitle>Xác nhận gửi form đăng kí?</DialogTitle>
        <DialogContent>
          Bạn muốn gửi form đăng kí tới email: <span style={{ fontWeight: '600', marginLeft: 10 }}>{expertApprove?.email}</span>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setExpertApprove(null)}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={handleApprove}>
            Duyệt
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Reject */}
      <Dialog maxWidth="xs" fullWidth open={Boolean(expertReject)}>
        <DialogTitle>Xác nhận từ chối ?</DialogTitle>
        <DialogContent>
          Bạn muốn từ chối email: <span style={{ fontWeight: '600', marginLeft: 10 }}>{expertReject?.email}</span>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setExpertReject(null)}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={handleReject}>Chấp nhận</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterRequestList;

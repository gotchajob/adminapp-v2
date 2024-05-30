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
import { GetMentorRegister, MentorRegister } from 'package/api/expert-register-request';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { ExpertRegisterApprove } from 'package/api/expert-register-request/id/approve';
import { AdminToken } from 'hooks/use-login';
import { useRouter } from 'next/navigation';
import { ExpertRegisterReject } from 'package/api/expert-register-request/id/reject';

const avatarImage = '/assets/images/users';

const RegisterRequestList = () => {
  const [mentorRegisterList, setMentorRegisterList] = useState<MentorRegister[] | null>([]);

  const [mentorApprove, setMentorApprove] = useState<MentorRegister | null>();

  const [mentorReject, setMentorReject] = useState<MentorRegister | null>();

  const [isLoading, setIsLoading] = useState(false);

  const { adminToken } = AdminToken();

  const router = useRouter();

  const GetMentorRegisterList = async () => {
    const data = await GetMentorRegister({ limit: 10, page: 1 }, '');
    setMentorRegisterList(data.data.list);
  };

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      const currentHost = window.location.hostname;
      const data = await ExpertRegisterApprove(
        { id: mentorApprove ? mentorApprove.id : 0, url: `${currentHost}:3000/form/${mentorApprove?.email}-${mentorApprove?.id}` },
        adminToken
      );
      if (data.status === 'error') {
        throw new Error('');
      }
      enqueueSnackbar('Gửi thành công !', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
    } catch (error) {
      enqueueSnackbar('Gửi thất bại !', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
    } finally {
      setIsLoading(false);
      handleClose()
    }
  };
  const handleReject = async () => {
    try {
      setIsLoading(true);
      const data = await ExpertRegisterReject({ id: mentorReject ? mentorReject.id : 0, note: 'Email không hợp lệ' }, adminToken);
      if (data.status === 'error') {
        throw new Error('');
      }
      enqueueSnackbar('Gửi thành công !', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
    } catch (error) {
      enqueueSnackbar('Gửi thất bại !', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right'
        }
      });
    } finally {
      setIsLoading(false);
      router.refresh();
      handleClose()
    }
  };
  const handleClose = () => {
    setMentorApprove(null);
    setMentorReject(null);
  };
  const handleOpenApprove = (value: MentorRegister) => {
    setMentorApprove(value);
  };

  const handleOpenReject = (value: MentorRegister) => {
    setMentorReject(value);
  };

  useEffect(() => {
    GetMentorRegisterList();
  }, []);

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
            {mentorRegisterList?.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Stack>
                      <NextLink href={`/admin/mentor/profile`} passHref>
                        <Avatar alt="User 1" src={`${avatarImage}/`}></Avatar>
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
                      <IconButton color="primary" aria-label="delete" size="large" onClick={() => handleOpenApprove(row)}>
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
                        onClick={() => handleOpenReject(row)}
                      >
                        <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Approve */}
      <Dialog maxWidth="xs" fullWidth open={Boolean(mentorApprove)}>
        <DialogTitle>Xác nhận gửi form đăng kí?</DialogTitle>
        <DialogContent>
          Bạn muốn gửi form đăng kí tới email: <span style={{ fontWeight: '600', marginLeft: 10 }}>{mentorApprove?.email}</span>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={handleApprove}>
            Duyệt
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Reject */}
      <Dialog maxWidth="xs" fullWidth open={Boolean(mentorReject)}>
        <DialogTitle>Xác nhận từ chối ?</DialogTitle>
        <DialogContent>
          Bạn muốn từ chối email: <span style={{ fontWeight: '600', marginLeft: 10 }}>{mentorReject?.email}</span>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={handleReject}>Duyệt</LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterRequestList;

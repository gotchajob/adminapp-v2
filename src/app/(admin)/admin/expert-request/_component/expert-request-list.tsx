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

const avatarImage = '/assets/images/experts';

// ==============================|| USER LIST 1 ||============================== //

const ExpertRequestList = () => {
  const theme = useTheme();

  const { verifyExpert } = useGetUserVerifyExpert({ limit: 10, page: 1 });

  const [refresh, setRefresh] = useState(0);
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
      const action = await PatchApproveExpert({ id: expertApprove ? expertApprove.userId : 0 }, '');
      if (action.status === 'error') {
        throw new Error('');
      }
      showSnackbar(`Kích hoạt tài khoản thành công`, 'success');
    } catch (error) {
      showSnackbar(`Kích hoạt tài khoản thất bại`, 'error');
    }
  };

  //Reject handle
  const rejectHandle = async () => {
    try {
      const action = await PatchRejectExpert({ id: expertReject ? expertReject.userId : 0 }, '');
      if (action.status === 'error') {
        throw new Error('');
      }
      showSnackbar(`Từ chối tài khoản thành công`, 'success');
    } catch (error) {
      console.log(error);
      showSnackbar(`Từ chối tài khoản thất bại`, 'error');
    } finally {
      setExpertReject(null)
    }
  };

  //snackBar
  const showSnackbar = (message: string, variant: string) => {
    dispatch(
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        message: message,
        variant: 'alert',
        alert: {
          color: variant
        },
        close: false
      })
    );
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
            <TableCell>Địa chỉ</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {verifyExpert?.map((row, index) => (
            <TableRow hover key={index}>
              <TableCell sx={{ pl: 3 }}>{row.expertId}</TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <StyledLink href={`/admin/expert-request/expert-skill-option/${row.expertId}`} passHref>
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
              <TableCell>{row.birthDate}</TableCell>

              <TableCell align="center" sx={{ pr: 3 }}>
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Tooltip placement="top" title="Chấp nhận">
                    <IconButton
                      color="primary"
                      aria-label="delete"
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
          ))}
        </TableBody>
      </Table>

      {/* Approve dialog */}
      <Dialog open={Boolean(expertApprove)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">Xác nhận phương thức</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bạn muốn kích hoạt tài khoản với email : {expertApprove ? expertApprove.email : ''}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" type="button" onClick={() => setExpertApprove(null)}>
            Hủy
          </Button>
          <Button type="button" onClick={approveHandle}>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject dialog */}
      <Dialog open={Boolean(expertReject)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">Xác nhận phương thức</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bạn muốn từ chối yêu cầu tài khoản với email : {expertReject ? expertReject.email : ''}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="error" type="button" onClick={() => setExpertReject(null)}>
            Hủy
          </Button>
          <Button type="button" onClick={rejectHandle}>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ExpertRequestList;

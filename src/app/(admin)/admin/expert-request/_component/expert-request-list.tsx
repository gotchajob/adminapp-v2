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
import CloseIcon from '@mui/icons-material/Close';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { useSearchParamsNavigation } from 'hooks/use-get-params';
import { ExpertRegister, GetExpertRegisterRequest } from 'package/api/expert-register-request';
import { PatchApproveExpert } from 'package/api/user/id/approve-expert';
import { PatchRejectExpert } from 'package/api/user/id/reject-expert';
import { AdminToken } from 'hooks/use-login';

const avatarImage = '/assets/images/experts';

// ==============================|| USER LIST 1 ||============================== //

const ExpertRequestList = () => {
  const theme = useTheme();

  //expert list state
  const [expertRqList, setExpertRqList] = useState<ExpertRegister[] | undefined>([]);

  //expert selection state
  const [expert, setExpert] = useState<ExpertRegister | undefined>(undefined);

  //active dialog state
  const [approveDialog, setApproveDialog] = useState<boolean>(false);

  //reject dialog state
  const [rejectDialog, setRejectDialog] = useState<boolean>(false);

  //get admín token
  const { adminToken } = AdminToken();

  //route hook
  const { push } = useSearchParamsNavigation();

  //Fetch API get uset list
  const FetchExpertList = async () => {
    const data = await GetExpertRegisterRequest({ page: 1, limit: 10 }, "");
    if (data) {
      setExpertRqList(data.data.list);
    }
  }

  //Approve expert handle
  const approveExpertHandle = (id: number) => {
    if (id) {
      const filterExpertById = expertRqList?.find((expert) => expert.id === id);
      setExpert(filterExpertById);
    }
    setApproveDialog((prev) => !prev);
  }

  //Reject expert handle
  const rejectExpertHandle = (id: number) => {
    if (id) {
      const filterExpertById = expertRqList?.find((expert) => expert.id === id);
      setExpert(filterExpertById);
    }
    setRejectDialog((prev) => !prev);
  }

  //Approve handle
  const approveHandle = async (expert?: ExpertRegister) => {
    if (expert) {
      try {
        const action = await PatchApproveExpert({ id: expert.id }, '');
        if (action.status !== "error") {
          setApproveDialog((prev) => !prev);
          showSnackbar(`Kích hoạt tài khoản ${expert.email} thành công`, 'success');
        } else {
          setApproveDialog((prev) => !prev);
          showSnackbar(`Kích hoạt tài khoản ${expert.email} thất bại`, 'error');
        }
      } catch (error) {
        console.log(error);
        showSnackbar(`Kích hoạt tài khoản ${expert.email} thất bại`, 'error');
      }
    }
  }

  //Reject handle
  const rejectHandle = async (expert?: ExpertRegister) => {
    if (expert) {
      try {
        const action = await PatchRejectExpert({ id: expert.id }, '');
        if (action.status !== "error") {
          setApproveDialog((prev) => !prev);
          showSnackbar(`Từ chối tài khoản ${expert.email} thành công`, 'success');
        } else {
          setApproveDialog((prev) => !prev);
          showSnackbar(`Từ chối tài khoản ${expert.email} thất bại`, 'error');
        }
      } catch (error) {
        console.log(error);
        showSnackbar(`Từ chối tài khoản ${expert.email} thất bại`, 'error');
      }
    }
  }

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
  }

  //formatDate
  const formatDate = (date: string, pattern: string) => {
    return date ? format(parseISO(date), pattern) : '';
  };

  //expert Effect
  useEffect(() => {
    FetchExpertList();
  }, []);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Ngày yêu cầu</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expertRqList?.map((expert, index) => (
            <TableRow hover key={index}>
              <TableCell sx={{ pl: 3 }}>{expert.id}</TableCell>
              <TableCell>
                <Typography variant="subtitle2" noWrap>
                  <StyledLink href={`/admin/expert-request/expert-skill-option/${expert.id}`}>
                    {expert.email}
                  </StyledLink>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" noWrap>
                  {formatDate(expert.createdAt, "dd/MM/yyyy")}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                <Stack direction="row" justifyContent="center" alignItems="center">
                  <Tooltip placement="top" title="Chấp nhận">
                    <IconButton color="primary" aria-label="delete" size="large" onClick={() => { approveExpertHandle(expert.id) }}>
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
                      onClick={() => { rejectExpertHandle(expert.id) }}
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
      <Dialog
        open={approveDialog}
        onClose={() => setApproveDialog((prev) => !prev)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận phương thức
          <IconButton size="large" aria-label="close modal" onClick={() => setApproveDialog((prev) => !prev)} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bạn muốn kích hoạt tài khoản với email : {expert?.email}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color='error' type="button" onClick={() => setRejectDialog((prev) => !prev)}>
            Hủy
          </Button>
          <Button type="button" onClick={() => { approveHandle(expert) }}>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject dialog */}
      <Dialog
        open={rejectDialog}
        onClose={() => setRejectDialog((prev) => !prev)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          Xác nhận phương thức
          <IconButton size="large" aria-label="close modal" onClick={() => setRejectDialog((prev) => !prev)} style={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bạn muốn từ chối yêu cầu tài khoản với email : {expert?.email}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color='error' type="button" onClick={() => setRejectDialog((prev) => !prev)}>
            Hủy
          </Button>
          <Button type="button" onClick={() => { rejectHandle(expert) }}>
            Chấp nhận
          </Button>
        </DialogActions>
      </Dialog>

    </TableContainer >
  );
};

export default ExpertRequestList;

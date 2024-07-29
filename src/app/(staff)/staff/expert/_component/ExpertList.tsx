"use client";

import { useState } from "react";

//next
import NextLink from "next/link";

// material-ui
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

// project imports
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import { ThemeMode } from "types/config";
import Avatar from "ui-component/extended/Avatar";

// types
import type { UserList } from "package/api/user";

// assets
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import useGetExpertList from "hooks/use-get-expert-list";
import { useRefresh } from "hooks/use-refresh";
import { ExpertListType } from "package/api/expert";
import { PatchBanUser } from "package/api/user/id/ban";
import { PatchUnBanUser } from "package/api/user/id/unban";
import { enqueueSnackbar } from "notistack";
import { formatDate } from "package/util";
import useGetUserList from "hooks/use-get-user-list";

const avatarImage = "/assets/images/users";

// ==============================|| USER LIST 1 ||============================== //

const ExpertList = () => {
  const theme = useTheme();

  //loading button dialog
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //epxert ban
  const [expertBan, setExpertBan] = useState<ExpertListType | undefined>(undefined);

  //expert unban
  const [expertUnban, setExpertUnban] = useState<ExpertListType | undefined>(
    undefined
  );

  //refresh hook
  const { refreshTime, refresh } = useRefresh();

  // //get expert list hook
  // const { expertList, loading } = useGetExpertList({ page: 1, limit: 10 }, refreshTime);

  const { userList, loading } = useGetUserList(
    { pageNumber: 1, pageSize: 10, search: ["status:1", "roleId:3", "id>47"] },
    refreshTime
  );

  //Ban expert handle
  const BanExpert = async () => {
    try {
      setIsLoading(true);
      refresh();
      console.log("ban expert:", expertBan);
      enqueueSnackbar(`Khóa tài khoản thành công`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Khóa tài khoản thất bại`, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
      setExpertBan(undefined);
    }
  };

  //unBan expert handle
  const UnBanExpert = async () => {
    try {
      setIsLoading(true);
      refresh();
      console.log("unban expert :", expertUnban);
      enqueueSnackbar(`Mở khóa tài khoản thành công`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Mở khóa tài khoản thất bại`, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
      setExpertUnban(undefined);
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
            <TableCell>Ngày đăng ký</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={6}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  style={{ maxHeight: 100 }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <CircularProgress aria-label="progress" />
                  </Box>
                </Grid>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {userList.length > 0 ? (
                userList?.map((row: any, index) => (
                  <TableRow hover key={index}>
                    <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <NextLink
                          href={`/staff/expert/profile/${row.expert.expertId}`}
                          passHref
                        >
                          <Avatar alt="User 1" src={row.avatar} />
                        </NextLink>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.25}
                        >
                          <Typography variant="subtitle1">
                            {row.fullName}
                          </Typography>
                        </Stack>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" noWrap>
                        {row.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      {formatDate(row.expert.birthDate, "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 250 }}>
                      {formatDate(row.createdAt, "dd-MM-yyyy")}
                    </TableCell>
                    <TableCell align="center" sx={{ pr: 3 }}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        {row.status === 0 ? (
                          <Tooltip placement="top" title="Mở khóa">
                            <IconButton
                              color="primary"
                              aria-label="approve"
                              size="large"
                              onClick={() => {
                                setExpertUnban(row);
                              }}
                            >
                              <LockOpenIcon sx={{ fontSize: "1.1rem" }} />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip placement="top" title="Khóa">
                            <IconButton
                              color="primary"
                              sx={{
                                color: "orange.dark",
                                borderColor: "orange.main",
                                "&:hover ": { bgcolor: "orange.light" },
                              }}
                              size="large"
                              onClick={() => {
                                setExpertBan(row);
                              }}
                            >
                              <BlockTwoToneIcon sx={{ fontSize: "1.1rem" }} />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography variant="h5" align="center" sx={{ pb: 10 }}>
                      Hiện chưa có tài khoản nào
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>

      {/* Ban dialog */}
      <Dialog open={Boolean(expertUnban)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">
          Xác nhận mở khóa tài khoản ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn muốn mở khóa tài khoản : {expertUnban ? expertUnban.email : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            type="button"
            onClick={() => setExpertUnban(undefined)}
          >
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={UnBanExpert}>
            Mở khóa
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Unban dialog */}
      <Dialog open={Boolean(expertBan)} maxWidth="xs" fullWidth>
        <DialogTitle id="alert-dialog-title">
          Xác nhận khóa tài khoản ?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Bạn muốn khóa tài khoản : {expertBan ? expertBan.email : ""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            type="button"
            onClick={() => setExpertBan(undefined)}
          >
            Đóng
          </Button>
          <LoadingButton loading={isLoading} onClick={BanExpert}>
            {" "}
            Khóa
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ExpertList;

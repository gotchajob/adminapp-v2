"use client";

import { useState } from "react";

//next
import NextLink from "next/link";

// material-ui
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// project imports
import Avatar from "ui-component/extended/Avatar";

// types
import type { UserList } from "package/api/user";

// assets
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TableContainer,
  Skeleton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useGetUserList from "hooks/use-get-user-list";
import { useRefresh } from "hooks/use-refresh";
import { PatchBanUser } from "package/api/user/id/ban";
import { PatchUnBanUser } from "package/api/user/id/unban";
import { enqueueSnackbar } from "notistack";
import { RendeExpertListTable } from "./ExpertListTable";

const avatarImage = "/assets/images/users";

// ==============================|| EXPERT LIST ||============================== //

const ExpertList = () => {
  const theme = useTheme();

  // loading button dialog
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // expert ban and unban states
  const [expertBan, setExpertBan] = useState<UserList | undefined>(undefined);
  const [expertUnban, setExpertUnban] = useState<UserList | undefined>(
    undefined
  );

  // refresh hook
  const { refreshTime, refresh } = useRefresh();

  // get user list with roleId = 3 (experts)
  const { userList, loading } = useGetUserList(
    { pageNumber: 1, pageSize: 1000, search: ["status:1", "roleId:3"] },
    refreshTime
  );

  // Ban expert handle
  const BanExpert = async () => {
    try {
      setIsLoading(true);
      if (expertBan) {
        const res = await PatchBanUser({ id: expertBan.id }, "");
        if (res.status === "success") {
          enqueueSnackbar(`Khóa tài khoản ${expertBan.email} thành công`, {
            variant: "success",
          });
          refresh();
        } else {
          enqueueSnackbar(`Khóa tài khoản thất bại`, { variant: "error" });
        }
      }
    } catch (error) {
      enqueueSnackbar(`Lỗi khi khóa tài khoản`, { variant: "error" });
    } finally {
      setIsLoading(false);
      setExpertBan(undefined);
    }
  };

  // Unban expert handle
  const UnBanExpert = async () => {
    try {
      setIsLoading(true);
      if (expertUnban) {
        const res = await PatchUnBanUser({ id: expertUnban.id }, "");
        if (res.status === "success") {
          enqueueSnackbar(`Mở khóa tài khoản ${expertUnban.email} thành công`, {
            variant: "success",
          });
          refresh();
        } else {
          enqueueSnackbar(`Mở khóa tài khoản thất bại`, { variant: "error" });
        }
      }
    } catch (error) {
      enqueueSnackbar(`Lỗi khi mở khóa tài khoản`, { variant: "error" });
    } finally {
      setIsLoading(false);
      setExpertUnban(undefined);
    }
  };

  const SkeletonTable = () => {
    return (
      <TableContainer>
        <Skeleton variant="rectangular" width="15%" sx={{ margin: 3 }} />
        <Table sx={{ borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              {Array.from(new Array(5)).map((_, index) => (
                <TableCell key={index} sx={{ padding: 2, border: 0 }} width="30%">
                  <Skeleton variant="rectangular" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from(new Array(5)).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from(new Array(5)).map((_, cellIndex) => (
                  <TableCell key={cellIndex} width="30%" sx={{ padding: 2, border: 0 }}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      {userList.length > 0 ? (
        <RendeExpertListTable
          expertList={userList}
          setExpertBan={setExpertBan}
          setExpertUnban={setExpertUnban}
        />
      ) : (SkeletonTable())}

      {/* Ban dialog */}
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
            Khóa
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Unban dialog */}
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
    </>
  );
};

export default ExpertList;
{/* <TableContainer>
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
      </TableContainer> */}
"use client";

import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import MainCard from "ui-component/cards/MainCard";
import { PatchBanUser } from "package/api/user/id/ban";
import { PatchUnBanUser } from "package/api/user/id/unban";
import { GetUserList } from "package/api/user";
import { dispatch } from "store";
import { openSnackbar } from "store/slices/snackbar";
import { UserTableRender } from "./UserListTable"; // Import UserTableRender
import type { UserList as UserListType } from "package/api/user"; // Import type
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

// Component UserList
const UserList = () => {
  // Fetch theme and users
  const [userList, setUserList] = useState<UserListType[]>([]);
  const [user, setUser] = useState<UserListType | undefined>(undefined);
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Fetch the list of users
  const FetchUserList = async () => {
    const data = await GetUserList({ pageNumber: 1, pageSize: 100, search: ["roleId:4"] }, "");
    if (data) {
      setUserList(data.data.list);
    }
  };

  // Handle Ban/Unban user
  const BanUser = async (user: UserListType) => {
    try {
      const id = user.id;
      const action = user.status === 1 ? await PatchBanUser({ id }, "") : await PatchUnBanUser({ id }, "");
      if (action.status !== "error") {
        FetchUserList();
        setOpenModal(false);
        showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thành công` : `Kích hoạt tài khoản ${user.email} thành công`, "success");
      } else {
        showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thất bại` : `Kích hoạt tài khoản ${user.email} thất bại`, "error");
      }
    } catch (error) {
      showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thất bại` : `Kích hoạt tài khoản ${user.email} thất bại`, "error");
    }
  };

  // Handle open modal for ban/unban user
  const userHandle = (id: number) => {
    const selectedUser = userList?.find((u) => u.id === id);
    setUser(selectedUser);
    setOpenModal(true);
  };

  // Show snackbar notification
  const showSnackbar = (message: string, variant: string) => {
    dispatch(
      openSnackbar({
        open: true,
        anchorOrigin: { vertical: "top", horizontal: "center" },
        message: message,
        variant: "alert",
        alert: { color: variant },
        close: false,
      })
    );
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

  // Fetch user list on component mount
  useEffect(() => {
    FetchUserList();
  }, []);

  return (
    <>
      {/* UserTableRender is integrated here */}
      {userList.length > 0 ?
        (<UserTableRender
          userList={userList}
          handleBan={userHandle} // Handle ban/unban action
        />) : (SkeletonTable())}

      {/* Modal for Ban/Unban confirmation */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="ban-unban-user"
        aria-describedby="ban-unban-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <MainCard
          title="Xác nhận phương thức"
          content={false}
          secondary={
            <IconButton size="large" onClick={() => setOpenModal(false)}>
              <CloseIcon />
            </IconButton>
          }
        >
          <Typography variant="body1">
            Bạn muốn {user?.status === 1 ? "cấm" : "kích hoạt"} tài khoản với email {user?.email}?
          </Typography>
          <Grid container sx={{ mt: 1 }}>
            <Button variant="text" onClick={() => setOpenModal(false)}>
              Đóng
            </Button>
            <Button variant="text" onClick={() => user && BanUser(user)}>
              Chấp nhận
            </Button>
          </Grid>
        </MainCard>
      </Modal>
    </>
  );
};

export default UserList;

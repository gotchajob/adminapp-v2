'use client';

import React, { useEffect, useState } from 'react';

//next
import NextLink from 'next/link';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
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

// project imports
import Avatar from 'ui-component/extended/Avatar';
import { GetUserList } from 'package/api/user';
import { PostBanUser } from 'package/api/user/id/ban';
import { PostUnBanUser } from 'package/api/user/id/unban';
import { dispatch, useSelector } from 'store';
import { getUsersListStyle1 } from 'store/slices/user';

// types
import { ThemeMode } from 'types/config';
import { UserProfile } from 'types/user-profile';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { GetMentorRegister } from 'package/api/mentor-register-request';


const avatarImage = '/assets/images/users';

// ==============================|| USER LIST 1 ||============================== //

const UserList = () => {
  const theme = useTheme();

  const [user, setUser] = useState([]);

  const FetchUserList = async () => {
    const data = await GetUserList({ pageNumber: 1, pageSize: 5 }, "");
    console.log("Userlist :", data);
  }

  const FetchBanUser = async (id: number) => {
    const data = await PostBanUser({ id }, '');
    console.log("ban user:", data);
  }

  const FetchUnBanUser = async (id: number) => {
    const data = await PostUnBanUser({ id }, '');
    console.log("unban user:", data);
  }

  const FetchMentorRegister = async () => {
    const data = await GetMentorRegister({ limit: 1, page: 1 }, '');
    console.log("GetMentorRegister", data)
  }

  useEffect(() => {
    FetchUserList();
    FetchMentorRegister ();
  }, [])

  const data = [
    {
      id: 1,
      avatar: "avatar-2.png",
      name: "Vy",
      email: "vy@example.com",
      phone: "123-456-7890",
      location: "Hanoi, Vietnam",
      status: "Active"
    },
    {
      id: 2,
      avatar: "avatar-3.png",
      name: "Lan",
      email: "lan@example.com",
      phone: "987-654-3210",
      location: "Saigon, Vietnam",
      status: "Active"
    },
    {
      id: 3,
      avatar: "avatar-4.png",
      name: "Minh",
      email: "minh@example.com",
      phone: "456-789-1230",
      location: "Danang, Vietnam",
      status: "Ban"
    }
  ]

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
            <TableCell>Trạng thái</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <NextLink href={`/admin/user/profile`} passHref>
                      <Avatar alt="User 1" src={`${avatarImage}/${row.avatar}`} />
                    </NextLink>
                    <Stack direction="row" alignItems="center" spacing={0.25}>
                      <Typography variant="subtitle1">{row.name}</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" noWrap>
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  {row.status === 'Active' && (
                    <Chip
                      label="Active"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : alpha(theme.palette.success.light, 0.6),
                        color: 'success.dark'
                      }}
                    />
                  )}
                  {row.status === 'Ban' && (
                    <Chip
                      label="Ban"
                      size="small"
                      sx={{
                        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : alpha(theme.palette.orange.light, 0.8),
                        color: 'orange.dark'
                      }}
                    />
                  )}
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack direction="row" justifyContent="center" alignItems="center">
                    {row.status === "Ban" && (
                      <Tooltip placement="top" title="Active">
                        <IconButton color="primary" aria-label="delete" size="large">
                          <LockOpenIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                      </Tooltip>)}
                    {row.status === "Active" && (
                      <Tooltip placement="top" title="Ban">
                        <IconButton
                          color="primary"
                          sx={{
                            color: 'orange.dark',
                            borderColor: 'orange.main',
                            '&:hover ': { bgcolor: 'orange.light' }
                          }}
                          size="large"
                        >
                          <BlockTwoToneIcon sx={{ fontSize: '1.1rem' }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserList;

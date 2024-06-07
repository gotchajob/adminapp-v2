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
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';

// project imports
import { GetUserList } from 'package/api/user';
import Avatar from 'ui-component/extended/Avatar';
import MainCard from 'ui-component/cards/MainCard';
import { ThemeMode } from 'types/config';
import { openSnackbar } from 'store/slices/snackbar';
import { dispatch } from 'store';

// types
import type { UserList } from 'package/api/user';

// assets
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';
import { PatchBanUser } from 'package/api/user/id/ban';
import { PatchUnBanUser } from 'package/api/user/id/unban';

const avatarImage = '/assets/images/users';

// ==============================|| USER LIST 1 ||============================== //

const ExpertList = () => {
    const theme = useTheme();

    //user list state
    const [userList, setUserList] = useState<UserList[] | undefined>([]);

    //user selection state
    const [user, setUser] = useState<UserList | undefined>(undefined);

    //modal state
    const [openModal, setOpenModal] = useState<boolean>(false);

    //Fetch API get uset list
    const FetchUserList = async () => {
        const data = await GetUserList({ pageNumber: 1, pageSize: 4 }, "");
        if (data) {
            setUserList(data.data.list);
        }
    }

    //Fetch API post ban user
    const BanUser = async (user: UserList) => {
        if (user) {
            try {
                const id = user.id;
                const action = await PatchBanUser({ id }, '');
                if (action.status !== "error") {
                    setOpenModal((prev) => !prev);
                    showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thành công` : `Kích hoạt tài khoản ${user.email} thành công`, 'success');
                } else {
                    showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thất bại` : `Kích hoạt tài khoản ${user.email} thất bại`, 'error');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    //Fetch API post active user
    const UnBanUser = async (user: UserList) => {
        if (user) {
            try {
                const id = user.id;
                const action = await PatchUnBanUser({ id }, '');
                if (action.status !== "error") {
                    setOpenModal((prev) => !prev);
                    showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thành công` : `Kích hoạt tài khoản ${user.email} thành công`, 'success');
                } else {
                    showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thất bại` : `Kích hoạt tài khoản ${user.email} thất bại`, 'error');
                }
            } catch (error) {
                console.log(error);
                showSnackbar(user.status === 1 ? `Cấm tài khoản ${user.email} thất bại` : `Kích hoạt tài khoản ${user.email} thất bại`, 'error');
            }
        }
    }

    //Ban user handle
    const userHandle = async (id: number) => {
        if (id) {
            const filteredUserById = userList?.find((user) => user.id === id);
            setUser(filteredUserById);
        }
        setOpenModal((prev) => !prev);
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

    //user Effect
    useEffect(() => {
        FetchUserList();
    }, [user]);

    const data = [
        {
            id: 1,
            avatar: "avatar-2.png",
            name: "Expert Lan",
            email: "lanvls15@example.com",
            phone: "123-456-7890",
            location: "Hanoi, Vietnam",
            status: "Active"
        },
        {
            id: 2,
            avatar: "avatar-3.png",
            name: "Expert Hong",
            email: "hongngl11@example.com",
            phone: "987-654-3210",
            location: "Saigon, Vietnam",
            status: "Active"
        },
        {
            id: 3,
            avatar: "avatar-4.png",
            name: "Expert Kelvin",
            email: "kelvinwin@example.com",
            phone: "456-789-1230",
            location: "LA, America",
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
                                        <NextLink href={`/staff/expert/profile`} passHref>
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

            {/* Modal Handle Status User */}
            <Modal
                disablePortal
                disableEnforceFocus
                disableAutoFocus
                aria-labelledby="server-modal-title"
                aria-describedby="server-modal-description"
                sx={{
                    display: 'flex',
                    p: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                open={openModal}
            >
                <MainCard
                    sx={{
                        width: { xs: 280, sm: 450 },
                        zIndex: 1
                    }}
                    title="Xác nhận phương thức"
                    content={false}
                    secondary={
                        <IconButton size="large" aria-label="close modal" onClick={() => setOpenModal((prev) => !prev)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                >
                    <CardContent>
                        <Typography variant="body1">Bạn muốn {user?.status === 1 ? "cấm" : "kích hoạt"} tài khoản với email {user?.email}</Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="space-between">
                            <Button variant="contained" type="button" onClick={() => setOpenModal((prev) => !prev)}>
                                Hủy
                            </Button>
                            {user && user.status === 1 ? (<Button variant="contained" type="button" onClick={() => BanUser(user)}>
                                Chấp nhận
                            </Button>) : (<Button variant="contained" type="button" onClick={() => UnBanUser(user)}>
                                Chấp nhận
                            </Button>)}
                        </Grid>
                    </CardActions>
                </MainCard>
            </Modal>

        </TableContainer >
    );
};

export default ExpertList;

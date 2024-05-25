'use client';

import { useEffect, useState } from 'react';

//next
import NextLink from 'next/link';
import { useRouter } from 'next/router';

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
import { Avatar } from '@mui/material';

// project import
import AnimateButton from 'ui-component/extended/AnimateButton';
import MainCard from 'ui-component/cards/MainCard';

//assets
import BlockTwoToneIcon from '@mui/icons-material/BlockTwoTone';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CloseIcon from '@mui/icons-material/Close';

//type import
import { ThemeMode } from 'types/config';
import { GetMentorRegister, MentorRegister } from 'package/api/mentor-register-request';


const avatarImage = '/assets/images/users';

const RegisterRequestList = () => {
    const theme = useTheme();

    // const router = useRouter();

    const [openModal, setOpenModal] = useState<boolean>(false);

    const [status, setStatus] = useState<number>(0);

    const [mentorRegisterList, setMentorRegisterList] = useState<MentorRegister[] | undefined>([]);

    const [mentorSelection, setMentorSelection] = useState<MentorRegister | undefined>(null);

    const data = [
        {
            id: 1,
            avatar: "",
            name: "Mentor Lan",
            email: "lanvls15@example.com",
            phone: "123-456-7890",
            location: "Hanoi, Vietnam",
            status: 3
        },
        {
            id: 2,
            avatar: "",
            name: "Mentor Hong",
            email: "hongngl11@example.com",
            phone: "987-654-3210",
            location: "Saigon, Vietnam",
            status: 3
        },
        {
            id: 3,
            avatar: "",
            name: "Mentor Kelvin",
            email: "kelvinwin@example.com",
            phone: "456-789-1230",
            location: "LA, America",
            status: 3
        }
    ]

    // const onClickRowHandle = () => {
    //     router.push('/admin/mentor/profile');
    // }

    //Fetch Get Mentor Register Request
    const GetMentorRegisterList = async () => {
        const data = await GetMentorRegister({ limit: 4, page: 1 }, '');
        setMentorRegisterList(data.data.list);
    }

    const registerHandle = (value: MentorRegister) => {
        setStatus(0);
        setMentorSelection(value);
        setOpenModal(prev => !prev)
    }

    const cancelHandle = () => {
        setStatus(1);
        setOpenModal(prev => !prev);
    }

    useEffect(() => {
        GetMentorRegisterList();
    }, [])

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        {/* <TableRow>
                            <TableCell sx={{ pl: 3 }}>#</TableCell>
                            <TableCell>Tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Vị trí địa lý </TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="center" sx={{ pr: 10 }}>
                                Actions
                            </TableCell>
                        </TableRow> */}
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>#</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell align="center">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {/* <TableBody>
                        {data?.map((row, index) => (
                            <TableRow hover key={index} >
                                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Stack>
                                            <NextLink href={`/admin/mentor/profile`} passHref>
                                                <Avatar alt="User 1" src={`${avatarImage}/${row.avatar}`}></Avatar>
                                            </NextLink>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={0.25}>
                                            <Typography>{row.name}</Typography>
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
                                    {row.status === 3 && (
                                        <Chip label="Pending"
                                            size="small"
                                            sx={{
                                                bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : alpha(theme.palette.warning.light, 0.6),
                                                color: 'warning.dark'
                                            }}
                                        ></Chip>
                                    )}
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" spacing={1} >
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    boxShadow: theme.customShadows.primary,
                                                    ':hover': {
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                                onClick={() => { setOpenModal(prev => !prev) }}
                                            >
                                                Xác nhận
                                            </Button>
                                        </AnimateButton>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    bgcolor: 'error.main',
                                                    borderColor: 'divider',
                                                    boxShadow: theme.customShadows.error,
                                                    ':hover': { boxShadow: 'none' }
                                                }}
                                                onClick={() => { setOpenModal(prev => !prev) }}
                                            >
                                                Hủy
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody> */}
                    <TableBody>
                        {mentorRegisterList?.map((row, index) => (
                            <TableRow hover key={index} >
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
                                <TableCell>
                                    <Chip label="Pending"
                                        size="small"
                                        sx={{
                                            bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : alpha(theme.palette.warning.light, 0.6),
                                            color: 'warning.dark'
                                        }}
                                    ></Chip>
                                </TableCell>
                                <TableCell align="center" sx={{ pl: 35 }}>
                                    <Stack direction="row" spacing={1} >
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    boxShadow: theme.customShadows.primary,
                                                    ':hover': {
                                                        boxShadow: 'none'
                                                    }
                                                }}
                                                onClick={() => registerHandle(row)}
                                            >
                                                Xác nhận
                                            </Button>
                                        </AnimateButton>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    bgcolor: 'error.main',
                                                    borderColor: 'divider',
                                                    boxShadow: theme.customShadows.error,
                                                    ':hover': { boxShadow: 'none' }
                                                }}
                                                onClick={() => cancelHandle()}
                                            >
                                                Hủy
                                            </Button>
                                        </AnimateButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >

            {/* Modal */}
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
                        <Typography variant="body1">Bạn muốn {status == 0 ? "kích hoạt" : "hủy kích hoạt"} tài khoản cho email {mentorSelection?.email} ?</Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container justifyContent="space-between">
                            <Button variant="contained" type="button" onClick={() => setOpenModal((prev) => !prev)}>
                                Hủy
                            </Button>
                            <Button variant="contained" type="button" onClick={() => setOpenModal((prev) => !prev)}>
                                Chấp nhận
                            </Button>
                        </Grid>
                    </CardActions>
                </MainCard>
            </Modal>
        </>
    )
}

export default RegisterRequestList;
"use client";

import { useEffect, useState } from "react";

//next
import NextLink from "next/link";

// material-ui
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
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

// project imports
import { GetUserList } from "package/api/user";
import { PatchBanUser } from "package/api/user/id/ban";
import { PatchUnBanUser } from "package/api/user/id/unban";
import Avatar from "ui-component/extended/Avatar";
import MainCard from "ui-component/cards/MainCard";
import { ThemeMode } from "types/config";
import { openSnackbar } from "store/slices/snackbar";
import { dispatch } from "store";

// types
import type { UserList } from "package/api/user";

// assets
import BlockTwoToneIcon from "@mui/icons-material/BlockTwoTone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import CloseIcon from "@mui/icons-material/Close";
import { useGetCVTemplate } from "hooks/use-get-cv-template";
import { useGetCVCategory } from "hooks/use-get-cv-category";

const avatarImage = "/assets/images/users";

// ==============================|| USER LIST 1 ||============================== //

export const CVList = () => {
  const theme = useTheme();
  const { cvTemplateList } = useGetCVTemplate({});
  const { cvCategory } = useGetCVCategory();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell align="center">Danh mục</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cvTemplateList &&
            cvTemplateList.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <NextLink href={`/staff/cv/` + row.id} passHref>
                      <Avatar alt="User 1" src={row.image} />
                    </NextLink>
                    <Stack direction="row" alignItems="center" spacing={0.25}>
                      <Typography variant="subtitle1">{row.name}</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="subtitle2" noWrap>
                    {
                      cvCategory.find((value) => value.id === row.cvCategoryId)
                        ?.name
                    }
                  </Typography>
                </TableCell>
                <TableCell align="center" sx={{ pr: 3 }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* {row.status === "Ban" && (
                      <Tooltip placement="top" title="Active">
                        <IconButton
                          color="primary"
                          aria-label="delete"
                          size="large"
                        >
                          <LockOpenIcon sx={{ fontSize: "1.1rem" }} />
                        </IconButton>
                      </Tooltip>
                    )} */}
                    {/* {row.status === "Active" && ( */}
                    <Tooltip placement="top" title="Ban">
                      <IconButton
                        color="primary"
                        sx={{
                          color: "orange.dark",
                          borderColor: "orange.main",
                          "&:hover ": { bgcolor: "orange.light" },
                        }}
                        size="large"
                      >
                        <BlockTwoToneIcon sx={{ fontSize: "1.1rem" }} />
                      </IconButton>
                    </Tooltip>
                    {/* )} */}
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
import {
  useGetCVTemplate,
  useGetCVTemplateForStaff,
} from "hooks/use-get-cv-template";
import { useGetCVCategory } from "hooks/use-get-cv-category";
import { StatusChip } from "components/common/chip-status/status-chip";
import {
  useGetSearchParams,
  useSearchParamsNavigation,
} from "hooks/use-get-params";
import { Skeleton, Switch, TablePagination } from "@mui/material";
import { formatDate } from "package/util";
import { RenderCVListTable } from "./CVListTable";

const avatarImage = "/assets/images/users";

// ==============================|| USER LIST 1 ||============================== //
const StatusCV = (status: number) => {
  const switchStatus = [
    { label: "Đã khóa", color: "error" },
    { label: "Hoạt động", color: "success" },
  ];

  return (
    <StatusChip
      color={switchStatus[status].color}
      label={switchStatus[status].label}
    />
  );
};
export const CVList = () => {
  const { cvCategory } = useGetCVCategory();

  const { cvTemplateListPage } = useGetSearchParams(["cvTemplateListPage"]);

  const { push } = useSearchParamsNavigation();

  const handleChangePage = (e: any, page: number) => {
    push([{ name: "cvTemplateListPage", value: page + "" }], true);
  };

  const { cvTemplateStaffList } = useGetCVTemplateForStaff({
    page: cvTemplateListPage + 1,
  });

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
      {cvTemplateStaffList.length > 0 ? (<RenderCVListTable cvTemplateStaffList={cvTemplateStaffList} cvCategory={cvCategory} />) : (SkeletonTable())}

      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Tên CV</TableCell>
              <TableCell>Loại CV</TableCell>
              <TableCell align="center">Số lượt sử dụng</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cvTemplateStaffList &&
              cvTemplateStaffList.map((row, index) => (
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
                  <TableCell>
                    <Typography variant="h5" noWrap>
                      {
                        cvCategory.find((value) => value.id === row.cvCategoryId)
                          ?.description
                      }
                    </Typography>
                  </TableCell>
                  <TableCell align="center">{row.numberUse} lượt</TableCell>
                  <TableCell align="center">
                    {formatDate(row.createdAt, "dd - MM - yyyy")}
                  </TableCell>
                  <TableCell align="center">{StatusCV(row.status)}</TableCell>
                  <TableCell align="center" sx={{ pr: 3 }}>
                    <Switch checked={true} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={100}
          rowsPerPage={10}
          page={cvTemplateListPage ? +cvTemplateListPage : 0}
          onPageChange={handleChangePage}
        />
      </TableContainer> */}
    </>
  );
};

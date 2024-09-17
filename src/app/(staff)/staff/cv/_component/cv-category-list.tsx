"use client";

// material-ui
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { useGetCVCategory } from "hooks/use-get-cv-category";
import { StatusChip } from "components/common/chip-status/status-chip";
import { Switch, TablePagination, ToggleButton } from "@mui/material";
import {
  useGetSearchParams,
  useSearchParamsNavigation,
} from "hooks/use-get-params";
import { RenderCVCategoryListTable } from "./CVCategoryListTable";

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
export const CVCategoryList = ({ refreshTime }: { refreshTime: number }) => {

  const { cvCategoryPage } = useGetSearchParams(["cvCategoryPage"]);
  const { push } = useSearchParamsNavigation();
  const { cvCategory } = useGetCVCategory(+cvCategoryPage + 1, refreshTime);


  const handleChangePage = (e: any, page: number) => {
    push([{ name: "cvCategoryPage", value: page + "" }], true);
  };

  return (
    <>
      {cvCategory && (<RenderCVCategoryListTable cvCategory={cvCategory} />)}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell align="center">Ảnh</TableCell>
              <TableCell align="center">Ngày tạo</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cvCategory &&
              cvCategory.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell sx={{ pl: 3 }}>{row.id}</TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1">{row.description}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Image
                      width={100}
                      height={100}
                      alt="image"
                      src={row.image}
                    ></Image>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell align="center">{StatusCV(1)}</TableCell>
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
          page={cvCategoryPage ? +cvCategoryPage : 0}
          onPageChange={handleChangePage}
        />
      </TableContainer> */}
    </>
  );
};

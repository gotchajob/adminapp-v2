"use client";

import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  useGetSearchParams,
  useSearchParamsNavigation,
} from "hooks/use-get-params";
import { BlogCategory } from "package/api/blog-category";
import { useMemo } from "react";
import { RenderBlogCategoryTable } from "./BlogCategoryTable";

export const BlogCategoryTable = ({
  blogCategoryList,
}: {
  blogCategoryList: BlogCategory[];
}) => {
  const { push } = useSearchParamsNavigation();

  const handleChangePage = (e: any, page: number) => {
    push([{ name: "blogCategoryPage", value: page + "" }], true);
  };

  const { blogCategoryPage } = useGetSearchParams(["blogCategoryPage"]);

  const renderBlog = useMemo(() => {
    const currentPage = blogCategoryPage || "0";
    return blogCategoryList.slice(
      Math.pow(10, +currentPage) - 1,
      Math.pow(10, +currentPage + 1) - 1
    );
  }, [blogCategoryPage, blogCategoryList]);
  return (
    <>
      {blogCategoryList && (
        <RenderBlogCategoryTable
          blogCategoryList={blogCategoryList}
        />
      )}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ pl: 3 }}>#</TableCell>
            <TableCell>Tên</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
              Thực hiện
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderBlog.map((category, index) => (
            <TableRow key={index}>
              <TableCell>{category.id}</TableCell>
              <TableCell>{category.category}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Switch checked={true} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderBlog.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.id}</TableCell>
                <TableCell>{category.category}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell></TableCell>
                <TableCell align="center">
                  <Switch checked={true} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={blogCategoryList.length}
        rowsPerPage={10}
        page={blogCategoryPage ? +blogCategoryPage : 0}
        onPageChange={handleChangePage}
      />
      </TableContainer> */}
    </>
  );
};

"use client";

import Avatar from "@mui/material/Avatar";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { FlexBox } from "components/common/box/flex-box";
import { StyledLink } from "components/common/link/styled-link";
import { Text } from "components/common/text/text";
import {
  useGetSearchParams,
  useSearchParamsNavigation,
} from "hooks/use-get-params";
import { BlogList } from "package/api/blog";
import { BlogCategory } from "package/api/blog-category";
import { formatDate } from "package/util";
import { RenderBlogTable } from "./BlogTable";

export const BlogTable = ({
  blogList,
  totalPage,
  blogCategoryList,
}: {
  blogList: BlogList[];
  totalPage: number;
  blogCategoryList: BlogCategory[];
}) => {
  const { push } = useSearchParamsNavigation();

  const handleChangePage = (e: any, page: number) => {
    push([{ name: "blogPage", value: page + "" }], true);
  };

  const { blogCategoryPage } = useGetSearchParams(["blogPage"]);

  return (
    <>
      {blogList && (<RenderBlogTable blogList={blogList} />)}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Tên Blog</TableCell>
              <TableCell>Nguời tạo</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Ngày tạo</TableCell>
              <TableCell align="center" sx={{ pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogList.map((blog, index) => (
              <TableRow key={index}>
                <TableCell>{blog.id}</TableCell>
                <TableCell>
                  <StyledLink href={"/staff/blog/" + blog.id}>
                    {blog.title}
                  </StyledLink>
                </TableCell>
                <TableCell>
                  <FlexBox>
                    <Avatar src={blog.profile.avatar} />
                    <Text ml={1}>{blog.profile.fullName}</Text>
                  </FlexBox>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{formatDate(blog.createdAt, "dd-MM-yyyy")}</TableCell>
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
          count={totalPage}
          rowsPerPage={10}
          page={blogCategoryPage ? +blogCategoryPage : 0}
          onPageChange={handleChangePage}
        />
      </TableContainer> */}
    </>
  );
};

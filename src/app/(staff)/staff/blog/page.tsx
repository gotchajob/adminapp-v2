"use client";

import { FlexBetween, FlexCenter } from "components/common/box/flex-box";
import { useGetBlogCategory } from "hooks/use-get-blog-category";
import MainCard from "ui-component/cards/MainCard";
import { BlogCategoryTable } from "./_component/blog-category-table";
import { Text } from "components/common/text/text";
import Button from "@mui/material/Button";
import { useGetSearchParams } from "hooks/use-get-params";
import { useState } from "react";
import { CreateBlogCategoryPopup } from "./_component/create-blog-category";
import { useRefresh } from "hooks/use-refresh";
import Stack from "@mui/material/Stack";
import { BlogTable } from "./_component/blog-table";
import { useGetBlogs } from "hooks/use-get-blog";
import { StyledLink } from "components/common/link/styled-link";
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Page() {
  const { blogCategoryPage } = useGetSearchParams(["blogCategoryPage"]);

  const { refresh, refreshTime } = useRefresh();

  const { blogCategory } = useGetBlogCategory({}, refreshTime);

  const [openCreateBlogCategory, setOpenCreateBlogCategory] = useState(false);

  const handleOpenCreateBlogCategory = () => {
    setOpenCreateBlogCategory(!openCreateBlogCategory);
  };

  const { blogs: blogList, totalPage } = useGetBlogs(
    { pageNumber: 1, pageSize: 100 },
    refreshTime
  );

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
    <Stack spacing={3}>
      <MainCard
        title={
          <FlexBetween>
            <Text variant="h4">Danh mục bài viết</Text>
            <Button variant="contained" onClick={handleOpenCreateBlogCategory}>
              Tạo mới
            </Button>
          </FlexBetween>
        }
      >
        {blogCategory.length > 0 ? (<BlogCategoryTable blogCategoryList={blogCategory} />) : (SkeletonTable())}
        <CreateBlogCategoryPopup
          refresh={refresh}
          open={openCreateBlogCategory}
          setOpen={handleOpenCreateBlogCategory}
        />
      </MainCard>
      <MainCard
        title={
          <FlexBetween>
            <Text variant="h4">Danh sách bài viết</Text>
            <StyledLink href={"/staff/blog/create"}>
              <Button variant="contained">Tạo mới</Button>
            </StyledLink>
          </FlexBetween>
        }
      >
        {blogList.length > 0 ? (<BlogTable
          blogList={blogList}
          totalPage={totalPage}
          blogCategoryList={blogCategory}
        />) : (SkeletonTable())}
      </MainCard>
    </Stack>
  );
}

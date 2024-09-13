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

export default function Page() {
  const { blogCategoryPage } = useGetSearchParams(["blogCategoryPage"]);

  const { refresh, refreshTime } = useRefresh();

  const { blogCategory } = useGetBlogCategory({}, refreshTime);

  const [openCreateBlogCategory, setOpenCreateBlogCategory] = useState(false);

  const handleOpenCreateBlogCategory = () => {
    setOpenCreateBlogCategory(!openCreateBlogCategory);
  };

  const { blogs: blogList, totalPage } = useGetBlogs(
    { pageNumber: 1, pageSize: 10 },
    refreshTime
  );
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
        <BlogCategoryTable blogCategoryList={blogCategory} />
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
        <BlogTable
          blogList={blogList}
          totalPage={totalPage}
          blogCategoryList={blogCategory}
        />
      </MainCard>
    </Stack>
  );
}

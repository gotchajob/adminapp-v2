"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { FlexCenter } from "components/common/box/flex-box";
import { UploadImageButton } from "components/common/button/upload-button";
import { Text } from "components/common/text/text";
import ReactDraftWysiwyg from "components/forms/plugins/Wysiwug/ReactDraftWysiwyg";
import { useGetBlogCategory } from "hooks/use-get-blog-category";
import { StaffToken } from "hooks/use-login";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { PostBlog } from "package/api/blog";
import { useState } from "react";
import SubCard from "ui-component/cards/SubCard";

export default function Page({ params }: { params: { id: string } }) {
  const [thumbnail, setThumbnail] = useState(
    "/assets/images/upload/upload.svg"
  );
  const [title, setTitle] = useState("");
  const { staffToken } = StaffToken();
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [categoryId, setCategoryId] = useState(0);
  const router = useRouter()
  const { blogCategory } = useGetBlogCategory({}, 0);
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateBlog = async () => {
    try {
      setIsLoading(true);
      const res = await PostBlog(
        {
          thumbnail,
          title,
          shortDescription,
          content,
          categoryId,
        },
        staffToken
      );
      if (res.status === "error") {
        throw new Error(res.responseText);
      }
      enqueueSnackbar("Tạo thành công", { variant: "success" });
      router.push("/staff/blog")
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Stack spacing={3}>
      <SubCard title="Thông tin bài viết">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <TextField
                label="Tiêu đề bài viết"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField label="Danh mục" select value={categoryId}>
                {blogCategory.map((data, index) => (
                  <MenuItem
                    key={index}
                    value={data.id}
                    onClick={() => {
                      setCategoryId(data.id);
                    }}
                  >
                    {data.category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Mô tả ngắn"
                value={shortDescription}
                multiline
                minRows={3}
                onChange={(e) => {
                  setShortDescription(e.target.value);
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Text variant="h5" mb={5}>
              Tải lên ảnh nền
            </Text>
            <UploadImageButton
              image={thumbnail}
              setImage={(image: string) => {
                setThumbnail(image);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <DialogActions>
              <LoadingButton
                loading={isLoading}
                onClick={handleCreateBlog}
                variant="contained"
              >
                Tạo mới
              </LoadingButton>
            </DialogActions>
          </Grid>
        </Grid>
      </SubCard>
      <SubCard>
        <ReactDraftWysiwyg blogDetail={content} setBlogDetail={setContent} />
      </SubCard>
    </Stack>
  );
}

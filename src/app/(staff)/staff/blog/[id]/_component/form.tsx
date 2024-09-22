"use client";

import LoadingButton from "@mui/lab/LoadingButton";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { UploadImageButton } from "components/common/button/upload-button";
import { Text } from "components/common/text/text";
import ReactDraftWysiwyg from "components/forms/plugins/Wysiwug/ReactDraftWysiwyg";
import { useFormik } from "formik";
import { useGetBlogCategory } from "hooks/use-get-blog-category";
import { StaffToken } from "hooks/use-login";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { PostBlog } from "package/api/blog";
import { useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import * as yup from "yup";

interface BlogFormProps {
  initData: {
    id: number;
    title: string;
    shortDescription: string;
    content: string;
    categoryId: number;
    thumbnail: string;
  };
}

const validationSchema = yup.object().shape({
  title: yup.string().required("Thông tin bắt buộc"),
  shortDescription: yup.string().required("Thông tin bắt buộc"),
});

export const BlogForm = ({ initData }: BlogFormProps) => {
  const [thumbnail, setThumbnail] = useState(initData.thumbnail);
  const { staffToken } = StaffToken();
  const [content, setContent] = useState(initData.content);
  const [categoryId, setCategoryId] = useState(initData.categoryId);
  const router = useRouter();
  const { blogCategory } = useGetBlogCategory({}, 0);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitBlog = async (values: BlogFormProps["initData"]) => {
    try {
      setIsLoading(true);
      const res = await PostBlog(
        {
          ...values,
          thumbnail,
          content,
          categoryId,
        },
        staffToken
      );
      if (res.status === "error") {
        throw new Error(res.responseText);
      }
      enqueueSnackbar("Tạo thành công", { variant: "success" });
      router.push("/staff/blog");
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: initData,
    validationSchema,
    onSubmit: handleSubmitBlog,
  });
  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <SubCard title="Thông tin bài viết">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Stack spacing={2}>
                <TextField
                  label="Tiêu đề bài viết"
                  name="title"
                  onBlur={handleBlur}
                  value={values.title}
                  onChange={handleChange}
                  error={!!touched.title && !!errors.title}
                  helperText={(touched.title && errors.title) as string}
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
                  onBlur={handleBlur}
                  value={values.shortDescription}
                  onChange={handleChange}
                  error={
                    !!touched.shortDescription && !!errors.shortDescription
                  }
                  helperText={
                    (touched.shortDescription &&
                      errors.shortDescription) as string
                  }
                  multiline
                  minRows={3}
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
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                >
                  Tạo mới
                </LoadingButton>
              </DialogActions>
            </Grid>
          </Grid>
        </SubCard>
        <SubCard>
          <ReactDraftWysiwyg data={content} setData={setContent} />
        </SubCard>
      </Stack>
    </form>
  );
};

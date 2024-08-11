"use client";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { PostBlogCategory } from "package/api/blog-category";
import { enqueueSnackbar } from "notistack";
import Stack from "@mui/material/Stack";
export const CreateBlogCategoryPopup = ({
  open,
  setOpen,
  refresh,
}: {
  open: boolean;
  setOpen: () => void;
  refresh: () => void;
}) => {
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleCreateNewBlogCategory = async () => {
    try {
      setIsLoading(true);
      const data = await PostBlogCategory({ category, description });
      if (data.status === "error") {
        throw new Error(data.responseText);
      }
      enqueueSnackbar("Tạo thành công", { variant: "success" });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
      refresh()
    }
  };

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle align="center">Tạo mới danh mục blog</DialogTitle>
      <DialogContent sx={{ pt: "10px !important" }}>
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Nhập tên danh mục"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <TextField
            fullWidth
            label="Nhập mô tả"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={setOpen}>
          Đóng
        </Button>
        <LoadingButton
          onClick={handleCreateNewBlogCategory}
          loading={isLoading}
        >
          Tạo
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

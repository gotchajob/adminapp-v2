"use client";

import React, { useState } from "react";

// material-ui
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";

// project imports
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
// import FilterBox from './_component/filter';

// assets
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  SingleInputDateRangeField,
  LocalizationProvider,
} from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { getDatesBetween } from "package/util";
import { CVList } from "./_component/cv-list";
import { CVCategoryList } from "./_component/cv-category-list";
import Stack from "@mui/material/Stack";
import {
  Box,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { UploadFile } from "@mui/icons-material";
import { UploadImageButton } from "components/common/button/upload-button";
import Image from "next/image";
import { LoadingButton } from "@mui/lab";
import { PostCVCategory } from "package/api/cv-category";
import { CustomerToken, StaffToken } from "hooks/use-login";
import { enqueueSnackbar } from "notistack";
import { useRefresh } from "hooks/use-refresh";
import { useGetCVCategory } from "hooks/use-get-cv-category";
import { StyledLink } from "components/common/link/styled-link";
// import UserList from './_component/UserList';

// ==============================|| USER LIST STYLE 2 ||============================== //

const templateInitValue = {
  name: "",
  description: "",
  image: "/assets/images/upload/upload.svg",
};

const templateValidate = yup.object().shape({
  name: yup.string().required("Thông tin bắt buộc"),
  description: yup.string().required("Thông tin bắt buộc"),
});
const UserPage = () => {
  const { staffToken } = StaffToken();

  const [openCreateNewCategory, setOpenCreateNewCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { refresh, refreshTime } = useRefresh();

  const handleCreateNewCategory = async (value: any) => {
    try {
      setIsLoading(true);
      const data = await PostCVCategory(value, staffToken);
      if (data.status === "error") {
        throw new Error(data.responseText);
      }
      enqueueSnackbar("Tạo danh mục thành công", {
        variant: "success",
      });
    } catch (error: any) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      refresh();
      setIsLoading(true);
      setOpenCreateNewCategory(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: templateInitValue,
    onSubmit: handleCreateNewCategory,
    validationSchema: templateValidate,
  });

  const { cvCategory } = useGetCVCategory();
  return (
    <Stack spacing={3}>
      <MainCard
        title={
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={gridSpacing}
          >
            <Grid item>
              <Typography variant="h4">Danh sách danh mục CV</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={() => {
                  setOpenCreateNewCategory(true);
                }}
              >
                Tạo mới
              </Button>
            </Grid>
          </Grid>
        }
      >
        {/* Data Table */}
        <CVCategoryList refreshTime={refreshTime} />
        <Dialog open={openCreateNewCategory} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle align="center">Tạo mới danh mục</DialogTitle>
            <DialogContent sx={{ pt: "1rem !important" }}>
              <Stack spacing={3}>
                <TextField
                  name="name"
                  onBlur={handleBlur}
                  value={values.name}
                  onChange={handleChange}
                  error={!!touched.name && !!errors.name}
                  helperText={(touched.name && errors.name) as string}
                  label="Tên danh mục"
                  fullWidth
                />
                <TextField
                  name="description"
                  multiline
                  minRows={3}
                  onBlur={handleBlur}
                  value={values.description}
                  onChange={handleChange}
                  error={!!touched.description && !!errors.description}
                  helperText={
                    (touched.description && errors.description) as string
                  }
                  label="Mô tả"
                  fullWidth
                />
                <UploadImageButton
                  image={values.image}
                  setImage={(image: string) => {
                    setFieldValue("image", image);
                  }}
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                color="error"
                onClick={() => {
                  setOpenCreateNewCategory(false);
                }}
              >
                Đóng
              </Button>
              <LoadingButton type="submit" variant="contained">
                Tạo
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      </MainCard>

      {/* Layout Table */}
      <MainCard
        title={
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={gridSpacing}
          >
            <Grid item>
              <Typography variant="h4">Danh sách CV</Typography>
            </Grid>
            <Grid item>
              <StyledLink href={"/staff/cv/create"}>
                <Button variant="contained">Tạo mới</Button>
              </StyledLink>
            </Grid>
          </Grid>
        }
      >
        {/* Data Table */}
        <CVList />
      </MainCard>
    </Stack>
  );
};

export default UserPage;

"use client";

import React from "react";

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
// import UserList from './_component/UserList';

// ==============================|| USER LIST STYLE 2 ||============================== //

const UserPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<
    Element | (() => Element) | null | undefined
  >(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Filter Card */}
      {/* <FilterBox /> */}

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
              <Typography variant="h3">Danh sách CV</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        }
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={["SingleInputDateRangeField"]}>
            <SingleInputDateRangeField
              label="Chọn ngày giờ"
              format="dd/MM/yyyy"
              onChange={(value) => {
              
                console.log(getDatesBetween(value as Date[]));
              }}
            />
          </DemoContainer>
        </LocalizationProvider>

        {/* Data Table */}
        {/* <UserList /> */}
        <Grid item xs={12} sx={{ mt: 1.75 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={10} color="primary" />
            </Grid>
            <Grid item>
              <Button
                variant="text"
                size="large"
                sx={{ color: "grey.900" }}
                color="secondary"
                endIcon={<ExpandMoreRoundedIcon />}
                onClick={handleClick}
              >
                10 Rows
              </Button>
              <Menu
                id="menu-user-list-style2"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                variant="selectedMenu"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose}> 10 Rows</MenuItem>
                <MenuItem onClick={handleClose}> 20 Rows</MenuItem>
                <MenuItem onClick={handleClose}> 30 Rows </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default UserPage;

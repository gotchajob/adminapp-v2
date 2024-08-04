"use client";
import {
  Grid,
  Typography,
  Pagination,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";
import { useState } from "react";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import InterviewQuestionList from "./_component/interview-question-list";

export default function Page() {
  const [anchorEl, setAnchorEl] = useState<
    Element | (() => Element) | null | undefined
  >(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
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
              <Typography variant="h3">Danh sách khách hàng</Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        }
      >
        <InterviewQuestionList />
        {/* Data Table */}
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
}

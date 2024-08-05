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
import MainCard from "ui-component/cards/MainCard";
import { gridSpacing } from "store/constant";

// assets
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import TransactionFilter from "./_component/filter";
import TransactionList from "./_component/transaction-list";

const ListStylePage2 = () => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    console.log(`Current Page: ${page}`);
  };

  const handleRowsChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
    handleClose();
    console.log(`Rows per Page: ${rows}`);
  };

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TransactionFilter />
      <MainCard
        title={
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={gridSpacing}
          >
            <Grid item>
              <Typography variant="h3">Danh sách giao dịch</Typography>
            </Grid>
          </Grid>
        }
      >
        {/* Truyền rowsPerPage và currentPage vào TransactionList */}
        <TransactionList rowsPerPage={rowsPerPage} currentPage={currentPage} totalPage={totalPage} />
        <Grid item xs={12} sx={{ mt: 1.75 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination
                count={totalPage}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
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
                {rowsPerPage} Rows
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
                <MenuItem onClick={() => handleRowsChange(5)}>5 Rows</MenuItem>
                <MenuItem onClick={() => handleRowsChange(10)}>10 Rows</MenuItem>
                <MenuItem onClick={() => handleRowsChange(15)}>15 Rows</MenuItem>
                <MenuItem onClick={() => handleRowsChange(20)}>20 Rows</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default ListStylePage2;

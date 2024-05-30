'use client';

import React, { useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

// project imports
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import FilterBox from './_component/filter';

// assets
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { apiServerFetch } from 'package/api/api-fetch';
import { GetUser } from 'package/api/user';
import { IconSearch } from '@tabler/icons-react';
import { GetUserList } from 'package/api/user';
import UserList from './_component/UserList';

// ==============================|| USER LIST STYLE 2 ||============================== //

const UserPage = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Filter Card */}
      <FilterBox />

      {/* Layout Table */}
      <MainCard
        title={
          <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
            <Grid item>
              <Typography variant="h3">User List</Typography>
            </Grid>
            <Grid item>
            </Grid>
          </Grid>
        }
      >

        {/* Data Table */}
        <UserList />
        <Grid item xs={12} sx={{ mt: 1.75 }}>
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Pagination count={10} color="primary" />
            </Grid>
            <Grid item>
              <Button
                variant="text"
                size="large"
                sx={{ color: 'grey.900' }}
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
                  vertical: 'top',
                  horizontal: 'right'
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
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

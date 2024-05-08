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
import UserList from 'components/users/list/Style1/UserList-admin';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// assets
import { IconSearch } from '@tabler/icons-react';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { GetUser } from 'package/api/user';

// ==============================|| USER LIST STYLE 2 ||============================== //

const ListStylePage2 = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | (() => Element) | null | undefined>(null);

  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUser = async () => {
    const data = await GetUser({ limit: 1, page: 1, sortBy: 'createdAt', sortOrder: 'asc' }, "Phu");
    console.log("user data:", data);
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <MainCard
      title={
        <Grid container justifyContent="space-between" alignItems="center" spacing={gridSpacing}>
          <Grid item>
            <Typography variant="h3">User List</Typography>
          </Grid>
          <Grid item>
            <OutlinedInput
              id="input-search-list-style2"
              placeholder="Search"
              startAdornment={
                <InputAdornment position="start">
                  <IconSearch stroke={1.5} size="16px" />
                </InputAdornment>
              }
              size="small"
            />
          </Grid>
        </Grid>
      }
    >
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
  );
};

export default ListStylePage2;

'use client';

import React from 'react';

// material-ui
import { Button, Chip, Grid, TextField, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

//mui-x
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { SingleInputDateRangeField } from '@mui/x-date-pickers-pro/SingleInputDateRangeField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/lab';
import { DateTimePicker } from '@mui/x-date-pickers';

// assets

const FilterBox = () => {
  const [valueBasic, setValueBasic] = React.useState<Date | null>(new Date());

  const top100Films = [
    { label: 'The Dark Knight', id: 1 },
    { label: 'Control with Control', id: 2 },
    { label: 'Combo with Solo', id: 3 },
    { label: 'The Dark', id: 4 },
    { label: 'Fight Club', id: 5 },
    { label: 'demo@company.com', id: 6 },
    { label: 'Pulp Fiction', id: 7 }
  ];

  const filter_box_1 = [
    { label: 'Số điện thoại', id: 1 },
    { label: 'Email', id: 2 }
    // { label: 'Mã', id: 3 },
  ];

  const filter_box_2 = [
    { label: 'Cũ nhất', id: 1 },
    { label: 'Mới nhất', id: 2 },
    { label: 'Trong tháng', id: 2 },
    { label: 'Trong năm', id: 2 }
  ];

  const filter_box_3 = [
    { label: 'Chặn', id: 1 },
    { label: 'Không Chặn', id: 2 }
  ];

  const filter_box_4 = [
    { label: 'Thành phố Hồ Chí Minh', id: 1 },
    { label: 'Hà Nội', id: 2 }
  ];

  return (
    <>
      <MainCard
        title={
          <Grid container justifyContent="space-between" spacing={gridSpacing}>
            <Grid item>
              <Typography variant="h3">Bộ lọc</Typography>
            </Grid>
          </Grid>
        }
        sx={{ my: 2 }}
      >
        <Grid container spacing={2}>
          {/* BOX-1 */}
          <Grid item lg={12} xs={12}>
            <SubCard title="Tìm Kiếm">
              <Grid container justifyContent="space-evenly" alignItems="center" spacing={gridSpacing}>
                <Grid item lg={5}>
                  <Autocomplete
                    disableClearable
                    options={filter_box_1}
                    defaultValue={filter_box_1[1]}
                    renderInput={(params) => <TextField {...params} label="Tìm kiếm theo" />}
                  />
                </Grid>
                <Grid item lg={7}>
                  <TextField fullWidth label="Nhập email/sđt cần tìm" />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          {/* BOX-2 */}
          <Grid item lg={8}>
            <SubCard title="Lọc theo thời gian">
              <Grid container justifyContent="center" alignItems="center" spacing={gridSpacing}>
                <Grid item lg={5}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={filter_box_2}
                    filterSelectedOptions
                    renderOption={(props, option) => {
                      return (
                        <li {...props} key={option.id}>
                          {option.label}
                        </li>
                      );
                    }}
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.id} label={option.label} />);
                    }}
                    renderInput={(params) => <TextField {...params} label="Chọn thời điểm" />}
                  />
                </Grid>
                <Grid item lg={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      slotProps={{ textField: { fullWidth: true } }}
                      label="From"
                      value={valueBasic}
                      onChange={(newValue: Date | null) => {
                        setValueBasic(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item>
                  <Typography>━</Typography>
                </Grid>
                <Grid item lg={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      slotProps={{ textField: { fullWidth: true } }}
                      label="To"
                      value={valueBasic}
                      onChange={(newValue: Date | null) => {
                        setValueBasic(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          {/* BOX-3 */}
          <Grid item lg={4}>
            <SubCard title="Lọc theo trạng thái">
              <Grid container justifyContent="center" alignItems="center" spacing={gridSpacing}>
                <Grid item lg={6} xs={6}>
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={filter_box_3}
                    // defaultValue={[filter_box_3[0], filter_box_3[1]]}
                    // renderOption={(props, option) => {
                    //     return (
                    //         <li {...props} key={option.id}>
                    //             {option.label}
                    //         </li>
                    //     );
                    // }}
                    filterSelectedOptions
                    renderTags={(tagValue, getTagProps) => {
                      return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.id} label={option.label} />);
                    }}
                    renderInput={(params) => <TextField {...params} label="Chọn theo trạng thái" />}
                  />
                </Grid>
              </Grid>
            </SubCard>
          </Grid>

          <Grid item lg={12} xs={12}>
            <Grid item lg={12} xs={12}>
              <Grid container justifyContent="space-evenly" alignItems="center" spacing={gridSpacing}>
                <Grid item lg={6} xs={6}></Grid>
                <Grid item lg={6} xs={6}>
                  <Grid container justifyContent="flex-end" spacing={gridSpacing}>
                    <Grid item>
                      <Button variant="outlined" color="error">
                        Xóa lọc
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button variant="contained">Lọc</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </>
  );
};

export default FilterBox;

'use client';

import React from 'react';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

//mui-x
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/lab';
import { DateTimePicker } from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// assets

const FilterBox = () => {
  const [valueBasic, setValueBasic] = React.useState<Date | null>(new Date());

  const filter_box_1 = [
    { label: 'Số điện thoại', id: 1 },
    { label: 'Email', id: 2 }
  ];

  const filter_box_2 = [
    { label: 'Ngày tạo', id: 1 },
    { label: 'Ngày cập nhật', id: 2 }
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
      <MainCard title={<Typography variant="h4">Bộ lọc</Typography>} sx={{ my: 2 }}>
        <Grid container spacing={2}>
          {/* BOX-1 */}
          <Grid item lg={12} xs={12}>
            <Grid container justifyContent="space-evenly" alignItems="center" spacing={2}>
              <Grid item lg={3}>
                <Autocomplete
                  disableClearable
                  options={filter_box_1}
                  defaultValue={filter_box_1[1]}
                  renderInput={(params) => <TextField {...params} label="Tìm kiếm theo" />}
                />
              </Grid>
              <Grid item lg={9}>
                <TextField fullWidth label="Nhập email/sđt cần tìm" />
              </Grid>
            </Grid>
          </Grid>

          {/* BOX-2 */}
          <Grid item lg={8}>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item lg={4.35}>
                <Autocomplete
                  id="tags-outlined"
                  options={filter_box_2}
                  filterSelectedOptions
                  renderInput={(params) => <TextField {...params} label="Chọn thời điểm" />}
                />
              </Grid>
              <Grid item lg={0.25}></Grid>
              <Grid item lg={3.5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="From"
                    format="dd-MM-yyyy"
                    value={valueBasic}
                    onChange={(newValue: Date | null) => {
                      setValueBasic(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={0.9}>
                <Typography textAlign={'center'}>━</Typography>
              </Grid>
              <Grid item lg={3}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    label="To"
                    value={valueBasic}
                    format="dd-MM-yyyy"
                    onChange={(newValue: Date | null) => {
                      setValueBasic(newValue);
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          {/* BOX-3 */}
          <Grid item lg={4}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={filter_box_3}

              filterSelectedOptions
              renderTags={(tagValue, getTagProps) => {
                return tagValue.map((option, index) => <Chip {...getTagProps({ index })} key={option.id} label={option.label} />);
              }}
              renderInput={(params) => <TextField {...params} label="Chọn theo trạng thái" />}
            />
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

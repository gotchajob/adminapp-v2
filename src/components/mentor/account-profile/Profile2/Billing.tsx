'use client';

import React from 'react';
import { useEffect } from 'react';
// material-ui
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// project imports
import { gridSpacing } from 'store/constant';
import { getDataCity } from 'package/api/api-fetch';

// select options
const cities = [
  {
    value: '1',
    label: 'Los Angeles'
  },
  {
    value: '2',
    label: 'Chicago'
  },
  {
    value: '3',
    label: 'Phoenix'
  },
  {
    value: '4',
    label: 'San Antonio'
  }
];

const getCitiesData = getDataCity('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100');
console.log(getCitiesData);

const countries = [
  {
    value: '1',
    label: 'India'
  },
  {
    value: '2',
    label: 'France'
  },
  {
    value: '3',
    label: 'USA'
  },
  {
    value: '4',
    label: 'UAE'
  }
];

interface City {
  id: number;
  name: string;
}
// ==============================|| PROFILE 2 - BILLING ||============================== //

const Billing = () => {
  const [city, setCity] = React.useState('1');
  const [cityData, setCityData] = React.useState<City[]>([]);
  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const [Country, setCountry] = React.useState('1');
  const handleSelectChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value);
  };

  const [state1, setState1] = React.useState({
    checkedA: true
  });
  const handleChangeState1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState1({ ...state1, [event.target.name]: event.target.checked });
  };

  // useEffect(() => {
  //   // Sử dụng một hàm tự gọi async bên trong useEffect
  //   (async () => {
  //     try {
  //       // Gọi getDataCity và chờ dữ liệu trả về
  //       const cityData = await getDataCity('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100');
  //       // Log dữ liệu thành phố ra console
  //       console.log(cityData);
  //     } catch (error) {
  //       console.error('Failed to fetch city data', error);
  //     }
  //   })();
  // }, []);
  useEffect(() => {
    fetch('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100')
      .then((resp) => resp.json())
      .then((json) => {
        setCityData(json.results)
        console.log(cityData);
      })
      .catch((err) => console.error('Error fetching city data: ' + err.message));
  })
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Tax Number#" defaultValue="" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Company Name" defaultValue=" Dardan Ranch" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Street Line 1" defaultValue="Nathaniel Ports" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField fullWidth label="Street Line 2" defaultValue="nr. Oran Walks" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField fullWidth label="Postcode" defaultValue="395005" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField id="standard-select-category" select label="Select Provinces" value={city} fullWidth onChange={handleChangeCity}>
          {cities.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField id="standard-select-country" select label="Select City" value={Country} fullWidth onChange={handleSelectChange1}>
          {cityData.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox checked={state1.checkedA} onChange={handleChangeState1} name="checkedA" color="primary" />}
          label="Same as billing address"
        />
      </Grid>
    </Grid>
  );
};

export default Billing;

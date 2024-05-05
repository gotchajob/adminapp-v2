'use client';

import { useState, useEffect } from 'react';
import React from 'react';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// project imports
import useAuth from 'hooks/useAuth';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { gridSpacing } from 'store/constant';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Typography from '@mui/material/Typography';

function LinearProgressWithLabel({ value, ...others }: LinearProgressProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Box
        sx={{
          width: '100%',
          mr: 1
        }}
      >
        <LinearProgress value={value} {...others} />
      </Box>
      <Box
        sx={{
          minWidth: 35
        }}
      >
        <Typography variant="body2" color="textSecondary">{`${Math.round(value!)}%`}</Typography>
      </Box>
    </Box>
  );
}


interface City {
  id: number;
  name: string;
}

interface Provinces {
  id: number;
  name: string;
}

interface Ward {
  id: number;
  name: string;
}


// select options
const currencies = [
  {
    value: 'Washington',
    label: 'Washington'
  },
  {
    value: 'India',
    label: 'India'
  },
  {
    value: 'Africa',
    label: 'Africa'
  },
  {
    value: 'New-York',
    label: 'New York'
  },
  {
    value: 'Malaysia',
    label: 'Malaysia'
  }
];

const experiences = [
  {
    value: 'Startup',
    label: 'Startup'
  },
  {
    value: '2-year',
    label: '2 year'
  },
  {
    value: '3-year',
    label: '3 year'
  },
  {
    value: '4-year',
    label: '4 year'
  },
  {
    value: '5-year',
    label: '5 year'
  }
];


// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //

const FormRegister = () => {
  const { user } = useAuth();
  const [citySelected, setCitySelected] = useState(false);
  const [provincesSelected, setProvincesSelected] = useState(false);
  const [city, setCity] = useState('');
  const [provincesData, setProvincesData] = React.useState<Provinces[]>([]);
  const [cityData, setCityData] = React.useState<City[]>([]);
  const [wardData, setWardData] = React.useState<Ward[]>([]);
  const [provinces, setProvinces] = useState('');
  const [ward, setWards] = useState('');
  const [skillName, setSkillName] = useState('');
  const [skillValue, setSkillValue] = useState(0);
  const [skills, setSkills] = useState<{ name: string; value: number; }[]>([]);


  const handleChangeProvince = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
    if (city) {
      setCitySelected(true);
    }
    console.log(event.target.value);
    try {
      const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/provinces/${event.target.value}`);
      const json = await response.json();
      console.log('Provinces data:', json);
      setProvincesData(json.districts);
    } catch (error) {
      console.error('Error fetching provinces data:', error);
    }
  }

  const handleChangeWards = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvinces(event.target.value);
    if (provinces) {
      setProvincesSelected(true);
    }
    try {
      const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/districts/${event.target.value}`);
      const json = await response.json();
      console.log('Wards data:', json);
      setWardData(json.wards);
    } catch (error) {
      console.error('Error fetching provinces data:', error);
    }
  }

  const handleChangeWard = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target.value;
    setWards(data);
  }

  const [experience, setExperience] = useState('Startup');
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperience(event.target.value);
  };


  useEffect(() => {
    fetch('https://vnprovinces.pythonanywhere.com/api/provinces/?basic=true&limit=100')
      .then((resp) => resp.json())
      .then((json) => {
        setCityData(json.results); // Giả sử json.results là một mảng các đối tượng {id: number, name: string}
        console.log('city data:' + cityData);
      })
      .catch((error) => console.error('Error fetching city data:', error));
  }, []);

  const handleSubmit = () => {
    // Kiểm tra nếu skillName không rỗng và skillValue nằm trong khoảng từ 0 đến 100
    if (skillName && skillValue >= 0 && skillValue <= 100) {
      // Thêm kỹ năng mới vào mảng skills
      setSkills([...skills, { name: skillName, value: skillValue }]);
      // Reset giá trị của skillName và skillValue về trạng thái mặc định
      setSkillName('');
      setSkillValue(0);
    } else {
      // Hiển thị thông báo lỗi nếu dữ liệu không hợp lệ
      alert('Please enter valid skill name and value (between 0 and 100)');
    }
  };


  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={12}>
        <SubCard title="Personal Information">
          <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-basic1" fullWidth label="Name" defaultValue={user?.name} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-basic1" fullWidth label="Age" defaultValue={0} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-select-currency" select fullWidth label="City" value={city} onChange={handleChangeProvince} >
                  {cityData.map((option) => (
                    <MenuItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-select-currency" select fullWidth label="Province" value={provinces} onChange={handleChangeWards} disabled={!citySelected} helperText={!citySelected ? "Please select City first" : ""}>
                  {provincesData.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                  {/* <TextField>Hi</TextField> */}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-select-currency" select fullWidth label="Ward" value={ward} onChange={handleChangeWard} disabled={!provincesSelected} helperText={!provincesSelected ? "Please select province first" : ""}>
                  {wardData.map((option) => (
                    <MenuItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="More detail about your address"
                  // multiline
                  fullWidth
                  defaultValue="123A - An Phu Street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static1"
                  label="Bio"
                  multiline
                  fullWidth
                  rows={3}
                  defaultValue="I consider myself as a creative, professional and a flexible person. I can adapt with any kind of brief and design style"
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <TextField id="outlined-select-experience" select fullWidth label="Experience" value={experience} onChange={handleChange2}>
                  {experiences.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid> */}
            </Grid>
          </form>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <SubCard title="Contact Information">
          <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-basic2" fullWidth label="Contact Phone" defaultValue="(+99) 9999 999 999" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="outlined-basic3" fullWidth label="Email" defaultValue="demo@sample.com" />
              </Grid>
              <Grid item xs={12}>
                <TextField id="outlined-basic4" fullWidth label="Portfolio Url" defaultValue="https://demo.com" />
              </Grid>
            </Grid>
          </form>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <SubCard title="Social Information">
          <form noValidate autoComplete="off">
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item>
                <FacebookIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <TextField fullWidth label="Facebook Profile Url" />
              </Grid>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" size="small" color="secondary">
                    Connect
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item>
                <TwitterIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <TextField fullWidth label="Twitter Profile Url" />
              </Grid>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" size="small" color="secondary">
                    Connect
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item>
                <LinkedInIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <TextField fullWidth label="LinkedIn Profile Url" />
              </Grid>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" size="small" color="secondary">
                    Connect
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <SubCard title="Education">
          <form noValidate autoComplete="off">
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item xs zeroMinWidth>
                <TextField fullWidth label="First Certification" />
              </Grid>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" size="small" color="secondary">
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item xs zeroMinWidth>
                <TextField fullWidth label="Second Certification" />
              </Grid>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" size="small" color="secondary">
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item xs zeroMinWidth>
                <TextField fullWidth label="Third Certification" />
              </Grid>
              <Grid item>
                <AnimateButton>
                  <Button variant="contained" size="small" color="secondary">
                    Submit
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        </SubCard>
        {/* <SubCard title="Skills">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Junior</Typography>
              <LinearProgressWithLabel color="primary" variant="determinate" value={70} aria-label="junior-skill-progress" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">UX Researcher</Typography>
              <LinearProgressWithLabel color="primary" variant="determinate" value={80} aria-label="UX-Researcher-skill-progress" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Wordpress</Typography>
              <LinearProgressWithLabel color="secondary" variant="determinate" value={25} aria-label="Wordpress-skill-progress" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">Graphic Designer</Typography>
              <LinearProgressWithLabel color="primary" variant="determinate" value={80} aria-label="Designer-skill-progress" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">HTML</Typography>
              <LinearProgressWithLabel color="secondary" variant="determinate" value={45} aria-label="HTML-skill-progress" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2">PHP</Typography>
              <LinearProgressWithLabel color="primary" variant="determinate" value={65} aria-label="PHP-skill-progress" />
            </Grid>
          </Grid>
        </SubCard> */}
      </Grid>
      <Grid item xs={12} md={12}>
        <SubCard title="Skills">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Skill Name"
                fullWidth
                value={skillName}
                onChange={(e) => setSkillName(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Skill Abilities"
                fullWidth
                type="number"
                value={skillValue}
                onChange={(e) => setSkillValue(parseInt(e.target.value))}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Grid>
            {skills.map((skill, index) => (
              <Grid item xs={12} md={12} key={index}>
                <Typography variant="body2">{skill.name}</Typography>
                <LinearProgressWithLabel color="primary" variant="determinate" value={skill.value} aria-label={`${skill.name}-skill-progress`} />
              </Grid>
            ))}
          </Grid>
        </SubCard>
      </Grid>
    </Grid>
  );
};

export default FormRegister;

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


//api
import { fetchDistrictData, fetchProvinceDetailData, fetchProvinceData } from 'app/api/mentor/city';
import { Select } from '@mui/material';



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
    const [skills, setSkills] = useState<{ name: string; }[]>([]);

    // const clickCity = async () => {
    //     const json = await fetchProvinceData();
    //     console.log('city data' + json);
    //     setCityData(json);
    // }


    // const handleChangeProvince = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setCity(event.target.value);
    //     if (city) {
    //         setCitySelected(true);
    //     }
    //     console.log(event.target.value);
    //     try {
    //         // const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/provinces/${event.target.value}`);
    //         // const json = await response.json();
    //         const json = await fetchProvinceDetailData(event.target.value);
    //         setProvincesData(json);
    //     } catch (error) {
    //         console.error('Error fetching provinces data:', error);
    //     }
    // }
    const handleChangeProvince = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedCity = event.target.value;
        setCity(selectedCity);
        if (selectedCity) {
            setCitySelected(true);
            try {
                // Lấy danh sách thành phố và lưu vào state cityData trước
                const cities = await fetchProvinceData();
                setCityData(cities);
                // Gọi hàm fetchProvinceDetailData để lấy thông tin chi tiết của thành phố đã chọn
                const provinceDetail = await fetchProvinceDetailData(selectedCity);
                // Lưu thông tin chi tiết vào state provincesData
                setProvincesData(provinceDetail);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }


    const handleChangeWards = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvinces(event.target.value);
        if (provinces) {
            setProvincesSelected(true);
        }
        try {
            // const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/districts/${event.target.value}`);
            // const json = await response.json();
            const json = await fetchDistrictData(event.target.value);
            setWardData(json);
        } catch (error) {
            console.error('Error fetching provinces data:', error);
        }
    }

    const handleChangeWard = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        setWards(data);
    }

    const handleSubmit = () => {
        // Kiểm tra nếu skillName không rỗng và skillValue nằm trong khoảng từ 0 đến 100
        if (skillName && skillValue >= 0 && skillValue <= 100) {
            // Thêm kỹ năng mới vào mảng skills
            setSkills([...skills, { name: skillName }]);
            console.log(skills);
            // Reset giá trị của skillName và skillValue về trạng thái mặc định
            setSkillName('');
        } else {
            // Hiển thị thông báo lỗi nếu dữ liệu không hợp lệ
            alert('Please enter valid skill name and value (between 0 and 100)');
        }
    };



    return (
        <Grid style={{ marginTop: '3%', marginLeft: '17%', marginRight: '17%', marginBottom: '5%' }}>
            <form noValidate autoComplete="off">
                <Grid item xs={12} md={12} style={{ margin: '2%' }}>
                    <SubCard title="Personal Information">

                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic1" fullWidth label="Name" defaultValue={user?.name} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic1" fullWidth label="Age" defaultValue={0} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-select-currency" select fullWidth label="City" value={city} onChange={handleChangeProvince}>
                                    {cityData?.map((option) => (
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

                    </SubCard>
                </Grid>
                <Grid item xs={12} md={12} style={{ margin: '2%' }}>
                    <SubCard title="Contact Information">
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
                    </SubCard>
                </Grid>
                <Grid item xs={12} md={12} style={{ margin: '2%' }}>
                    <SubCard title="Social Information">

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

                    </SubCard>
                </Grid>
                <Grid item xs={12} md={12} style={{ margin: '2%' }}>
                    <SubCard title="Education">

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

                    </SubCard>
                </Grid>
                <Grid item xs={12} md={12} style={{ margin: '2%' }}>
                    <SubCard title="Skills">
                        <Grid container spacing={2}>
                            <Grid item xs={10} md={8}>
                                <TextField
                                    label="Skill Name"
                                    fullWidth
                                    value={skillName}
                                    onChange={(e) => setSkillName(e.target.value)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2} md={4}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    value="Basic"
                                >
                                    <MenuItem value={"Basic"}>Basic</MenuItem>
                                    <MenuItem value={"Intermiate"}>Intermiate</MenuItem>
                                    <MenuItem value={"Advanced"}>Advanced</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                            </Grid>
                            {skills.map((skill, index) => (
                                <Grid item xs={12} md={12} key={index}>
                                    <Typography variant="body2">{skill.name}</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </SubCard>
                </Grid>
            </form>
        </Grid>
    );
};

export default FormRegister;

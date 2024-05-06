'use client'
import React from 'react'

import { useState, useEffect } from 'react';
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

// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

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

const formCreate = () => {
    // const { user } = useAuth();

    const [city, setCity] = useState('');
    const [provincesData, setProvincesData] = React.useState<Provinces[]>([]);
    const [cityData, setCityData] = React.useState<City[]>([]);
    const [wardData, setWardData] = React.useState<Ward[]>([]);
    const [provinces, setProvinces] = useState('');
    const [ward, setWards] = useState('');
    const [name, setName] = useState('');
    const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const handleChangeProvince = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value); // Cập nhật ID của tỉnh/thành phố đã chọn
        console.log(event.target.value);
        try {
            const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/provinces/${event.target.value}`);
            const json = await response.json();
            console.log('Provinces data:', json);
            setProvincesData(json.districts); // Giả sử json.results là một mảng các đối tượng {id: number, name: string}
        } catch (error) {
            console.error('Error fetching provinces data:', error);
        }
    }

    const handleChangeWards = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setProvinces(event.target.value); // Cập nhật ID của tỉnh/thành phố đã chọn
        console.log(event.target.value);
        try {
            const response = await fetch(`https://vnprovinces.pythonanywhere.com/api/districts/${event.target.value}`);
            const json = await response.json();
            console.log('Wards data:', json);
            setWardData(json.wards); // Giả sử json.results là một mảng các đối tượng {id: number, name: string}
        } catch (error) {
            console.error('Error fetching provinces data:', error);
        }
    }

    const handleChangeWard = (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = event.target.value;
        setWards(data);
    }

    // const handleChangeTest = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const data = event.target.value;
    //     console.log('data:', data);
    // }

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
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
                <SubCard title="Personal Information">
                    <form noValidate autoComplete="off">
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-basic1" fullWidth label="Name" defaultValue={"Nguyễn Văn A"} onChange={handleChangeName} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-select-currency" select fullWidth label="City" value={city} onChange={handleChangeProvince}>
                                    {cityData.map((option) => (
                                        <MenuItem key={option.id} value={option.id.toString()}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-select-currency" select fullWidth label="Province" value={provinces} onChange={handleChangeWards}>
                                    {provincesData.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                    {/* <TextField>Hi</TextField> */}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-select-currency" select fullWidth label="Ward" value={ward} onChange={handleChangeWard}>
                                    {wardData.map((option) => (
                                        <MenuItem key={option.id} value={option.id.toString()}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                            <Grid item xs={12} md={6}>
                                <TextField id="outlined-select-experience" select fullWidth label="Experience" value={experience} onChange={handleChange2}>
                                    {experiences.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={6}>
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
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static2"
                                    label="Address"
                                    multiline
                                    fullWidth
                                    rows={3}
                                    defaultValue="3379  Monroe Avenue, Fort Myers, Florida(33912)"
                                />
                            </Grid>
                        </Grid>
                    </form>
                </SubCard>
            </Grid>
            <Grid item xs={12} md={6}>
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
        </Grid>
    )
}

export default formCreate
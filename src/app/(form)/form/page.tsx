'use client';

import React, { useState } from 'react';

// material-ui
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// project imports
import Autocomplete from '@mui/material/Autocomplete';
import useAuth from 'hooks/useAuth';
import { enqueueSnackbar } from 'notistack';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as yup from 'yup';
import { useFormik } from 'formik';


// assets
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import Typography from '@mui/material/Typography';
import Image from 'next/image';



//api
// import { fetchDistrictData, fetchProvinceDetailData, fetchProvinceData } from 'app/api/mentor/city';

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

const logo = '/assets/images/logo/logo.png';


// ==============================|| PROFILE 1 - PROFILE ACCOUNT ||============================== //

const FormRegister = () => {
    const { user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const [citySelected, setCitySelected] = useState(false);

    const [provincesSelected, setProvincesSelected] = useState(false);

    const [city, setCity] = useState('');

    const [provincesData, setProvincesData] = useState<Provinces[]>([]);

    const [cityData, setCityData] = useState<City[]>([]);

    const [wardData, setWardData] = useState<Ward[]>([]);

    const [provinces, setProvinces] = useState('');

    const [ward, setWards] = useState('');

    const [valueBasic, setValueBasic] = React.useState<Date | null>(null);

    const initialValues = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
    };

    const formSchema = yup.object().shape({

    })

    const handleFormSubmit = async (value: any) => {
    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        onSubmit: handleFormSubmit,
        validationSchema: formSchema
    });

    const handleChangeProvince = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // const selectedCity = event.target.value;
        // setCity(selectedCity);
        // if (selectedCity) {
        //     setCitySelected(true);
        //     try {
        //         // Lấy danh sách thành phố và lưu vào state cityData trước
        //         const cities = await fetchProvinceData();
        //         setCityData(cities);
        //         // Gọi hàm fetchProvinceDetailData để lấy thông tin chi tiết của thành phố đã chọn
        //         const provinceDetail = await fetchProvinceDetailData(selectedCity);
        //         // Lưu thông tin chi tiết vào state provincesData
        //         setProvincesData(provinceDetail);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        // }
    }


    const handleChangeWard = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // setProvinces(event.target.value);
        // if (provinces) {
        //     setProvincesSelected(true);
        // }
        // try {
        //     const json = await fetchDistrictData(event.target.value);
        //     setWardData(json);
        // } catch (error) {
        //     console.error('Error fetching provinces data:', error);
        // }
    }

    const handleSkillChange = (event, value) => {
        console.log(value);
    };

    const SkillNames = [
        { id: 1, name: "mongoDB" },
        { id: 2, name: "Express" },
        { id: 3, name: "ReactJS" },
        { id: 4, name: "NodeJS" },
    ]

    const handleAddSkill = () => {
        return (
            <Grid container spacing={2} alignItems="center" justifyContent="center">
                <Grid item lg={6}>
                    <Autocomplete
                        disablePortal
                        options={SkillNames}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        defaultValue={SkillNames[SkillNames?.length]}
                        onChange={handleSkillChange}
                        renderInput={(params) => <TextField {...params} label="Skill name" />}
                    />
                </Grid>
                <Grid item lg={4}>
                    <TextField fullWidth label="Đường dẫn chứng chỉ" />
                </Grid>
                <Grid item lg={1}>
                    <IconButton aria-label="add" onClick={handleAddSkill}>
                        <AddIcon />
                    </IconButton>
                </Grid>
                <Grid item lg={1}>
                    <IconButton aria-label="remove">
                        <ClearIcon />
                    </IconButton>
                </Grid>
            </Grid>
        )
    }

    return (
        <MainCard>
            <Grid container alignItems="center" justifyContent="center">
                <Grid item container lg={6} alignItems="center" justifyContent="center">

                    {/* FORM */}
                    <form autoComplete="on" onSubmit={handleSubmit}>
                        <SubCard>

                            {/* Logo Section */}
                            <Grid item lg={12} sx={{ margin: "2%" }}>
                                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                                    <Grid item>
                                        <Image src={logo} height={210} width={210} alt="Gotchajob_logo" style={{ maxWidth: '100%', height: '100%', marginTop: '6px' }} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h1" sx={{ color: '#0782C6', fontWeight: 800, fontFamily: 'Arial, sans-serif' }}>
                                            Expert Registry
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Personal Information Subcard */}
                            <Grid item lg={12} sx={{ margin: "2%" }}>
                                <SubCard title="Thông tin cá nhân">
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item lg={6}>
                                            <TextField
                                                id="name"
                                                name="name"
                                                label="Tên"
                                                value={values.lastName}
                                                defaultValue={""}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                error={!!touched.lastName && !!errors.lastName}
                                                helperText={(touched.lastName && errors.lastName) as string}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    slotProps={{ textField: { fullWidth: true } }}
                                                    label="Ngày sinh"
                                                    value={valueBasic}
                                                    onChange={(newValue: Date | null) => {
                                                        setValueBasic(newValue);
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField id="city" select fullWidth label="Thành phố" value={city} onChange={handleChangeProvince}>
                                                {cityData?.map((option) => (
                                                    <MenuItem key={option.id} value={option.id.toString()}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField id="province" select fullWidth label="Tỉnh" value={provinces} onChange={handleChangeWard} disabled={!citySelected} helperText={!citySelected ? "Please select City first" : ""}>
                                                {provincesData.map((option) => (
                                                    <MenuItem key={option.id} value={option.id}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField id="ward" select fullWidth label="Phường" value={ward} onChange={handleChangeWard} disabled={!provincesSelected} helperText={!provincesSelected ? "Please select province first" : ""}>
                                                {wardData.map((option) => (
                                                    <MenuItem key={option.id} value={option.id.toString()}>
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField
                                                label="Địa chỉ chi tiết"
                                                multiline
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={12}>
                                            <TextField
                                                id="outlined-multiline-static1"
                                                label="Bio"
                                                multiline
                                                fullWidth
                                                defaultValue=""
                                            />
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            {/* Contact Information SubCard */}
                            <Grid item lg={12} sx={{ margin: "2%" }}>
                                <SubCard title="Thông tin xã hội & liên lạc">
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item lg={6}>
                                            <TextField id="outlined-basic2" fullWidth label="Số điện thoại" defaultValue="" />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                                                <Grid item xs>
                                                    <TextField
                                                        id='fbUrl'
                                                        label="Đường dẫn Facebook"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <FacebookIcon />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item lg={6}>
                                            <TextField id="outlined-basic3" fullWidth label="Email" defaultValue="" />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                                                <Grid item xs>
                                                    <TextField
                                                        id='twtUrl'
                                                        label="Đường dẫn Twitter"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <TwitterIcon />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField id="outlined-basic4" fullWidth label="Portfolio Url" defaultValue="" />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <Grid item container alignItems="center" justifyContent="end" spacing={2}>
                                                <Grid item xs>
                                                    <TextField
                                                        id='lnkUrl'
                                                        label="Đường dẫn LinkedIn"
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid item>
                                                    <LinkedInIcon />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            {/* Education Subcard */}
                            <Grid item lg={12} sx={{ margin: "2%" }}>
                                <SubCard title="Chứng chỉ & bằng cấp">
                                    <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField fullWidth label="First Certification" />
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <Button variant="contained" size="small" color="info">
                                                    Upload
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
                                                <Button variant="contained" size="small" color="info">
                                                    Upload
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
                                                <Button variant="contained" size="small" color="info">
                                                    Upload
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </SubCard>
                            </Grid>

                            {/* Skills Subcard */}
                            <Grid item lg={12} sx={{ margin: "2%" }}>
                                <SubCard title="Skills">
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item lg={2}>
                                            <Autocomplete
                                                disablePortal
                                                options={SkillNames}
                                                getOptionLabel={(option) => option.name}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                defaultValue={SkillNames[SkillNames?.length]}
                                                onChange={handleSkillChange}
                                                renderInput={(params) => <TextField {...params} label="Ngành nghề" />}
                                            />
                                        </Grid>
                                        <Grid item lg={2}>
                                            <Autocomplete
                                                disablePortal
                                                options={SkillNames}
                                                getOptionLabel={(option) => option.name}
                                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                                defaultValue={SkillNames[SkillNames?.length]}
                                                onChange={handleSkillChange}
                                                renderInput={(params) => <TextField {...params} label="Skill Options" />}
                                            />
                                        </Grid>
                                        <Grid item lg={6}>
                                            <TextField fullWidth label="Đường dẫn chứng chỉ" />
                                        </Grid>
                                        <Grid item lg={1}>
                                            <IconButton aria-label="add" onClick={handleAddSkill}>
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item lg={1}>
                                            <IconButton aria-label="remove">
                                                <ClearIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    {handleAddSkill}
                                </SubCard>
                            </Grid>

                            {/* Submit Section */}
                            <Grid item lg={12} sx={{ margin: "2%" }}>
                                <Grid container alignItems="end" justifyContent="end" spacing={gridSpacing}>
                                    <Grid item>
                                        <Button variant="outlined" color="error" onClick={() => { }}>Reset</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="info" onClick={() => { }}>Submit</Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </SubCard>
                    </form>
                </Grid>
            </Grid>
        </MainCard >
    );
};

export default FormRegister;

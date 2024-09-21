'use client';

import { useEffect, useState } from 'react';
import { Avatar, Box, Button, ButtonBase, CardMedia, CircularProgress, Grid, Rating, Switch, TextField, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ExpertCurrent } from "package/api/expert/current";
import MainCard from 'ui-component/cards/MainCard';
import ImagePlaceholder from 'ui-component/cards/Skeleton/ImagePlaceholder';
import { PatchExpertUpdateProfile } from 'package/api/expert/update-profile';
import { useGetCountry, useGetDistrict, useGetProvince, useGetWard } from 'hooks/use-address';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from "@mui/material/MenuItem";
import { EducationData, EducationForm } from 'app/form/update/[id]/_components/education';
import { ExpertToken } from 'hooks/use-login';
import { StyledLink } from 'components/common/link/styled-link';
import { FlexBetween } from 'components/common/box/flex-box';
import { Text } from "views/forms/input/text/text";
import { useGetExpertSkillOptions, useGetExpertSkillOptionsCurrent } from 'hooks/use-get-expert-skill-option';
import { useRefresh } from 'hooks/use-refresh';
import { PatchExpertSkillOptonHidden, PatchExpertSkillOptonShow } from 'package/api/expert-skill-option/id';
import { ExpertSkillOptionCurrent } from 'package/api/expert-skill-option/current';

const Cover = '/assets/images/profile/img-profile-bg.png';

const PersonalAccount = ({ expert }: { expert?: ExpertCurrent }) => {
  const { refresh, refreshTime } = useRefresh();
  const { expertToken } = ExpertToken();
  const { enqueueSnackbar } = useSnackbar();
  const { expertSkillOptionsCurrent, loading: expertSkillOptionsCurrentLoading } = useGetExpertSkillOptionsCurrent(expertToken, refreshTime);
  const [provinceInitCode, districtInitCode] = expert?.portfolioUrl.split("-") || "";
  const [street, ward, district, province] = expert?.address.split(", ") || "";
  const [provinceCode, setProvinceCode] = useState<string>(provinceInitCode);
  const [districtCode, setDistrictCode] = useState<string>(districtInitCode);
  const { provinceOptions } = useGetProvince();
  const { districtOptions } = useGetDistrict(provinceCode);
  const { wardOptions } = useGetWard(districtCode);
  const { countries } = useGetCountry();

  const [initialData, setInitialData] = useState({
    address: expert?.address || '',
    street: street || '',
    experience: expert?.yearExperience?.toString() || '',
    birthDate: expert?.birthDate || '',
    bio: expert?.bio || '',
    phone: expert?.phone || '',
    email: expert?.email || '',
    portfolioUrl: expert?.portfolioUrl || '',
    facebookUrl: expert?.facebookUrl || '',
    twitterUrl: expert?.twitterUrl || '',
    linkedinUrl: expert?.linkedinUrl || '',
    backgroundImage: expert?.backgroundImage || '',
    avatar: expert?.avatar || '',
    firstName: expert?.firstName || '',
    lastName: expert?.lastName || '',
    province: province || '',
    district: district || '',
    ward: ward || '',
    education: expert ? JSON.parse(expert.education) : []
  });

  const [formData, setFormData] = useState(initialData);
  const [education, setEducation] = useState<EducationData[]>(initialData.education);
  const [backgroundImageFile, setBackgroundImageFile] = useState<File | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isEnabled, setIsEnabled] = useState(true);

  const uploadToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my3ib4l5");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfwqbf3xr/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      throw new Error("Không thể tải ảnh lên Cloudinary");
    }
  };

  const handleBackgroundImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        setFormData({ ...formData, backgroundImage: cloudinaryUrl });
        setBackgroundImageFile(file);
      } catch (error) {
        console.error("Upload ảnh nền thất bại:", error);
      }
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const cloudinaryUrl = await uploadToCloudinary(file);
        setFormData({ ...formData, avatar: cloudinaryUrl });
        setAvatarFile(file);
      } catch (error) {
        console.error("Upload ảnh đại diện thất bại:", error);
      }
    }
  };

  //Check onChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const hasChanges = JSON.stringify(initialData) !== JSON.stringify(formData);

  //Update form
  const handleUpdate = async () => {
    if (!hasChanges) return;
    try {
      const updatedData = {
        emailContact: formData.email,
        birthDate: formData.birthDate || "",
        bio: formData.bio,
        portfolioUrl: `${provinceCode}-${districtCode}`,
        facebookUrl: formData.facebookUrl,
        twitterUrl: formData.twitterUrl,
        linkedInUrl: formData.linkedinUrl,
        education: JSON.stringify(education),
        yearExperience: parseInt(formData.experience) || 0,
        backgroundImage: formData.backgroundImage,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        address: `${formData.street}, ${formData.ward}, ${formData.district}, ${formData.province}`,
        avatar: formData.avatar,
      };
      const response = await PatchExpertUpdateProfile(updatedData, expertToken);
      if (response.status === 'success') {
        setInitialData(formData);
        enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
      } else {
        enqueueSnackbar('Cập nhật thất bại!', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' });
    }
  };

  //Show & Hide skill option
  const handleToggle = async (id: number, status: number) => {
    try {
      if (status === 2) {
        const response = await PatchExpertSkillOptonShow({ id }, expertToken);
        if (response.status !== 'success') {
          throw new Error('Failed to show skill');
        }
      } else {
        const response = await PatchExpertSkillOptonHidden({ id }, expertToken);
        if (response.status !== 'success') {
          throw new Error('Failed to hide skill');
        }
      }
      enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Cập nhật thất bại!', { variant: 'error' });
    } finally {
      refresh();
    }
  };

  useEffect(() => {
    console.log("expert:", expert);
    console.log("initialData:", initialData);
    console.log("expertSkillOptionsCurrent:", expertSkillOptionsCurrent);
  }, [initialData, expert, expertSkillOptionsCurrent])

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard
          contentSX={{
            p: 1.5,
            paddingBottom: '0px !important'
          }}
        >
          <ButtonBase
            sx={{
              borderRadius: '10px',
              overflow: 'hidden',
              mb: 3,
              display: 'block',
              width: '100%',
            }}
            onClick={() => document.getElementById('backgroundImageInput')?.click()}
          >
            {formData.backgroundImage ? (
              <CardMedia
                component="img"
                image={formData.backgroundImage}
                sx={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  mb: 3,
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                }}
                alt="profile-background"
              />
            ) : (
              <ImagePlaceholder
                sx={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  mb: 3,
                  height: { xs: 85, sm: 150, md: 260 }
                }}
              />
            )}
          </ButtonBase>
          <input
            type="file"
            id="backgroundImageInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleBackgroundImageChange}
          />
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={3}>
              <ButtonBase
                sx={{
                  borderRadius: '16px',
                  display: 'block',
                  margin: '-70px 0 0 auto'
                }}
                onClick={() => document.getElementById('avatarInput')?.click()}
              >
                {formData.avatar ? (
                  <Avatar
                    alt="User Avatar"
                    src={formData.avatar}
                    sx={{
                      margin: '-25px 0 0 auto',
                      borderRadius: '16px',
                      width: { xs: 72, sm: 100, md: 140 },
                      height: { xs: 72, sm: 100, md: 140 }
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      borderRadius: '16px',
                      width: '140px',
                      height: '140px',
                      backgroundColor: '#f0f0f0'
                    }}
                  />
                )}
              </ButtonBase>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleAvatarChange}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={4}>
                  {/* Có thể thêm nội dung khác ở đây */}
                </Grid>
                <Grid item xs={12} md={8}>
                  {/* Có thể thêm nội dung khác ở đây */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubCard title="Thông tin cá nhân">
          <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="firstName"
                  fullWidth
                  label="Tên"
                  defaultValue={expert?.firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="lastName"
                  fullWidth
                  label="Họ"
                  defaultValue={expert?.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="bio"
                  label="Tiểu sử"
                  multiline
                  fullWidth
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="experience"
                  fullWidth
                  label="Kinh nghiệm (năm)"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    slotProps={{ textField: { fullWidth: true } }}
                    onError={() => {
                    }}
                    format="dd-MM-yyyy"
                    label="Ngày sinh"
                    value={new Date(formData.birthDate)}
                    onChange={(newValue: Date | null) => {
                      setFormData({
                        ...formData,
                        birthDate: newValue ? newValue.toISOString() : '',
                      });
                    }}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </form>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={6}>
        <SubCard title="Thông tin liên lạc">
          <form noValidate autoComplete="off">
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <TextField
                  id="phone"
                  fullWidth
                  label="Số điện thoại liên hệ"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="email"
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  id="province"
                  fullWidth
                  label="Tỉnh / Thành phố"
                  value={formData.province}
                  onChange={handleChange}
                >
                  {provinceOptions?.map((option) => (
                    <MenuItem
                      key={option.idProvince}
                      value={option.name}
                      onClick={() => {
                        setProvinceCode(option.idProvince);
                        setFormData({ ...formData, province: option.name });
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  id="district"
                  fullWidth
                  label="Quận / huyện"
                  value={formData.district}
                  onChange={handleChange}
                  disabled={formData.province === ""}
                >
                  {districtOptions?.map((option) => (
                    <MenuItem
                      key={option.idDistrict}
                      value={option.name}
                      onClick={() => {
                        setDistrictCode(option.idDistrict);
                        setFormData({ ...formData, district: option.name });
                      }}
                    >
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  id="ward"
                  fullWidth
                  label="Phường / Xã"
                  value={formData.ward}
                  onChange={handleChange}
                  disabled={formData.district === ""}
                >
                  {wardOptions?.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="street"
                  fullWidth
                  label="Số nhà, tên đường"
                  value={formData.street}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={12}>
        <SubCard title="Thông tin xã hội">
          <form noValidate autoComplete="off">
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item>
                <FacebookIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <TextField
                  id="facebookUrl"
                  fullWidth
                  label="Facebook Profile Url"
                  value={formData.facebookUrl}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={gridSpacing} sx={{ mb: 1.25 }}>
              <Grid item>
                <TwitterIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <TextField
                  id="twitterUrl"
                  fullWidth
                  label="Twitter Profile Url"
                  value={formData.twitterUrl}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={gridSpacing}>
              <Grid item>
                <LinkedInIcon />
              </Grid>
              <Grid item xs zeroMinWidth>
                <TextField
                  id="linkedinUrl"
                  fullWidth
                  label="LinkedIn Profile Url"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </form>
        </SubCard>
      </Grid>
      <Grid item xs={12} md={12}>
        {education && (
          <EducationForm setEducation={(value) => setEducation(JSON.parse(value))} initValue={JSON.stringify(education)} />
        )}
      </Grid>
      {expertSkillOptionsCurrentLoading ? (
        <CircularProgress />
      ) : expertSkillOptionsCurrent && expertSkillOptionsCurrent.length > 0 ? (
        expertSkillOptionsCurrent.map((skillOption: ExpertSkillOptionCurrent, index) => {
          return (
            <Grid item xs={4} key={index}>
              <SubCard
                title={
                  <FlexBetween>
                    <Typography>{skillOption.skillOptionName}</Typography>
                    <Switch
                      checked={skillOption.status === 1}
                      onChange={() => handleToggle(skillOption.id, skillOption.status)}
                      color="primary"
                    />
                  </FlexBetween>
                }
              >
                <FlexBetween>
                  <Rating
                    value={skillOption.sumPoint}
                    size="small"
                    readOnly
                    disabled={skillOption.status === 1}
                  />
                  <Text fontSize={13} color={skillOption.status === 1 ? 'inherit' : 'text.disabled'}>
                    <span style={{ fontWeight: "bold" }}>
                      {skillOption.totalRating}
                    </span>{" "}
                    lượt đánh giá
                  </Text>
                </FlexBetween>
              </SubCard>
            </Grid>
          );
        })
      ) : (
        <Typography>Không tìm thấy kỹ năng</Typography>
      )}
      <Grid item xs={12} sx={{ textAlign: 'right' }}>
        <Button variant="contained" onClick={handleUpdate} disabled={!hasChanges}>
          Cập nhật
        </Button>
      </Grid>
    </Grid>
  );
};

export default PersonalAccount;

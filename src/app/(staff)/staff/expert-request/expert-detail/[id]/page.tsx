"use client";

// material-ui
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// project imports
import { gridSpacing } from "store/constant";
import SubCard from "ui-component/cards/SubCard";

// assets
import Container from "@mui/material/Container";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Image from "next/image";
import {
  GetExpertSkillOption,
  ExpertSkillOption,
} from "package/api/expert-skill-option";
import { useEffect, useState } from "react";
import { useGetSearchParams } from "hooks/use-get-params";
import { useGetExpertSkillOptions } from "hooks/use-get-expert-skill-option";
import MainCard from "ui-component/cards/MainCard";
import {
  useGetExpertNatonSupport,
  useGetExpertProfile,
} from "hooks/use-get-expert-profile";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Iconify from "components/iconify/iconify";

import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { useGetCountry } from "hooks/use-address";
import { convertNationString, formatDate } from "package/util";
import { EducationData } from "app/form/create/[id]/_components/education";
import { ReadSkillForm } from "./_component/skill";
import { Text } from "views/forms/input/text/text";
import { useGetExpertRegisterRequest } from "hooks/use-get-expert-register-request";
import Stack from "@mui/material/Stack";
import Chip from "ui-component/extended/Chip";
import { FlexBetween, FlexBox } from "components/common/box/flex-box";
import Button from "@mui/material/Button";
import { StyledLink } from "components/common/link/styled-link";
import { ExpertFormRequire } from "package/api/expert-form-require";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useRefresh } from "hooks/use-refresh";
import {
  Criteria,
  ExpertRegisterRejectForm,
} from "package/api/expert-register-request/id/reject-form";
import { enqueueSnackbar } from "notistack";
import LoadingButton from "@mui/lab/LoadingButton";
import { Certificate, ManageCertificate } from "components/certificate";

const StatusChip = ({ status }: { status: number }) => {
  const props = { label: "", variant: "" };
  switch (status) {
    case 0:
      props.label = "Đã khóa";
      props.variant = "error";
      break;
    case 1:
      props.label = "Chờ xử lí";
      props.variant = "warning";
      break;
    case 2:
      props.label = "Đã gửi form đăng kí";
      props.variant = "success";
      break;
    case 3:
      props.label = "Chờ duyệt form";
      props.variant = "success";
      break;
    case 4:
      props.label = "Chờ cập nhật";
      props.variant = "warning";
      break;
    case 5:
      props.label = "Hoàn tất";
      props.variant = "success";
      break;
  }
  return (
    <Chip sx={{ ml: 1 }} label={props.label} chipcolor={props.variant as any} />
  );
};

const ExpertProfilePage = ({ params }: { params: { id: string } }) => {
  const [requestId, expertId, redirect] = params.id.split("-");

  const { refresh, refreshTime } = useRefresh();

  const { expertRegisterRequest, loading: requestLoading } =
    useGetExpertRegisterRequest(
      {
        limit: 1,
        page: 1,
        search: [`id:${requestId}`],
      },
      refreshTime
    );
  const { expert } = useGetExpertProfile({ id: +expertId }, false);

  const { nation } = useGetExpertNatonSupport({ expertId: +expertId });

  const { countries } = useGetCountry();

  const [expertFormRequire, setExpertFormRequire] = useState<
    ExpertFormRequire[]
  >([]);

  const [rejectReason, setRejectReason] = useState<string>("");

  const [openRejectForm, setOpenRejectForm] = useState(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [requireId, setRequireId] = useState<number[]>([]);

  const handleAddRequireId = (id: number) => {
    setRequireId([...requireId, id]);
  };

  const handleRemoveRequireId = (id: number) => {
    setRequireId(requireId.filter((value) => value !== id));
  };

  const [certificateList, setCertificateList] = useState<Certificate[]>([]);

  useEffect(() => {
    let listData: Certificate[] = [];
    if (expert && expert.certification) {
      listData = JSON.parse(expert.certification);
    }
    setCertificateList([...listData]);
  }, [expert]);

  const rejectHandle = async () => {
    try {
      setIsLoading(true);
      const criteriaList: Criteria[] = [];
      requireId.map((value) => {
        const expertFormRequireValue = expertFormRequire.find(
          (require) => require.id === value
        );
        criteriaList.push({
          criteria: expertFormRequireValue?.name || "",
          description: expertFormRequireValue?.description || "",
          status: 1,
        });
      });
      const currentHost = window.location.hostname;
      const action = await ExpertRegisterRejectForm({
        id: expertRegisterRequest[0].id,
        reasonReject: rejectReason,
        url: `${currentHost}/form/update/${expertRegisterRequest[0].email}-${expertRegisterRequest[0].id}`,
        criteriaList,
      });
      if (action.status === "error") {
        throw new Error("");
      }
      enqueueSnackbar(`Từ chối đơn đăng kí thành công`, {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar(`Từ chối đơn đăng kí thất bại`, {
        variant: "error",
      });
    } finally {
      refresh();
      setOpenRejectForm(false);
      setIsLoading(false);
      setOpenConfirm(false);
    }
  };
  return (
    <MainCard border>
      <Grid container spacing={5}>
        {expert ? (
          <>
            {/* Personal Information Subcard */}
            <Grid item lg={12}>
              <FlexBetween>
                <StyledLink href={redirect || "/staff/expert-request"}>
                  <Button variant="outlined">Quay lại</Button>
                </StyledLink>
                {expertRegisterRequest[0].status === 3 ? (
                  <FlexBox>
                    <Chip
                      onClick={() => {
                        setOpenRejectForm(!openRejectForm);
                      }}
                      label="Từ chối"
                      variant="outlined"
                      chipcolor="warning"
                      sx={{
                        borderRadius: 1,
                        fontSize: 14,
                        cursor: "pointer",
                        mr: 1,
                      }}
                    />
                    <Chip
                      label="Duyệt"
                      variant="outlined"
                      chipcolor="success"
                      sx={{ borderRadius: 1, fontSize: 14, cursor: "pointer" }}
                    />
                  </FlexBox>
                ) : null}
              </FlexBetween>
            </Grid>
            {openRejectForm ? (
              <Grid item lg={12}>
                <SubCard title="Chọn vào nội dung cần bổ sung">
                  <Grid container spacing={2}>
                    {expertFormRequire.map((require, index) => (
                      <Grid item xs={6} key={index}>
                        <Tooltip title={require.description}>
                          <FormControlLabel
                            control={<Checkbox color="error" />}
                            checked={Boolean(
                              requireId.find((value) => value === require.id)
                            )}
                            onChange={(e, checked) => {
                              checked
                                ? handleAddRequireId(require.id)
                                : handleRemoveRequireId(require.id);
                            }}
                            label={
                              <Text fontSize={16} fontWeight={"bold"}>
                                {index + 1}. {require.name}
                              </Text>
                            }
                          />
                        </Tooltip>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <TextField
                        size="medium"
                        value={rejectReason}
                        variant="filled"
                        label="Nội dung từ chối"
                        fullWidth
                        minRows={4}
                        multiline
                        sx={{ mt: 2 }}
                        onChange={(e) => {
                          setRejectReason(e.target.value);
                        }}
                      />
                      <Dialog open={openConfirm} maxWidth="sm" fullWidth>
                        <DialogTitle>
                          Xác nhận từ chối đơn đăng kí ?
                        </DialogTitle>
                        <DialogContent>
                          <Typography variant="body1">
                            Bạn muốn từ chối đơn đăng kí:{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {expert ? expert.email : ""}
                            </span>
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            color="error"
                            type="button"
                            onClick={() => setOpenConfirm(false)}
                          >
                            Đóng
                          </Button>
                          <LoadingButton
                            loading={isLoading}
                            onClick={rejectHandle}
                            disabled={rejectReason.length <= 0}
                          >
                            Xác nhận
                          </LoadingButton>
                        </DialogActions>
                      </Dialog>
                    </Grid>
                    <Grid item xs={12}>
                      <DialogActions>
                        <Button
                          variant="contained"
                          onClick={() => {
                            setOpenConfirm(true);
                          }}
                        >
                          Gửi
                        </Button>
                      </DialogActions>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
            ) : null}
            <Grid item lg={12}>
              <SubCard title="Thông tin đơn đăng kí">
                {!requestLoading && expertRegisterRequest ? (
                  <Stack spacing={3}>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>
                        Email đăng kí:{" "}
                      </span>
                      {expertRegisterRequest[0].email}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Ngày đăng kí: </span>
                      {formatDate(
                        expertRegisterRequest[0].createdAt,
                        "dd-MM-yyyy"
                      )}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>
                        Ngày cập nhật:{" "}
                      </span>
                      {formatDate(
                        expertRegisterRequest[0].updatedAt,
                        "dd-MM-yyyy"
                      )}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Trạng thái:</span>
                      <StatusChip status={expertRegisterRequest[0].status} />
                    </Text>
                  </Stack>
                ) : null}
              </SubCard>
            </Grid>
            <Grid item lg={12}>
              <SubCard title="Thông tin cá nhân">
                <Grid container spacing={gridSpacing}>
                  <Grid item lg={6}>
                    <TextField label="Họ" value={expert.lastName} fullWidth />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      name="firstName"
                      label="Tên"
                      value={expert.firstName}
                      fullWidth
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        readOnly
                        slotProps={{ textField: { fullWidth: true } }}
                        value={new Date(expert.birthDate)}
                        format="dd-MM-yyyy"
                        label="Ngày sinh"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      label="Địa chỉ"
                      name="street"
                      fullWidth
                      value={expert.address}
                    />
                  </Grid>
                  <Grid item lg={12}>
                    <TextField
                      multiline
                      minRows={4}
                      label="Thông tin thêm"
                      name="bio"
                      fullWidth
                      value={expert.bio}
                    />
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>

            {/* Contact Information SubCard */}
            <Grid item lg={12}>
              <SubCard title="Thông tin xã hội & liên lạc">
                <Grid container spacing={gridSpacing}>
                  <Grid item lg={6}>
                    <Box
                      justifyContent={"center"}
                      alignItems={"center"}
                      display={"flex"}
                    >
                      <Image
                        src={expert.avatar}
                        alt="avatar"
                        width={100}
                        height={100}
                        style={{
                          border: "1px solid black",
                          borderRadius: 20,
                          borderColor: "#2188ff",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item lg={6}>
                    <Grid container spacing={gridSpacing}>
                      <Grid item lg={12}>
                        <TextField
                          label="Số điện thoại"
                          name="phone"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Iconify icon="ic:baseline-phone" />
                              </InputAdornment>
                            ),
                          }}
                          value={expert.phone}
                        />
                      </Grid>
                      <Grid item lg={12}>
                        <TextField
                          label="Email"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Iconify icon="ic:baseline-email" />
                              </InputAdornment>
                            ),
                          }}
                          name="email"
                          fullWidth
                          autoComplete="off"
                          value={expert.emailContact}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="end"
                      spacing={2}
                    >
                      <Grid item xs>
                        <TextField
                          label="Facebook"
                          name="facebookUrl"
                          fullWidth
                          value={expert.facebookUrl}
                        />
                      </Grid>
                      <Grid item>
                        <FacebookIcon />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="end"
                      spacing={2}
                    >
                      <Grid item xs>
                        <TextField
                          label="Twitter"
                          name="twitterUrl"
                          fullWidth
                          value={expert.twitterUrl}
                        />
                      </Grid>
                      <Grid item>
                        <TwitterIcon />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item lg={12}>
                    <Grid
                      item
                      container
                      alignItems="center"
                      justifyContent="end"
                      spacing={2}
                    >
                      <Grid item xs>
                        <TextField
                          label="LinkedIn"
                          name="linkedInUrl"
                          fullWidth
                          value={expert.linkedinUrl}
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
            <Grid item lg={12}>
              {/* <EducationForm setEducation={setEducation} /> */}
              <SubCard title="Thời gian">
                <Grid
                  container
                  spacing={1}
                  ml={3}
                  alignItems="center"
                  sx={{
                    position: "relative",
                    "&>*": {
                      position: "relative",
                      zIndex: "5",
                    },
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: "0",
                      left: 0,
                      width: "0.5px",
                      height: "100%",
                      bgcolor: "divider",
                      zIndex: "1",
                    },
                  }}
                >
                  {JSON.parse(expert.education).map(
                    (row: EducationData, index: number) => (
                      <Grid item xs={12} key={index} ml={2}>
                        <Grid container>
                          <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1">
                              {row.time}
                            </Typography>
                            <Typography variant="subtitle2">
                              {row.timeDes}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={8}>
                            <Typography variant="subtitle1">
                              {row.title}
                            </Typography>
                            <Typography variant="subtitle2">
                              {row.titleDes}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  )}
                </Grid>
              </SubCard>
            </Grid>
            <Grid item lg={12}>
              <SubCard title="Chứng chỉ & bằng cấp">
                <ManageCertificate
                  certificateList={certificateList}
                  setCertificateList={setCertificateList}
                />
              </SubCard>
            </Grid>
            <Grid item lg={12}>
              <SubCard title="Lĩnh vực đăng kí">
                <Grid
                  container
                  alignItems="center"
                  spacing={gridSpacing}
                  sx={{ mb: 1.25 }}
                >
                  <Grid item lg={6} zeroMinWidth>
                    <TextField
                      label="Năm kinh nghiệm"
                      name="yearExperience"
                      fullWidth
                      type="number"
                      value={expert.yearExperience}
                    />
                  </Grid>
                  <Grid item lg={6} zeroMinWidth>
                    <Autocomplete
                      multiple
                      disabled={true}
                      options={countries}
                      getOptionLabel={(option) => option}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField {...params} label="Quốc gia hỗ trợ" />
                      )}
                      value={convertNationString(nation)}
                    />
                  </Grid>
                  <Grid item lg={12} zeroMinWidth>
                    <ReadSkillForm
                      expertId={+expertId}
                      setExpertFormRequire={setExpertFormRequire}
                    />
                  </Grid>
                </Grid>
              </SubCard>
            </Grid>
          </>
        ) : null}
      </Grid>
    </MainCard>
  );
};

export default ExpertProfilePage;

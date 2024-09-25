"use client";

import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Fragment, useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import { IconX } from "@tabler/icons-react";
export interface EducationData {
  time: string;
  timeDes: string;
  title: string;
  titleDes: string;
}
export const EducationForm = ({
  setEducation,
}: {
  setEducation: (value: string) => void;
}) => {
  const sampleEducation: EducationData = {
    time: "",
    timeDes: "",
    title: "",
    titleDes: "",
  };
  const [isUpdate, setIsUpdate] = useState(0);

  useEffect(() => {
    setEducation(JSON.stringify(educationList));
  }, [isUpdate]);

  const [educationList, setEducationList] = useState<EducationData[]>([]);

  const handleUpdateEducationData = (data: EducationData, index: number) => {
    const newEducationList = educationList;
    newEducationList[index] = data;
    setEducationList(newEducationList);
    setIsUpdate(isUpdate + 1);
  };
  const handleAddEducation = () => {
    setEducationList([...educationList, sampleEducation]);
  };
  const handleDeleteEducation = (id: number) => {
    const newEducationList = educationList.filter(
      (data, index) => index !== id
    );
    setEducationList(newEducationList);
    setIsUpdate(isUpdate + 1);
  };
  return (
    <SubCard title="Thời gian">
      <Grid
        container
        spacing={2}
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
        {educationList.map((education, index) => (
          <Fragment key={index}>
            <Grid item xs={12} ml={2}>
              <Grid container>
                <Grid item xs={4}>
                  <Stack spacing={1} mr={20}>
                    <TextField
                      variant="standard"
                      size="small"
                      placeholder="Thời gian"
                      sx={{
                        input: {
                          fontWeight: "bold",
                          fontSize: 14,
                        },
                      }}
                      value={education.time}
                      onChange={(e) => {
                        const newData = education;
                        newData.time = e.target.value;
                        handleUpdateEducationData(newData, index);
                      }}
                    />
                    <TextField
                      variant="standard"
                      size="small"
                      sx={{
                        input: {
                          fontSize: 12,
                        },
                      }}
                      value={education.timeDes}
                      onChange={(e) => {
                        const newData = education;
                        newData.timeDes = e.target.value;
                        handleUpdateEducationData(newData, index);
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={7}>
                  <Stack spacing={1} mr={20}>
                    <TextField
                      variant="standard"
                      size="small"
                      placeholder="Tiêu đề"
                      sx={{
                        input: {
                          fontWeight: "bold",
                          fontSize: 14,
                        },
                      }}
                      value={education.title}
                      onChange={(e) => {
                        const newData = education;
                        newData.title = e.target.value;
                        handleUpdateEducationData(newData, index);
                      }}
                    />
                    <TextField
                      variant="standard"
                      size="small"
                      sx={{
                        input: {
                          fontSize: 12,
                        },
                      }}
                      value={education.titleDes}
                      onChange={(e) => {
                        const newData = education;
                        newData.titleDes = e.target.value;
                        handleUpdateEducationData(newData, index);
                      }}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => {
                      handleDeleteEducation(index);
                    }}
                  >
                    <IconX />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ height: 40 }}></Grid>
          </Fragment>
        ))}
        <Grid item xs={12} ml={2}>
          <Button variant="outlined" onClick={handleAddEducation}>
            Thêm mốc thời gian
          </Button>
        </Grid>
      </Grid>
    </SubCard>
  );
};

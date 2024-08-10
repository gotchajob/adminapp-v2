import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  CVComponent,
  CVTemplate,
  Column,
  PersonalComponent,
} from "components/cv-component/interface";
import { ReactNode, useEffect, useState } from "react";
import { CVUploadImage } from "./avatar";
import { HeaderComponent } from "./header-component";
import { InformationComponent } from "./information-component";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { PRIMARYCOLOR } from "components/common/config";
import NorthIcon from "@mui/icons-material/North";
import Tooltip from "@mui/material/Tooltip";
import WestIcon from "@mui/icons-material/West";
import { DefaultComponent } from "./default-component";

const defaultShadow = "0 2px 14px 0 rgb(33 150 243 / 10%)";

export const CreateCV = ({
  cv,
  onChangeCV,
  cvRef,
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
  cvRef: any;
}) => {
  const handelChangeHeaderComponent = (
    newCVComponent: CVComponent,
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    newCV.layout[columnIndex].componentList[componentIndex] = newCVComponent;
    onChangeCV(newCV);
  };

  const handleChangeInformationComponent = (
    newCVPersonalComponent: PersonalComponent[],
    newCVComponent: CVComponent,
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    newCV.personal = newCVPersonalComponent;
    newCV.layout[columnIndex].componentList[componentIndex] = newCVComponent;
    onChangeCV(newCV);
  };

  const handleChangeAvatarComponent = (
    image: string,
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    newCV.layout[columnIndex].componentList[componentIndex].description = image;
    onChangeCV(newCV);
  };

  const handleDeleteComponent = (
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    newCV.layout[columnIndex].componentList.splice(componentIndex, 1);
    onChangeCV(newCV);
  };

  const handleMoveTopComponent = (
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    const moveComponent = newCV.layout[columnIndex].componentList.splice(
      componentIndex,
      1
    );
    newCV.layout[columnIndex].componentList.splice(
      componentIndex - 1,
      0,
      moveComponent[0]
    );
    onChangeCV(newCV);
  };

  const handleMoveLeftComponent = (
    columnIndex: number,
    componentIndex: number
  ) => {
    const newCV: CVTemplate = { ...cv };
    const moveComponent = newCV.layout[columnIndex].componentList.splice(
      componentIndex,
      1
    );
    newCV.layout[columnIndex - 1].componentList.splice(
      componentIndex - 1,
      0,
      moveComponent[0]
    );
    onChangeCV(newCV);
  };

  const [onClickComponent, setOnClickComponent] = useState("");

  const ComponentWarper = ({
    children,
    index,
    componentName,
  }: {
    children: ReactNode;
    index: number[];
    componentName: string;
  }) => {
    const isClicked = componentName == onClickComponent;
    const [componentIndex, columnIndex] = index;
    return (
      <Box
        p={2}
        boxShadow={isClicked ? defaultShadow : "none"}
        position={"relative"}
        borderRadius={1}
        border={isClicked ? `1px solid ${PRIMARYCOLOR}` : "none"}
        onClick={() => {
          setOnClickComponent(componentName);
        }}
      >
        {isClicked && componentIndex !== 0 ? (
          <Tooltip title="Di chuyển lên">
            <IconButton
              color="success"
              size="small"
              sx={{
                position: "absolute",
                top: -17,
                right: 18,
                backgroundColor: "#f5fefa",
              }}
              onClick={() => {
                handleMoveTopComponent(columnIndex, componentIndex);
              }}
            >
              <NorthIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {isClicked && columnIndex !== 0 ? (
          <Tooltip title="Di chuyển sang trái">
            <IconButton
              color="success"
              size="small"
              sx={{
                position: "absolute",
                top: -17,
                left: -16,
                backgroundColor: "#f5fefa",
              }}
              onClick={() => {
                handleMoveLeftComponent(columnIndex, componentIndex);
              }}
            >
              <WestIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {isClicked ? (
          <Tooltip title="Xoá">
            <IconButton
              color="error"
              size="small"
              sx={{
                position: "absolute",
                top: -17,
                right: -16,
                backgroundColor: "#f5fefa",
              }}
              onClick={() => {
                handleDeleteComponent(columnIndex, componentIndex);
              }}
            >
              <ClearIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {children}
      </Box>
    );
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     if (cvRef.current && !cvRef.current.contains(event.target)) {
  //       setOnClickComponent("");
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Box position={"relative"}>
      <IconButton
        sx={{ position: "absolute", right: 0, top: 0 }}
        onClick={() => {
          setOnClickComponent("");
        }}
      >
        <ClearIcon color="error" />
      </IconButton>
      <Grid
        position={"relative"}
        ref={cvRef}
        container
        width={800}
        height={1131}
        margin={"auto"}
        sx={{ boxShadow: defaultShadow, overFlowY: "hidden" }}
      >
        {cv &&
          cv.layout.map((column, columnIndex) => (
            <Grid
              key={columnIndex}
              xs={column.size}
              minHeight={100}
              bgcolor={column.backgroudColor}
              borderRadius={"inherit"}
            >
              <Grid container>
                {column.componentList.map((component, componentIndex) => {
                  const returnComponentList = {
                    image: (
                      <CVUploadImage
                        avatar={component.description}
                        handleChangeAvatar={(value) => {
                          handleChangeAvatarComponent(
                            value,
                            columnIndex,
                            componentIndex
                          );
                        }}
                      />
                    ),
                    information: (
                      <InformationComponent
                        component={component}
                        primaryColor={cv.primaryColor}
                        information={cv.personal}
                        onChangeComponent={(
                          newCVPersonalComponent,
                          newCVComponent
                        ) => {
                          handleChangeInformationComponent(
                            newCVPersonalComponent,
                            newCVComponent,
                            columnIndex,
                            componentIndex
                          );
                        }}
                      />
                    ),
                    text: (
                      <HeaderComponent
                        primaryColor={cv.primaryColor}
                        component={component}
                        onChangeComponent={(newCVComponent) => {
                          handelChangeHeaderComponent(
                            newCVComponent,
                            columnIndex,
                            componentIndex
                          );
                        }}
                      />
                    ),
                    default: (
                      <DefaultComponent
                        primaryColor={cv.primaryColor}
                        component={component}
                        onChangeComponent={(newCVComponent) => {
                          handelChangeHeaderComponent(
                            newCVComponent,
                            columnIndex,
                            componentIndex
                          );
                        }}
                      />
                    ),
                  };
                  return (
                    <Grid item xs={column.componentSize[componentIndex]}>
                      <ComponentWarper
                        key={componentIndex}
                        index={[componentIndex, columnIndex]}
                        componentName={component.componentName}
                      >
                        {/* @ts-ignore */}
                        {returnComponentList[component.dataType]}
                      </ComponentWarper>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { PRIMARYCOLOR } from "components/common/config";
import { Text } from "components/common/text/text";
import {
  CVComponent,
  PersonalComponent,
  PersonalInformationTemplate,
  ComponentTemplateList,
  CVTemplate,
} from "components/cv-component/interface";
import Iconify from "components/iconify/iconify";
import { useState, useMemo } from "react";
import SubCard from "ui-component/cards/SubCard";
import { CreateTemplateComponent } from "./create-template/create-template-component";
import Stack from "@mui/material/Stack";

const defaultShadow = "0 2px 14px 0 rgb(33 150 243 / 10%)";

export const ComponentTab = ({
  cv,
  onChangeCV,
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
}) => {
  const [openComponent, setOpenComponent] = useState(true);

  const handleOpenComponent = () => {
    setOpenComponent(!openComponent);
  };

  const allComponent = useMemo(() => {
    const componentList: CVComponent[] = [];
    cv.layout.forEach((column) => {
      column.componentList.forEach((component) => {
        componentList.push(component);
      });
    });
    return componentList;
  }, [cv]);

  const handleUpdateComponent = (component: CVComponent) => {
    const newCV = { ...cv };
    newCV.layout[newCV.layout.length - 1].componentList.push(component);
    onChangeCV(newCV);
  };

  const RenderComponentTemplate = (
    <Collapse in={openComponent} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {cv.templateComponent.map((component, index) => {
          const isAdded = allComponent.find(
            (value) => value.componentName === component.componentName
          );
          return (
            <ListItemButton
              key={index}
              disabled={Boolean(isAdded)}
              onClick={() => {
                handleUpdateComponent(component);
              }}
            >
              <ListItemIcon>
                <Iconify color={PRIMARYCOLOR} icon={component.icon} />
              </ListItemIcon>
              <ListItemText primary={"Thêm " + component.title} />
            </ListItemButton>
          );
        })}
      </List>
    </Collapse>
  );

  const handleAddTemplateComponent = (templateComponent: CVComponent) => {
    const newCV = { ...cv };
    newCV.templateComponent.push(templateComponent);
    onChangeCV(newCV);
  };

  const [openCreate, setOpenCreate] = useState<boolean>(false);

  const RenderCreateComponent = (
    <Box width={"100%"} px={2}>
      <Button
        variant="contained"
        fullWidth
        onClick={() => {
          setOpenCreate(true);
        }}
      >
        Tạo mới danh mục
      </Button>
      <CreateTemplateComponent
        open={openCreate}
        setOpen={setOpenCreate}
        setTemplateComponent={handleAddTemplateComponent}
      />
    </Box>
  );

  const [openInformation, setOpenInformation] = useState(true);
  const handleOpenInformation = () => {
    setOpenInformation(!openInformation);
  };

  const handleUpdateInformation = (
    information: PersonalComponent,
    isAdded: boolean
  ) => {
    const newCV = { ...cv };
    let newPersonal: PersonalComponent[] = [];
    if (isAdded) {
      newPersonal = newCV.personal.filter(
        (value) => value.field !== information.field
      );
    } else {
      newPersonal = [...newCV.personal, information];
    }
    newCV.personal = newPersonal;
    onChangeCV(newCV);
  };

  const RenderInformationTemplate = (
    <Collapse in={openInformation} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {cv.templatePersonal.map((information) => {
          const isAdded = cv.personal.find(
            (value) => value.field === information.field
          );
          return (
            <ListItemButton
              onClick={() => {
                handleUpdateInformation(information, Boolean(isAdded));
              }}
            >
              <ListItemIcon>
                <Iconify
                  color={isAdded ? "red" : PRIMARYCOLOR}
                  icon={information.icon}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Text
                    color={isAdded ? "error" : ""}
                  >{`${isAdded ? "Xoá" : "Thêm"} ${information.fieldName}`}</Text>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Collapse>
  );
  return (
    <SubCard
      title={"Chỉnh sửa CV"}
      sx={{ width: "100%", boxShadow: defaultShadow }}
      contentSX={{ p: 0 }}
    >
      <Stack spacing={2}>
        <ListItemButton onClick={handleOpenComponent}>
          <ListItemText primary="Danh mục" />
          {openComponent ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {RenderComponentTemplate}
        {RenderCreateComponent}
        <ListItemButton onClick={handleOpenInformation}>
          <ListItemText primary="Thông tin cá nhân" />
          {openInformation ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        {RenderInformationTemplate}
      </Stack>
    </SubCard>
  );
};

{
  /* <ListItemButton onClick={handleOpenComponent}>
    <ListItemText primary="Thông tin cá nhân" />
    {openComponent ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openComponent} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
    {PersonalInformationTemplate.map((information) => {
        const isAdded = cv.personal.find(
            (value) => value.field === information.field
            );
            return (
                <ListItemButton
                onClick={() => {
                    handleUpdateInformation(information, Boolean(isAdded));
                    }}
                    >
                    <ListItemIcon>
                    <Iconify
                    color={isAdded ? "red" : PRIMARYCOLOR}
                    icon={information.icon}
                    />
                    </ListItemIcon>
                    <ListItemText
                    primary={
                        <Text
                        color={isAdded ? "error" : ""}
                        >{`${isAdded ? "Xoá" : "Thêm"} ${information.fieldName}`}</Text>
                        }
                        />
                        </ListItemButton>
                        );
                        })}
                        </List>
                        </Collapse> */
}
//   const handleUpdateInformation = (
//     information: PersonalComponent,
//     isAdded: boolean
//   ) => {
//     const newCV = { ...cv };
//     let newPersonal: PersonalComponent[] = [];
//     if (isAdded) {
//       newPersonal = newCV.personal.filter(
//         (value) => value.field !== information.field
//       );
//     } else {
//       newPersonal = [...newCV.personal, information];
//     }
//     newCV.personal = newPersonal;
//     onChangeCV(newCV);
//   };

//   const handleOpenComponent = () => {
//     setOpenComponent(!openComponent);
//   };
// const [openInformation, setOpenInformation] = useState(true);

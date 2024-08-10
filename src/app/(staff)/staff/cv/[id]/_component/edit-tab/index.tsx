"Use client";

import MainCard from "ui-component/cards/MainCard";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { FlexCenter } from "components/common/box/flex-box";
import { Text } from "components/common/text/text";
import SubCard from "ui-component/cards/SubCard";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  CVComponent,
  CVTemplate,
  ComponentTemplateList,
  PersonalComponent,
  PersonalInformationTemplate,
  introduction,
} from "components/cv-component/interface";
import Iconify from "components/iconify/iconify";
import { PRIMARYCOLOR } from "components/common/config";
import { StyledLink } from "components/common/link/styled-link";
import { EnchantInput } from "components/common/enchant-input";
import { SuggestTab } from "./suggest-tab";
import { ConfigTab } from "./config-tab";
import { ComponentTab } from "./component-tab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const tabs = [
  { icon: <InfoIcon />, title: "Hướng dẫn" },
  { icon: <InfoIcon />, title: "Cấu hình" },
  {
    icon: <EditIcon />,
    title: "Chỉnh sửa",
  },
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

const TabsTable = ({
  cv,
  onChangeCV,
}: {
  cv: CVTemplate;
  onChangeCV: (cv: CVTemplate) => void;
}) => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (tabIndex: number) => {
    setValue(tabIndex);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <TabPanel value={value} index={0}>
          <SuggestTab cv={cv} onChangeCV={onChangeCV} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ConfigTab cv={cv} onChangeCV={onChangeCV} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ComponentTab cv={cv} onChangeCV={onChangeCV}/>
        </TabPanel>
      </Grid>
      <Grid item xs={3}>
        <Stack spacing={2}>
          {tabs.map((content, index) => (
            <Button
              sx={{ textTransform: "none" }}
              key={index}
              variant={value === index ? "contained" : "outlined"}
              onClick={() => handleTabChange(index)}
            >
              <FlexCenter>
                {content.icon}
                <Text fontSize={10} mt={1}>
                  {content.title}
                </Text>
              </FlexCenter>
            </Button>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default TabsTable;

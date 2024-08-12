"use client";

import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// project imports
import { gridSpacing } from "store/constant";
import MainCard from "ui-component/cards/MainCard";

// assets
import FeedIcon from "@mui/icons-material/Feed";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AddAlarmTwoToneIcon from "@mui/icons-material/AddAlarmTwoTone";

// types
import { TabsProps } from "types";
import { ThemeMode } from "types/config";
import ExpertCalendarPage from "./_component/ExpertCalendar";
import CustomerCalendarPage from "./_component/CustomerBooking";
import CalendarHistoryPage from "./_component/CalendarHistory";
import { Button } from "@mui/material";
import { useRefresh } from "hooks/use-refresh";
import { ExpertToken } from "hooks/use-login";
import { useGetExpertCurrent } from "hooks/use-get-expert-profile";
import { useGetAvailability } from "hooks/use-get-availability";

// tabs panel
function TabPanel({ children, value, index, ...other }: TabsProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// tabs option
const tabsOption = [
  {
    label: "Lịch phỏng vấn",
    icon: <CalendarMonthIcon sx={{ fontSize: "1.3rem" }} />,
    caption: "Lịch phỏng vấn của bạn",
  },
];

// ==============================|| EXPERT BOOKING PAGE ||============================== //

const ExpertBookingPage = () => {
  const theme = useTheme();

  const [value, setValue] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleNextStep = () => {
    setValue(1);
  };

  const handlePrevStep = () => {
    setValue(0);
  };

  return (
      <MainCard>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="icon label tabs example"
              variant="scrollable"
              sx={{
                "& .MuiTabs-flexContainer": {
                  borderBottom: "none",
                },
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                "& .MuiButtonBase-root + .MuiButtonBase-root": {
                  position: "relative",
                  overflow: "visible",
                  ml: 2,
                  "&:after": {
                    content: '""',
                    bgcolor: "#ccc",
                    width: 1,
                    height: "calc(100% - 16px)",
                    position: "absolute",
                    top: 8,
                    left: -8,
                  },
                },
              }}
            >
              {tabsOption.map((tab, index) => (
                <Tab
                  value={index}
                  key={index}
                  icon={tab.icon}
                  label={
                    <Grid container direction="column">
                      <Typography variant="subtitle1" color="inherit">
                        {tab.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {tab.caption}
                      </Typography>
                    </Grid>
                  }
                  sx={{
                    color: value === index ? "primary.main" : "grey.900",
                    bgcolor:
                      value === index
                        ? theme.palette.mode === ThemeMode.DARK
                          ? "dark.main"
                          : "grey.50"
                        : "transparent",
                    minHeight: "auto",
                    minWidth: { xs: "100%", md: 250 },
                    padding: 2,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                    textAlign: "left",
                    justifyContent: "flex-start",
                    "&:after": {
                      bgcolor: "transparent !important",
                    },
                    "&.Mui-selected": {
                      color: "primary.main",
                      bgcolor:
                        theme.palette.mode === ThemeMode.DARK
                          ? "dark.main"
                          : "grey.50",
                    },
                    "& > svg": {
                      marginBottom: "0px !important",
                      mr: 1.25,
                      mt: 0.25,
                      height: 20,
                      width: 20,
                    },
                  }}
                />
              ))}
            </Tabs>
          </Grid>

          <Grid item xs={12}>
            <TabPanel value={value} index={0}>
              <ExpertCalendarPage onNext={handleNextStep} />
            </TabPanel>
            {/* <TabPanel value={value} index={1}>
                            <CustomerCalendarPage onNext={() => { }} onSelectEvent={() => { }} />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <CalendarHistoryPage onNext={() => { }} onSelectEvent={() => { }} />
                        </TabPanel> */}
          </Grid>
        </Grid>
      </MainCard>
  );
};

export default ExpertBookingPage;

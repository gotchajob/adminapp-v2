'use client';

import Link from 'next/link';
import { SyntheticEvent, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

// project imports
import ChangePassword from 'components/users/account-profile/Profile1/ChangePassword';
import MyAccount from 'components/users/account-profile/Profile1/MyAccount';
import Settings from 'components/users/account-profile/Profile1/Settings';
import Profile from 'components/users/account-profile/Profile_User_plk/Profile';
import MainCard from 'ui-component/cards/MainCard';

// assets
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import DescriptionTwoToneIcon from '@mui/icons-material/DescriptionTwoTone';
import LibraryBooksTwoToneIcon from '@mui/icons-material/LibraryBooksTwoTone';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

// types
import { TabsProps } from 'types';
import { ThemeMode } from 'types/config';
import Billing from 'components/users/account-profile/Profile_User_plk/Billing';



// tabs panel
function TabPanel({ children, value, index, ...other }: TabsProps) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

// ally props
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

// tabs option
const tabsOption = [
    {
        label: 'Profile',
        icon: <AccountCircleTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    {
        label: 'Billing',
        icon: <DescriptionTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    },
    // {
    //     label: 'My Account',
    //     icon: <LibraryBooksTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    // },
    // {
    //     label: 'Change Password',
    //     icon: <LockTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    // },
    // {
    //     label: 'Settings',
    //     icon: <MailTwoToneIcon sx={{ fontSize: '1.3rem' }} />
    // }
];

// ==============================|| PROFILE 1 ||============================== //

const UserProfile = () => {
    const theme = useTheme();

    const [value, setValue] = useState<number>(0);
    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="simple tabs example"
                        variant="scrollable"
                        sx={{
                            mb: 3,
                            '& a': {
                                minHeight: 'auto',
                                minWidth: 10,
                                py: 1.5,
                                px: 1,
                                mr: 2.25,
                                color: theme.palette.mode === ThemeMode.DARK ? 'grey.600' : 'grey.900',
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& a.Mui-selected': {
                                color: 'primary.main'
                            },
                            '& .MuiTabs-indicator': {
                                bottom: 2
                            },
                            '& a > svg': {
                                marginBottom: '0px !important',
                                mr: 1.25
                            }
                        }}
                    >
                        {tabsOption.map((tab, index) => (
                            <Tab key={index} component={Link} href="#" icon={tab.icon} label={tab.label} {...a11yProps(index)} />
                        ))}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Profile />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {/* <Billing /> */}
                        <MainCard></MainCard>
                    </TabPanel>
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default UserProfile;

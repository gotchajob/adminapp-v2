'Use client';

import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { FlexCenter } from 'components/common/box/flex-box';
import { Text } from 'components/common/text/text';
import SubCard from 'ui-component/cards/SubCard';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  CVComponent,
  CVTemplate,
  ComponentTemplateList,
  PersonalComponent,
  PersonalInformationTemplate,
  introduction
} from 'components/cv-component/interface';
import Iconify from 'components/iconify/iconify';
import { PRIMARYCOLOR } from 'components/common/config';
import { StyledLink } from 'components/common/link/styled-link';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const defaultShadow = '0 2px 14px 0 rgb(33 150 243 / 10%)';

const tabs = [
  { icon: <InfoIcon />, title: 'Hướng dẫn' },
  {
    icon: <EditIcon />,
    title: 'Chỉnh sửa'
  }
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

const TabsTable = ({ cv, onChangeCV }: { cv: CVTemplate; onChangeCV: (cv: CVTemplate) => void }) => {
  const [value, setValue] = React.useState(0);

  const handleTabChange = (tabIndex: number) => {
    setValue(tabIndex);
  };

  const [openComponent, setOpenComponent] = React.useState(true);

  const handleOpenComponent = () => {
    setOpenComponent(!openComponent);
  };

  const [openInformation, setOpenInformation] = React.useState(true);

  const handleOpenInformation = () => {
    setOpenInformation(!openInformation);
  };

  const allComponent = React.useMemo(() => {
    const componentList: CVComponent[] = [];
    cv.layout.forEach((column) => {
      column.componentList.forEach((component) => {
        componentList.push(component);
      });
    });
    return componentList;
  }, [cv]);

  const handleUpdateInformation = (information: PersonalComponent, isAdded: boolean) => {
    const newCV = { ...cv };
    let newPersonal: PersonalComponent[] = [];
    if (isAdded) {
      newPersonal = newCV.personal.filter((value) => value.field !== information.field);
    } else {
      newPersonal = [...newCV.personal, information];
    }
    newCV.personal = newPersonal;
    onChangeCV(newCV);
  };

  const handleUpdateComponent = (component: CVComponent) => {
    const newCV = { ...cv };
    newCV.layout[newCV.layout.length - 1].componentList.push(component);
    onChangeCV(newCV);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TabPanel value={value} index={0}>
            <SubCard title={'Hướng dẫn viết CV'} sx={{ width: '100%', boxShadow: defaultShadow }} contentSX={{ py: 0, px: 1 }}>
              <div dangerouslySetInnerHTML={{ __html: introduction }}></div>
            </SubCard>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SubCard title={'Chỉnh sửa CV'} sx={{ width: '100%', boxShadow: defaultShadow }} contentSX={{ p: 0 }}>
              <List>
                <ListItemButton onClick={handleOpenComponent}>
                  <ListItemText primary="Thông tin cá nhân" />
                  {openComponent ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openComponent} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {PersonalInformationTemplate.map((information) => {
                      const isAdded = cv.personal.find((value) => value.field === information.field);
                      return (
                        <ListItemButton
                          onClick={() => {
                            handleUpdateInformation(information, Boolean(isAdded));
                          }}
                        >
                          <ListItemIcon>
                            <Iconify color={isAdded ? 'red' : PRIMARYCOLOR} icon={information.icon} />
                          </ListItemIcon>
                          <ListItemText
                            primary={<Text color={isAdded ? 'error' : ''}>{`${isAdded ? 'Xoá' : 'Thêm'} ${information.fieldName}`}</Text>}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
                <ListItemButton onClick={handleOpenInformation}>
                  <ListItemText primary="Danh mục" />
                  {openInformation ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openInformation} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {ComponentTemplateList.map((component) => {
                      const isAdded = allComponent.find((value) => value.componentName === component.componentName);
                      return (
                        <ListItemButton
                          disabled={Boolean(isAdded)}
                          onClick={() => {
                            handleUpdateComponent(component);
                          }}
                        >
                          <ListItemIcon>
                            <Iconify color={PRIMARYCOLOR} icon={component.icon} />
                          </ListItemIcon>
                          <ListItemText primary={'Thêm ' + component.title} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </List>
            </SubCard>
          </TabPanel>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={2}>
            {tabs.map((content, index) => (
              <Button
                sx={{ textTransform: 'none' }}
                key={index}
                variant={value === index ? 'contained' : 'outlined'}
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
            <StyledLink href="/share-cv">
              <Button fullWidth sx={{ textTransform: 'none' }} variant={'outlined'}>
                <FlexCenter>
                  <Iconify width={24} icon="tabler:user-search" color={PRIMARYCOLOR} />
                  <Text fontSize={10} mt={1}>
                    Tìm kiếm
                  </Text>
                </FlexCenter>
              </Button>
            </StyledLink>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default TabsTable;

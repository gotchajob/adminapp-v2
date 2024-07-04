// third-party
import { FormattedMessage } from 'react-intl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// assets
import { IconDashboard, IconChartDots, IconUserCheck, IconBasket, IconFileInvoice, IconMail, IconUser } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="Staff CMS" />,
  icon: IconDashboard,
  type: 'group',
  children: [
    {
      id: 'profile',
      title: <FormattedMessage id="Thiết lập tài khoản" />,
      type: 'item',
      url: '/expert/account-profile',
      icon: IconChartDots,
      breadcrumbs: false
    },
    {
      id: 'expert-calendar',
      title: <FormattedMessage id="Lịch phỏng vấn" />,
      icon: CalendarMonthIcon,
      type: 'item',
      url: '/expert/expert-calendar',
      breadcrumbs: false
    }
  ]
};

export default dashboard;

// third-party
import { FormattedMessage } from 'react-intl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FeedIcon from '@mui/icons-material/Feed';

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
      id: 'interview-calendar',
      title: <FormattedMessage id="Lịch phỏng vấn" />,
      type: 'item',
      url: '/expert/expert-calendar',
      icon: CalendarMonthIcon,
      breadcrumbs: false
    },
    {
      id: 'booking-calendar',
      title: <FormattedMessage id="Danh sách đặt lịch" />,
      type: 'item',
      url: '/expert/booking-calendar',
      icon: ContactMailIcon,
      breadcrumbs: false
    },
    {
      id: 'history-calendar',
      title: <FormattedMessage id="Lịch sủ đặt lịch" />,
      type: 'item',
      url: '/expert/history-calendar',
      icon: FeedIcon,
      breadcrumbs: false
    },
  ]
};

export default dashboard;

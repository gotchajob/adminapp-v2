// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconDeviceAnalytics, IconChartDots, IconUserCheck, IconBasket, IconMessages, IconBellRinging, IconFileInvoice, IconMail } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

const icons = {
  IconDashboard: IconDashboard,
  IconDeviceAnalytics: IconDeviceAnalytics,
  IconUserCheck: IconUserCheck,
  IconChartDots: IconChartDots,
  IconBasket: IconBasket,
  IconMessages: IconMessages,
  IconBellRinging: IconBellRinging,
  IconFileInvoice: IconFileInvoice,
  IconMail: IconMail,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="admin CMS" />,
  icon: icons.IconDashboard,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      url: '/admin/dashboard',
      icon: icons.IconChartDots,
      breadcrumbs: false
    },
    {
      id: 'user',
      title: <FormattedMessage id="User" />,
      type: 'item',
      url: '/admin/user',
      icon: icons.IconUserCheck,
      breadcrumbs: false
    },
    {
      id: 'Expert',
      title: <FormattedMessage id="Expert" />,
      type: 'item',
      url: '/admin/expert',
      icon: icons.IconMail,
      breadcrumbs: false
    },
    {
      id: 'transaction',
      title: <FormattedMessage id="Transaction" />,
      type: 'item',
      url: '/admin/transaction',
      icon: icons.IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: 'request',
      title: <FormattedMessage id="Request" />,
      type: 'item',
      url: '/admin/request',
      icon: icons.IconBasket,
      breadcrumbs: false
    },
    // {
    //   id: 'advisory',
    //   title: <FormattedMessage id="Advisory" />,
    //   type: 'item',
    //   url: '/admin/advisory',
    //   icon: icons.IconMessages,
    //   breadcrumbs: false
    // },
    // {
    //   id: 'notification',
    //   title: <FormattedMessage id="Notification" />,
    //   type: 'item',
    //   url: '/admin/notification',
    //   icon: icons.IconBellRinging,
    //   breadcrumbs: false
    // },
  ]
};

export default dashboard;

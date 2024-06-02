// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard, IconChartDots, IconUserCheck, IconBasket, IconFileInvoice, IconMail, IconUser } from '@tabler/icons-react';

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="admin CMS" />,
  icon: IconDashboard,
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="Thống kê" />,
      type: 'item',
      url: '/admin/dashboard',
      icon: IconChartDots,
      breadcrumbs: false
    },
    {
      id: 'user',
      title: <FormattedMessage id="Người dùng" />,
      type: 'item',
      url: '/admin/user',
      icon: IconUser,
      breadcrumbs: false
    },
    {
      id: 'transaction',
      title: <FormattedMessage id="Giao dịch" />,
      type: 'item',
      url: '/admin/transaction',
      icon: IconFileInvoice,
      breadcrumbs: false
    },
    {
      id: 'expert-manager',
      title: <FormattedMessage id="Quản lí chuyên gia" />,
      icon: IconUserCheck,
      type: 'collapse',
      children: [
        {
          id: 'Expert',
          title: <FormattedMessage id="Chuyên gia" />,
          type: 'item',
          url: '/admin/expert',
          breadcrumbs: false
        },
        {
          id: 'requests',
          title: <FormattedMessage id="Chuyên gia gửi yêu cầu" />,
          type: 'item',
          url: '/admin/expert-request',
          breadcrumbs: false
        },
        {
          id: 'Request',
          title: <FormattedMessage id="Yêu cầu" />,
          type: 'item',
          url: '/admin/request',
          breadcrumbs: false
        }
      ]
    }
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

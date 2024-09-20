// third-party
import { FormattedMessage } from 'react-intl';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import PaidIcon from '@mui/icons-material/Paid';

// assets
import { IconDashboard, IconChartDots, IconUserCheck, IconBasket, IconFileInvoice, IconMail, IconUser } from '@tabler/icons-react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PolicyIcon from '@mui/icons-material/Policy';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="Hệ thống quản lý của quản trị viên" />,
  icon: IconDashboard,
  type: 'group',
  children: [
    {
      id: "dashboard",
      title: <FormattedMessage id="Thống kê" />,
      type: "item",
      url: "/admin/dashboard",
      icon: IconChartDots,
    },
    {
      id: 'policy-config',
      title: <FormattedMessage id="Cấu hình chính sách dịch vụ" />,
      type: 'item',
      url: '/admin/policy-config',
      icon: PolicyIcon,
      breadcrumbs: false
    },
    {
      id: "staff-controller",
      title: <FormattedMessage id="Quản lí nhân viên" />,
      type: "item",
      url: "/admin/staff-controller",
      icon: ManageAccountsIcon,
      breadcrumbs: false,
    },
  ]
};

export default dashboard;

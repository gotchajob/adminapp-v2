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

// type
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: 'dashboard',
  title: <FormattedMessage id="Hệ thống quản lý của chuyên gia" />,
  icon: IconDashboard,
  type: 'group',
  children: [
    {
      id: 'profile',
      title: <FormattedMessage id="Thiết lập tài khoản" />,
      type: 'item',
      url: '/expert/account-profile',
      icon: PersonIcon,
      breadcrumbs: false
    },
    {
      id: "Q&A",
      title: <FormattedMessage id="Quản lí câu hỏi phỏng vấn" />,
      type: "item",
      url: "/expert/interview-question-manage",
      icon: QuestionAnswerIcon,
      breadcrumbs: false,
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
      title: <FormattedMessage id="Lịch sủ các buổi phỏng vấn" />,
      type: 'item',
      url: '/expert/history-calendar',
      icon: FeedIcon,
      breadcrumbs: false
    },
    {
      id: 'history-transaction',
      title: <FormattedMessage id="Lịch sủ giao dịch" />,
      type: 'item',
      url: '/expert/transaction',
      icon: PaidIcon,
      breadcrumbs: false
    },
  ]
};

export default dashboard;

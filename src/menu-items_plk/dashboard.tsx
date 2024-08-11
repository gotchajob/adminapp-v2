// third-party
import { FormattedMessage } from "react-intl";

// assets
import {
  IconDashboard,
  IconChartDots,
  IconUserCheck,
  IconBasket,
  IconFileInvoice,
  IconMail,
  IconUser,
} from "@tabler/icons-react";

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import PriceChangeIcon from '@mui/icons-material/PriceChange';

import ContactsIcon from '@mui/icons-material/Contacts';

// type
import { NavItemType } from "types";

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard: NavItemType = {
  id: "dashboard",
  title: <FormattedMessage id="Hệ thống quản lý của nhân viên" />,
  icon: IconDashboard,
  type: "group",
  children: [
    {
      id: "dashboard",
      title: <FormattedMessage id="Thống kê" />,
      type: "item",
      url: "/staff/dashboard",
      icon: IconChartDots,
      breadcrumbs: false,
    },
    {
      id: "cv",
      title: <FormattedMessage id="Quản lí CV" />,
      type: "item",
      url: "/staff/cv",
      icon: ContactsIcon,
      breadcrumbs: false,
    },
    {
      id: "feedback",
      title: <FormattedMessage id="Quản lí đánh giá" />,
      type: "item",
      url: "/staff/interview-question",
      icon: QuestionAnswerIcon,
      breadcrumbs: false,
    },
    {
      id: "user",
      title: <FormattedMessage id="Người dùng" />,
      type: "item",
      url: "/staff/user",
      icon: IconUser,
      breadcrumbs: false,
    },
    {
      id: "blog",
      title: <FormattedMessage id="Quản lí blog" />,
      type: "item",
      url: "/staff/blog",
      icon: PriceChangeIcon,
      breadcrumbs: false,
    },
    {
      id: "transaction",
      title: <FormattedMessage id="Giao dịch" />,
      type: "item",
      url: "/staff/transaction",
      icon: IconFileInvoice,
      breadcrumbs: false,
    },
    {
      id: "expert-manager",
      title: <FormattedMessage id="Quản lí chuyên gia" />,
      icon: IconUserCheck,
      type: "collapse",
      children: [
        {
          id: "Expert",
          title: <FormattedMessage id="Chuyên gia" />,
          type: "item",
          url: "/staff/expert",
          breadcrumbs: false,
        },
        {
          id: "requests",
          title: <FormattedMessage id="Chuyên gia gửi yêu cầu" />,
          type: "item",
          url: "/staff/expert-request",
          breadcrumbs: false,
        },
        {
          id: "expert-form-require",
          title: <FormattedMessage id="Yêu cầu đăng ký chuyên gia" />,
          type: "item",
          url: "/staff/expert-form-require",
          breadcrumbs: false,
        },
        {
          id: "category-controller",
          title: <FormattedMessage id="Quản lý ngành nghề" />,
          type: "item",
          url: "/staff/skill-manage",
          breadcrumbs: false,
        },
        // {
        //   id: "skill-option-controller",
        //   title: <FormattedMessage id="Quản lý chuyên ngành" />,
        //   type: "item",
        //   url: "/staff/expert-form-require",
        //   breadcrumbs: false,
        // },
        // {
        //   id: "skill-controller",
        //   title: <FormattedMessage id="Quản lý kỹ năng" />,
        //   type: "item",
        //   url: "/staff/skill-controller",
        //   breadcrumbs: false,
        // },
      ],
    },
  ],
};

export default dashboard;

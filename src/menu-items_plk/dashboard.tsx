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

import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import PriceChangeIcon from '@mui/icons-material/PriceChange';

import ContactsIcon from '@mui/icons-material/Contacts';

import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

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
      title: <FormattedMessage id="Thống kê doanh thu" />,
      type: "item",
      url: "/staff/dashboard",
      icon: IconChartDots,
      breadcrumbs: false,
    },
    {
      id: "cv-dashboard",
      title: <FormattedMessage id="Thống kê cv" />,
      type: "item",
      url: "/staff/cv-dashboard",
      icon: IconChartDots,
      breadcrumbs: false,
    },
    {
      id: "expert-dashboard",
      title: <FormattedMessage id="Thống kê chuyên gia" />,
      type: "item",
      url: "/staff/expert-dashboard",
      icon: IconChartDots,
      breadcrumbs: false,
    },
    {
      id: "cv",
      title: <FormattedMessage id="Quản lý CV" />,
      type: "item",
      url: "/staff/cv",
      icon: ContactsIcon,
      breadcrumbs: false,
    },
    {
      id: "feedback",
      title: <FormattedMessage id="Quản lý đánh giá" />,
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
      title: <FormattedMessage id="Quản lý bài viết" />,
      type: "item",
      url: "/staff/blog",
      icon: PriceChangeIcon,
      breadcrumbs: false,
    },
    {
      id: "report-suggest",
      title: <FormattedMessage id="Report Suggest" />,
      type: "item",
      url: "/staff/report-suggest",
      icon: ReportGmailerrorredIcon,
      breadcrumbs: false,
    },
    {
      id: "booking-report",
      title: <FormattedMessage id="Quản lý báo cáo buổi phỏng vấn" />,
      type: "item",
      url: "/staff/booking-report",
      icon: ReportProblemIcon,
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
      title: <FormattedMessage id="Quản lý chuyên gia" />,
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
          title: <FormattedMessage id="Quản lý yêu cầu đăng ký chuyên gia" />,
          type: "item",
          url: "/staff/expert-form-require",
          breadcrumbs: false,
        },
        {
          id: "category-controller",
          title: <FormattedMessage id="Quản lý ngành nghề chuyên gia đăng ký" />,
          type: "item",
          url: "/staff/skill-manage",
          breadcrumbs: false,
        },
        {
          id: "expert-transaction-withdraw",
          title: <FormattedMessage id="Yêu cầu rút tiền của chuyên gia" />,
          type: "item",
          url: "/staff/expert-transaction-withdraw",
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

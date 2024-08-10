export interface CVTemplate {
  name: string;
  primaryColor: string;
  suggest: string;
  templateComponent: CVComponent[];
  templatePersonal: PersonalComponent[];
  personal: PersonalComponent[];
  layout: Column[];
}
export interface PersonalComponent {
  title: string;
  field: string;
  icon: string;
  fieldName: string;
}
export interface Column {
  backgroudColor: string;
  size: number;
  componentSize: number[];
  componentList: CVComponent[];
}
export interface CVComponent {
  componentName: string;
  icon: string;
  title: string;
  header: string;
  dataType: "image" | "information" | "text" | "default" | string;
  description: string;
}

export const componentDataTypeOption = [
  {
    name: "Hình ảnh",
    dataType: "image",
  },
  {
    name: "Thông tin cá nhân",
    dataType: "information",
  },
  {
    name: "Văn bản có tiêu đề",
    dataType: "text",
  },
  {
    name: "Văn bản không tiêu đề",
    dataType: "default",
  },
];
export const ComponentTemplateList: CVComponent[] = [
  {
    componentName: "avatar",
    dataType: "image",
    header: "Image",
    description:
      "https://th.bing.com/th/id/OIP.BHI-bf_xIJUNIsSCsVH58AHaHa?w=193&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    icon: "icon-park-outline:avatar",
    title: "Ảnh đại diện",
  },
  {
    componentName: "information",
    dataType: "information",
    header:
      '<p><strong><span style="font-size: 14pt; color: rgb(35, 111, 161);">Personal Details</span></strong></p>',
    description: "",
    icon: "tdesign:personal-information",
    title: "Thông tin cá nhân",
  },
  {
    componentName: "skill",
    dataType: "text",
    header:
      '<p><span style="font-size: 14pt; color: rgb(35, 111, 161);"><strong>Skill</strong></span></p>',
    icon: "mingcute:pencil-line",
    title: "Kĩ năng cá nhân",
    description:
      '<p><span style="font-size: 10pt;"><strong><span style="color: rgb(89, 171, 217);">Skill A</span></strong>: &nbsp; Skill 1</span></p>\n<p><span style="font-size: 10pt;"><strong><span style="color: rgb(89, 171, 217);">Skill B</span></strong>: &nbsp; Skill 2</span></p>\n<p><span style="font-size: 10pt;"><strong><span style="color: rgb(89, 171, 217);">Skill C</span></strong>: &nbsp; Skill 3</span></p>',
  },
  {
    componentName: "objective",
    dataType: "text",
    header:
      '<p><strong><span style="font-size: 14pt; color: rgb(35, 111, 161);">Profile&nbsp;</span></strong></p>',
    description: '<p><span style="font-size: 10pt;">Profile Bio</span></p>',
    icon: "ph:target",
    title: "Mục tiêu nghề nghiệp",
  },
  {
    componentName: "experience",
    dataType: "text",
    icon: "bytesize:work",
    title: "Kinh nghiệm",
    header:
      '<p><span style="color: rgb(35, 111, 161);"><strong><span style="font-size: 14pt;">Employment</span></strong></span></p>',
    description:
      '<p><span style="font-size: 10pt;"><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="color: rgb(89, 171, 217);">Feb 2013 - May 2020</span></strong></span></p>\n<p><span style="color: rgb(89, 171, 217); font-size: 10pt;">Nanelle, Marseille</span></p>\n<ul>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">Gestion du portefeuille clients B2B France et international</span></li>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>\n</ul>\n<p>&nbsp;</p>\n<p><span style="font-size: 10pt;"><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span style="color: rgb(89, 171, 217);">Feb 2013 - May 2020</span></strong></span></p>\n<p><span style="color: rgb(89, 171, 217); font-size: 10pt;">Nanelle, Marseille</span></p>\n<ul>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">Gestion du portefeuille clients B2B France et international</span></li>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>\n<li style="font-size: 10pt; line-height: 2;"><span style="color: rgb(0, 0, 0); font-size: 10pt;">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>\n</ul>',
  },
];
export const PersonalInformationTemplate: PersonalComponent[] = [
  {
    field: "address",
    icon: "mdi:location",
    title:
      '<p style="line-height: 1;"><span style="font-size: 10pt;">Nhap dia chi</span></p>',
    fieldName: "Địa chỉ",
  },
  {
    field: "name",
    icon: "ic:baseline-person",
    title:
      '<p style="line-height: 1;"><span style="font-size: 10pt;">Nhap ho ten</span></p>',
    fieldName: "Họ tên",
  },
  {
    field: "birthday",
    icon: "ic:baseline-calendar-month",
    title:
      '<p style="line-height: 1;"><span style="font-size: 10pt;">dd/mm/yyyy</span></p>',
    fieldName: "Năm sinh",
  },
  {
    field: "phone",
    icon: "ic:baseline-phone",
    title:
      '<p style="line-height: 1;"><span style="font-size: 10pt;">0123456789</span></p>',
    fieldName: "Số điện thoại",
  },
  {
    field: "email",
    icon: "ic:baseline-email",
    title:
      '<p style="line-height: 1;"><span style="font-size: 10pt;">Nhap mail</span></p>',
    fieldName: "Email",
  },
  {
    field: "git",
    icon: "fluent-mdl2:git-hub-logo",
    title:
      '<p style="line-height: 1;"><span style="font-size: 10pt;">Nhap git</span></p>',
    fieldName: "Git",
  },
];

export const CVTemplateData: CVTemplate = {
  name: "new template",
  suggest: "Nhập hướng dẫn tại đây",
  primaryColor: "",
  personal: [],
  templatePersonal: PersonalInformationTemplate,
  templateComponent: [],
  layout: [
    {
      backgroudColor: "#ffffff",
      componentList: [],
      componentSize: [12],
      size: 12,
    },
  ],
};

export const SampleColumn: Column = {
  backgroudColor: "#2196f3",
  componentList: [],
  componentSize: [1, 2],
  size: 12,
};

export const introduction = `<h2 style={{color: '#2196f3'}}>Hướng dẫn viết CV cho IT:</h2>
  <p><em><strong style={{color: '#2196f3'}}>Lưu ý chung</strong></em>:</p>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Đặt tên file: <em>CV_HoTen_ViTriUngTuyen</em></li>
    <li>Kiểm tra lỗi chính tả và ngữ pháp</li>
    <li>Sử dụng font chữ và định dạng nhất quán</li>
    <li>Giới hạn CV trong 1-2 trang</li>
    <li>Tránh sử dụng từ ngữ chung chung, tập trung vào thành tích cụ thể</li>
    <li>Cập nhật CV theo yêu cầu của từng vị trí ứng tuyển</li>
  </ul>
  <ol>
    <li><strong style={{color: '#2196f3'}}>Thông tin cá nhân</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Họ và tên</li>
    <li>Số điện thoại</li>
    <li>Email</li>
    <li>Địa chỉ</li>
    <li>GitHub/Portfolio (nếu có)</li>
  </ul>
  <ol start={2}>
    <li><strong style={{color: '#2196f3'}}>Mục tiêu nghề nghiệp</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Nêu rõ vị trí cụ thể (ví dụ: Lập trình viên Full-stack, Kỹ sư DevOps, Chuyên viên An ninh mạng)</li>
    <li>Mô tả ngắn gọn mong muốn đóng góp vào dự án/công ty</li>
  </ul>
  <ol start={3}>
    <li><strong style={{color: '#2196f3'}}>Kỹ năng</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Ngôn ngữ lập trình (ví dụ: Java, Python, JavaScript)</li>
    <li>Công nghệ/Framework (ví dụ: React, Node.js, Docker)</li>
    <li>Cơ sở dữ liệu (ví dụ: MySQL, MongoDB)</li>
    <li>Công cụ phát triển (ví dụ: Git, Jenkins, Jira)</li>
  </ul>
  <ol start={4}>
    <li><strong style={{color: '#2196f3'}}>Học vấn</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Tên trường, chuyên ngành, thời gian học</li>
    <li>GPA (nếu ấn tượng)</li>
    <li>Các khóa học online/chứng chỉ IT liên quan</li>
  </ul>
  <ol start={5}>
    <li><strong style={{color: '#2196f3'}}>Kinh nghiệm làm việc</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Sắp xếp từ gần nhất đến xa nhất</li>
    <li>Tên công ty, vị trí, thời gian làm việc</li>
    <li>Mô tả dự án: công nghệ sử dụng, vai trò, trách nhiệm</li>
    <li>Thành tích: tối ưu hóa hiệu suất, giảm thời gian phát triển, số lượng người dùng</li>
  </ul>
  <ol start={6}>
    <li><strong style={{color: '#2196f3'}}>Dự án cá nhân</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Tên dự án, mô tả ngắn gọn</li>
    <li>Công nghệ sử dụng</li>
    <li>Link GitHub/demo (nếu có)</li>
  </ul>
  <ol start={7}>
    <li><strong style={{color: '#2196f3'}}>Chứng chỉ IT (nếu có)</strong>:</li>
  </ol>
  <ul style={{listStyleType: 'disc', paddingLeft: '30px'}}>
    <li>Tên chứng chỉ (ví dụ: AWS Certified, CCNA)</li>
    <li>Đơn vị cấp, năm nhận</li>
  </ul>`;

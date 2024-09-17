export const DvcsConfig = [
  {
    id: 0,
    key: 'OPC',
    subKey: 'OPC',
    description: 'Văn Phòng Công Ty'
  },
  {
    id: 1,
    key: '',
    subKey: 'OPC',
    description: 'Công Ty Cổ Phần Dược Phẩm OPC'
  },
  {
    id: 2,
    key: 'OPC',
    subKey: 'OPC',
    description: 'Tài Chính Kế Toán Công Ty'
  },
  {
    id: 3,
    key: 'OPC_TP',
    subKey: 'A02',
    description: 'CN Hồ Chí Minh'
  },
  {
    id: 4,
    key: 'OPC_CT',
    subKey: 'A03',
    description: 'CN Cần Thơ'
  },
  {
    id: 5,
    key: 'OPC_TG',
    subKey: 'A04',
    description: 'CN Tiền Giang'
  },
  {
    id: 6,
    key: 'OPC_MD',
    subKey: 'A05',
    description: 'CN Miền Đông'
  },
  {
    id: 7,
    key: 'OPC_VT',
    subKey: 'A06',
    description: 'CN Vũng Tàu'
  },
  {
    id: 8,
    key: 'OPC_NT',
    subKey: 'A07',
    description: 'CN Nha Trang'
  },
  {
    id: 9,
    key: 'OPC_DN',
    subKey: 'A08',
    description: 'CN Đà Nẵng'
  },
  {
    id: 10,
    key: 'OPC_NA',
    subKey: 'A09',
    description: 'CN Nghệ An'
  },
  {
    id: 11,
    key: 'OPC_HN',
    subKey: 'A10',
    description: 'CN Hà Nội'
  }
];

interface ReturnType {
  id: number;
  key: string;
  subKey: string;
  description: string;
}

export const getDvcsConfigDetail = (id: number | null | undefined): ReturnType => {
  if (id) {
    return DvcsConfig[id];
  } else {
    return {
      id: 0,
      key: 'OPC',
      subKey: 'OPC',
      description: 'Văn Phòng Công Ty'
    };
  }
};

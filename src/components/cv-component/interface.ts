export interface CVTemplate {
  id: string;
  subject: string;
  numberColumn: number;
  status: boolean;
  name: string;
  personal: PersonalComponent[];
  layout: Column[];
}
export interface PersonalComponent {
  id: string;
  title: string;
  personalFieldId: string;
  personalField: PersonalField[];
}
export interface PersonalField {
  id: string;
  field: string;
  icon: string;
}
export interface Column {
  id: string;
  column: number;
  color: string;
  size: number;
  componentList: CVComponent[];
}
export interface CVComponent {
  id: string;
  header: string;
  dataType: 'image' | 'information' | 'text';
  description: string;
}
export const CVTemplate: CVTemplate = {
  id: '1',
  numberColumn: 2,
  name: "Kiet's CV",
  status: true,
  subject: 'IT',
  personal: [
    {
      id: '1',
      personalFieldId: '1',
      personalField: [
        {
          id: '1',
          field: 'name',
          icon: '/assets/images/avatar-1.png'
        }
      ],
      title: 'Lý Anh Kiệt'
    },
    {
      id: '2',
      personalFieldId: '2',
      personalField: [
        {
          id: '2',
          field: 'birthday',
          icon: '/assets/images/avatar-1.png'
        }
      ],
      title: '19/01/2002'
    },
    {
      id: '3',
      personalFieldId: '3',
      personalField: [
        {
          id: '3',
          field: 'phone',
          icon: '/assets/images/avatar-1.png'
        }
      ],
      title: '0123456789'
    },
    {
      id: '4',
      personalFieldId: '4',
      personalField: [
        {
          id: '4',
          field: 'email',
          icon: '/assets/images/avatar-1.png'
        }
      ],
      title: 'kietly1901@gmail.com'
    }
  ],
  layout: [
    {
      color: '#ad3f40',
      id: '1',
      column: 0,
      size: 0.5,
      componentList: []
    },
    {
      color: '#faf5f5',
      id: '2',
      column: 1,
      size: 3,
      componentList: [
        {
          dataType: 'image',
          header: "Personal Details",
          description: '/assets/images/users/profile.png',
          id: '1'
        },
        {
          dataType: 'text',
          header: "Personal Details",
          description: '/assets/images/users/profile.png',
          id: '2'
        }
      ]
    },
    {
      color: '#ffffff',
      id: '3',
      column: 2,
      size: 8.5,
      componentList: []
    }
  ]
};

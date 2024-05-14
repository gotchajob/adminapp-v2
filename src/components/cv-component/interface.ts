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
  personalField: PersonalField;
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
  color?: string;
  dataType: 'image' | 'information' | 'text';
  description: string;
}


export const CVTemplate: CVTemplate = {
  id: '1',
  numberColumn: 3,
  name: "Kiet's CV",
  status: true,
  subject: 'IT',
  personal: [
    {
      id: '1',
      personalFieldId: '1',
      personalField: {
        id: '1',
        field: 'name',
        icon: 'ic:baseline-person'
      },
      title: 'Lý Anh Kiệt'
    },
    {
      id: '2',
      personalFieldId: '2',
      personalField: {
        id: '2',
        field: 'birthday',
        icon: 'ic:baseline-calendar-month'
      },
      title: '19/01/2002'
    },
    {
      id: '3',
      personalFieldId: '3',
      personalField: {
        id: '3',
        field: 'phone',
        icon: 'ic:baseline-phone'
      },
      title: '0123456789'
    },
    {
      id: '4',
      personalFieldId: '4',
      personalField: {
        id: '4',
        field: 'email',
        icon: 'ic:baseline-email'
      },
      title: 'kietly1901@gmail.com'
    },
    {
      id: '5',
      personalFieldId: '5',
      personalField: {
        id: '5',
        field: 'address',
        icon: 'mdi:location'
      },
      title: 'DH FPT khu cn cao 123'
    }
  ],
  layout: [
    {
      color: '#faf5f5',
      id: '2',
      column: 1,
      size: 3,
      componentList: [
        {
          dataType: 'image',
          header: 'Image',
          description: 'https://th.bing.com/th/id/R.41921164a5125add470627e30d1286cc?rik=FzPBS2DwEt5Dfw&pid=ImgRaw&r=0',
          id: '1'
        },
        {
          dataType: 'text',
          color: '#ad3f40',
          header: 'Skill',
          description: '123456',
          id: '2'
        },
        {
          dataType: 'information',
          color: '#ad3f40',
          header: 'Personal Details',
          description: '<p>This is the initial content of the editor.</p>',
          id: '2'
        }
      ]
    },
    {
      color: '#ffffff',
      id: '3',
      column: 2,
      size: 8,
      componentList: [
        {
          dataType: 'text',
          color: '#ad3f40',
          header: 'Personal Details',
          description: '<p>This is the initial content of the editor.</p>',
          id: '2'
        },
        {
          dataType: 'text',
          color: '#ad3f40',
          header: 'Personal Details',
          description: '<p>This is the initial content of the editor.</p>',
          id: '2'
        }
      ]
    }
  ]
};



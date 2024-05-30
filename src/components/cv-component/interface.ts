export interface CVTemplate {
  id: string;
  subject: string;
  status: boolean;
  name: string;
  personal: PersonalComponent[];
  layout: Column[];
}
export interface PersonalComponent {
  id: string;
  title: string;
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
  name: "Kiet's CV",
  status: true,
  subject: 'IT',
  personal: [
    {
      id: '1',
      field: 'name',
      icon: 'ic:baseline-person',
      title: 'Lý Anh Kiệt'
    },
    {
      id: '2',
      field: 'birthday',
      icon: 'ic:baseline-calendar-month',
      title: '19/01/2002'
    },
    {
      id: '3',
      field: 'phone',
      icon: 'ic:baseline-phone',
      title: '0123456789'
    },
    {
      id: '4',
      field: 'email',
      icon: 'ic:baseline-email',
      title: 'kietly1901@gmail.com'
    }
  ],
  layout: [
    {
      color: '#ad3f40',
      id: '2',
      column: 0,
      size: 0.5,
      componentList: []
    },
    {
      color: '#faf5f5',
      id: '2',
      column: 1,
      size: 3.5,
      componentList: [
        {
          dataType: 'image',
          header: 'Image',
          description: 'https://th.bing.com/th/id/R.41921164a5125add470627e30d1286cc?rik=FzPBS2DwEt5Dfw&pid=ImgRaw&r=0',
          id: '1'
        },
        {
          dataType: 'information',
          color: '#ad3f40',
          header: 'Personal Details',
          description: '<p>This is the initial content of the editor.</p>',
          id: '2'
        },
        {
          dataType: 'text',
          color: '#ad3f40',
          header: 'Skill',
          description: `<p><strong><span style="color: rgb(173, 63, 64);">Skill A</span></strong>: &nbsp; L'autonomie</p>
          <p><strong><span style="color: rgb(173, 63, 64);">Skill B</span></strong>: &nbsp; L'autonomie</p>
          <p><strong><span style="color: rgb(173, 63, 64);">Skill C</span></strong>: &nbsp; L'autonomie</p>`,
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
          header: 'Profile',
          description: `<p>Je travaille depuis 9 ans en tant qu'assistante commerciale puis charg&eacute;e de client&egrave;le au sein de l'entreprise de mobilier et d&eacute;coration pour enfants Nanelle, collaborant avec des clients fran&ccedil;ais mais aussi internationaux. Aujourd'hui, je suis &agrave; la recherche d'un nouveau d&eacute;fi o&ugrave; la dimension internationale est tr&egrave;s pr&eacute;sente, notamment avec les pays hispaniques. Forte de mes exp&eacute;riences pass&eacute;es, je sais &ecirc;tre &agrave; l'&eacute;coute des clients, g&eacute;rer les situations de crise et j'aime travailler en &eacute;quipe.</p>`,
          id: '2'
        },
        {
          dataType: 'text',
          color: '#ad3f40',
          header: 'Employment',
          description: `<p><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(173, 63, 64);">Feb 2013 - May 2020</span></strong></p>
          <p><span style="color: rgb(173, 63, 64);">Nanelle, Marseille</span></p>
          <ul>
          <li><span style="color: rgb(0, 0, 0);">Gestion du portefeuille clients B2B France et international</span></li>
          <li><span style="color: rgb(0, 0, 0);">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>
          <li><span style="color: rgb(0, 0, 0);">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>
          <li><span style="color: rgb(0, 0, 0);">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>
          </ul>
          <p>&nbsp;</p>
          <p><strong>Charg&eacute;e de client&egrave;le&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span style="color: rgb(173, 63, 64);">Feb 2013 - May 2020</span></strong></p>
          <p><span style="color: rgb(173, 63, 64);">Nanelle, Marseille</span></p>
          <ul>
          <li><span style="color: rgb(0, 0, 0);">Gestion du portefeuille clients B2B France et international</span></li>
          <li><span style="color: rgb(0, 0, 0);">D&eacute;veloppement de la notori&eacute;t&eacute; de la marque : r&eacute;seaux sociaux, partenariat, concours</span></li>
          <li><span style="color: rgb(0, 0, 0);">Mise en place et d&eacute;veloppement de partenariats institutionnels et co-brandings</span></li>
          <li><span style="color: rgb(0, 0, 0);">Mise &agrave; jour des outils analytiques afin de mesurer la performance du service client</span></li>
          </ul>`,
          id: '2'
        }
      ]
    }
  ]
};

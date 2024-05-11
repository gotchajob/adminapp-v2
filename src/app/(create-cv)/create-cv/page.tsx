'use client';

import { CreateCV } from 'components/cv-component/cv';
import { CVTemplate } from 'components/cv-component/interface';

export default function Page() {
  return <CreateCV data={CVTemplate} />;
}

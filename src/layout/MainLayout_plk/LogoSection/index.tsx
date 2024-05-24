import NextLink from 'next/link';

// project imports
import { DASHBOARD_PATH } from 'config';
import Logo from 'ui-component/Logo';
import Image from 'next/image';

// ==============================|| MAIN LOGO ||============================== //

const logo = '/assets/images/logo/logo.png';

const LogoSection = () => (
  <NextLink href={DASHBOARD_PATH} aria-label="theme logo">
    <Image src={logo} height={300} width={300} alt="Gotchajob_logo" style={{ maxWidth: '90%', height: '100%' }} />
  </NextLink>
);

export default LogoSection;

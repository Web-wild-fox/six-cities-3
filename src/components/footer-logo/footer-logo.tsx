import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

export default function FooterLogo() {
  return (
    <Link
      className="footer__logo-link"
      to={AppRoute.Root}
    >
      <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
    </Link>
  );
}

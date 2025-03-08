import {Link} from 'react-router-dom';
import {AppRoute} from '@/constants';

type LogoProps = {
  type: 'header' | 'footer';
}

const sizes = {
  header: {
    width: 81,
    height: 41,
  },
  footer: {
    width: 64,
    height: 33,
  }
};

export default function Logo({type}: LogoProps): JSX.Element {
  const size = sizes[type];

  return (
    <Link
      className={`${type}__logo-link`}
      to={AppRoute.Root}
    >
      <img
        className={`${type}__logo`}
        src="img/logo.svg"
        alt="6 cities logo"
        {...size}
      />
    </Link>
  );
}

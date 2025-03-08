import Logo from '@/components/logo/logo';
import UserNav from '@/components/user-nav/user-nav';

type headerProps = {
  isViewLogin: boolean;
}

export default function Header({isViewLogin}: headerProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">

            <Logo type='header' />

          </div>
          {
            isViewLogin || <UserNav />
          }
        </div>
      </div>
    </header>
  );
}

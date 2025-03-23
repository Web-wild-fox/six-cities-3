import Logo from '@/components/logo/logo';
import UserNav from '@/components/user-nav/user-nav';

type headerProps = {
  hiddenUserNav?: boolean;
}

export default function Header({hiddenUserNav = false}: headerProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo type='header' />
          </div>

          {hiddenUserNav || <UserNav />}
        </div>
      </div>
    </header>
  );
}

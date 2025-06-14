import {memo} from 'react';
import Logo from '@/components/logo/logo';
import UserNav from '@/components/user-nav/user-nav';

type headerProps = {
  hiddenUserNav?: boolean;
}

export default function Header({hiddenUserNav = false}: headerProps): JSX.Element {
  const MemoLogo = memo(Logo);
  const MemoUserNav = memo(UserNav);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <MemoLogo
              type='header'
            />
          </div>

          {hiddenUserNav || <MemoUserNav />}
        </div>
      </div>
    </header>
  );
}

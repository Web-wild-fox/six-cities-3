import {ReactNode} from 'react';

type ChildrenType = {
  children: ReactNode;
}

export default function Header({children}: ChildrenType): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">

          {children}

        </div>
      </div>
    </header>
  );
}

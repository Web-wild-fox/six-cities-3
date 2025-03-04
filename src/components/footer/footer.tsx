import {ReactNode} from 'react';

type ChildrenType = {
  children: ReactNode;
}

export default function Footer({children}: ChildrenType): JSX.Element {
  return (
    <footer className="footer container">

      {children}

    </footer>
  );
}

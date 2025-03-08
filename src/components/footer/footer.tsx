import {ReactNode} from 'react';

type ChildrenProps = {
  children: ReactNode;
}

export default function Footer({children}: ChildrenProps): JSX.Element {
  return (
    <footer className="footer container">
      {children}
    </footer>
  );
}

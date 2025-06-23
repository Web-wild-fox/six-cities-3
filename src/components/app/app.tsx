import {HelmetProvider} from 'react-helmet-async';
import {RouterProvider} from 'react-router-dom';
import {router} from '@/services/router';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <RouterProvider
        router={router}
      />
    </HelmetProvider>
  );
}

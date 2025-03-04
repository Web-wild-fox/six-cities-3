import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '../../constants';
import Header from '../../components/header/header';
import HeaderLogo from '../../components/header-logo/header-logo';
import Footer from '../../components/footer/footer';
import FooterLogo from '../../components/footer-logo/footer-logo';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Страница не найдена</title>
      </Helmet>

      <Header>
        <HeaderLogo />
      </Header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <img
          src="../src/pages/not-found-page/img/page-not-found.jpg" alt="Страница не найдена"
          style={{
            margin: '0 auto',
            maxWidth: '900px'
          }}
        />

        <p
          style={{
            margin: '0 auto',
            paddingBottom: '20px',
            fontSize: '50px',
          }}
        >
          Ошибка 404
        </p>

        <p
          style={{
            margin: '0 auto',
            paddingBottom: '20px',
            fontSize: '16px',
            opacity: '0.6',
          }}
        >Ничего не найдено по этому адресу | не пугайте так кота!
        </p>

        <Link
          to={AppRoute.Root}
          style={{
            margin: '0 auto',
            color: '#4481c3',
            fontSize: '20px',
          }}
        >
          К списку городов
        </Link>

      </main>

      <Footer>
        <FooterLogo />
      </Footer>

    </div>
  );
}

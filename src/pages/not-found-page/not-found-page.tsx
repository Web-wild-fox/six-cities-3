import {Link} from 'react-router-dom';
import {Helmet} from 'react-helmet-async';
import {AppRoute} from '@/constants';
import styles from './not-found-page.module.css';
import Header from '@/components/header/header';
import Logo from '@/components/logo/logo';
import Footer from '@/components/footer/footer';

export default function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">

      <Helmet>
        <title>6 cities | Страница не найдена</title>
      </Helmet>

      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Page 404</h1>

        <img className={styles.image__main}
          src="img/page-not-found.jpg" alt="Страница не найдена"
        />

        <p className={styles.title__main}>
          Ошибка 404
        </p>

        <p className={styles.text__main}>
          Ничего не найдено по этому адресу | не пугайте так кота!
        </p>

        <Link
          className={styles.link__main}
          to={AppRoute.Root}
        >
          К списку городов
        </Link>

      </main>

      <Footer>
        <Logo type='footer' />
      </Footer>

    </div>
  );
}

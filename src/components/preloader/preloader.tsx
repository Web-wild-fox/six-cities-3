import styles from './preloader.module.css';

export default function Preloader() {
  return (
    <div className={styles.preloader}>
      <img
        className={styles.preloader__image}
        src="img/preloader.gif"
        alt="preloader"
      />
      <p className={styles.preloader__text}>
        Loading...
      </p>
    </div>
  );
}

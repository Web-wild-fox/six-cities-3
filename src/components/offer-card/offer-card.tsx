import clsx from 'clsx';
import {useState} from 'react';
import {MAX_RATING} from '@/constants';
import {OfferCardProps} from '@/types/offers';

export default function OfferCard(
  {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage
  }: OfferCardProps): JSX.Element {

  const [hoverCardData, setHoverCardData] = useState({});

  const handleMouseEnter = () => {
    const cardData = {
      id,
      title,
      type,
      price,
      isFavorite,
      isPremium,
      rating,
      previewImage
    };

    setHoverCardData({
      ...hoverCardData,
      ...cardData,
    });

    // Получение объекта карточки при наведении мышки
    // console.log(cardData);
  };

  return (
    <article
      className="cities__card place-card"
      id={id}
      onMouseEnter={handleMouseEnter}
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">
              &euro;{price}
            </b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button
            className={clsx('place-card__bookmark-button button', isFavorite && 'place-card__bookmark-button--active')} type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>

        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: `${rating * (100 / MAX_RATING)}%`
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">
            {title}
          </a>
        </h2>
        <p className="place-card__type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  );
}

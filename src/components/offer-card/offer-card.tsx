import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {OfferListItem} from '@/types/offers';
import {AppRoute, MAX_RATING} from '@/constants';

interface OfferCardProps {
  id: OfferListItem['id'];
  title: OfferListItem['title'];
  type: OfferListItem['type'];
  price: OfferListItem['price'];
  isFavorite: OfferListItem['isFavorite'];
  isPremium: OfferListItem['isPremium'];
  rating: OfferListItem['rating'];
  previewImage: OfferListItem['previewImage'];
  className: string;
  size: {width: number; height: number};
  onCardHover?: (id: string | null) => void;
}

export default function OfferCard(
  {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
    className,
    size,
    onCardHover,
  }: OfferCardProps): JSX.Element {

  return (
    <article
      className={`${className}__card place-card`}
      onMouseEnter={() => onCardHover?.(id)}
      onMouseLeave={() => onCardHover?.(null)}
    >
      {
        isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }
      <div className={`${className}__image-wrapper place-card__image-wrapper`}>
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            alt="Place image"
            {...size}
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
            className={clsx('place-card__bookmark-button button', isFavorite && 'place-card__bookmark-button--active')}
            type="button"
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
          <Link
            to={AppRoute.Offer + id}
          >
            {title}
          </Link>
        </h2>
        <p className="place-card__type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </div>
    </article>
  );
}

import {
  useState,
  ChangeEvent,
  Fragment
} from 'react';
import {OfferRatings} from '@/constants';

export default function ReviewsForm(): JSX.Element {
  const [formData, setFormData] = useState({
    review: '',
    rating: ''
  });

  const handleFormChange = (evt:
    ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});
  };

  const getRatingList = () =>
    OfferRatings.map(({title, rating}) => (
      <Fragment key={rating}>
        <input
          className="form__rating-input visually-hidden"
          id={`${rating}-stars`}
          name="rating"
          value={rating}
          type="radio"
          onChange={handleFormChange}
        />
        <label
          className="reviews__rating-label form__rating-label"
          htmlFor={`${rating}-stars`}
          title={title}
        >
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    ));

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {getRatingList()}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={formData.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          &thinsp;
          <span className="reviews__star">
            rating
          </span> and describe your stay with at least
          &thinsp;
          <b className="reviews__text-amount">
            50 characters
          </b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled
        >
          Submit
        </button>
      </div>
    </form>
  );
}

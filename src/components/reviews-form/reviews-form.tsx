import React, {useState} from 'react';
import {MAX_RATING} from '@/constants';

export default function ReviewsForm(): JSX.Element {
  const [formData, setFormData] = useState({
    review: '',
    rating: ''
  });

  const handleFormChange = (evt:
    React.ChangeEvent<HTMLInputElement> |
    React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;

    setFormData({...formData, [name]: value});
  };

  const getRatingList = () => {
    const ratingList = [];

    for (let i = MAX_RATING; i > 0; i--) {
      const ratingItem = (
        <React.Fragment key={i}>
          <input
            className="form__rating-input visually-hidden"
            id={`${i}-stars`}
            name="rating"
            value={i}
            type="radio"
            onChange={handleFormChange}
          />
          <label
            className="reviews__rating-label form__rating-label"
            htmlFor={`${i}-stars`}
            title="perfect"
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </React.Fragment>
      );

      ratingList.push(ratingItem);
    }

    return ratingList;
  };

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
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>
    </form>
  );
}

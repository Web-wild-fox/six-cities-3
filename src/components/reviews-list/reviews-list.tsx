import {memo} from 'react';
import {Comment} from '@/types/offers';
import ReviewItem from '@/components/review-item/review-item';

interface ReviewsListProps {
  comments?: Comment[];
}

export default function ReviewsList({comments}: ReviewsListProps): JSX.Element {
  const MemoReviewItem = memo(ReviewItem);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;&nbsp;
        <span className="reviews__amount">
          {comments?.length}
        </span>
      </h2>

      <ul className="reviews__list">
        {
          comments?.map((comment) => (
            <MemoReviewItem
              key={comment.id}
              date={comment.date}
              userName={comment.user.name}
              avatarUrl={comment.user.avatarUrl}
              isPro={comment.user.isPro}
              comment={comment.comment}
              rating={comment.rating}
            />
          ))
        }
      </ul>
    </>
  );
}

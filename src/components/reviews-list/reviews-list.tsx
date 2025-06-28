import {memo} from 'react';
import {MAX_COMMENTS} from '@/constants';
import {useAppSelector} from '@/hooks';
import {getComments} from '@/store/comments/comments.selectors';
import ReviewItem from '@/components/review-item/review-item';

export default function ReviewsList(): JSX.Element {
  const MemoReviewItem = memo(ReviewItem);

  const comments = useAppSelector(getComments);

  const sortedComments = [...comments].sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  const viewedComments = sortedComments.slice(0, MAX_COMMENTS);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;&nbsp;
        <span className="reviews__amount">
          {sortedComments.length}
        </span>
      </h2>

      <ul className="reviews__list">
        {
          viewedComments.map((comment) => (
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

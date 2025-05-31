import { useState } from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Review {
  id: string;
  rating: number;
  comment: string;
  userName: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
  initialReviews?: Review[];
}

export default function ProductReviews({ productId, initialReviews = [] }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRatingClick = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      ...newReview,
      userName: 'زائر',
      date: new Date().toLocaleDateString('ar-EG'),
    };

    setReviews(prev => [review, ...prev]);
    setNewReview({ rating: 0, comment: '' });
  };

  const renderStars = (rating: number, interactive = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`text-${star <= (interactive ? hoveredRating || newReview.rating : rating) ? 'yellow' : 'gray'}-400`}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
            onClick={() => interactive && handleRatingClick(star)}
            disabled={!interactive}
          >
            <Star className="w-5 h-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">تقييمات المنتج</h3>

      {/* Add Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
        <h4 className="font-medium">أضف تقييمك</h4>
        <div className="flex items-center gap-2">
          {renderStars(newReview.rating, true)}
          <span className="text-sm text-gray-500">
            {newReview.rating > 0 ? `${newReview.rating} من 5` : 'اختر تقييمك'}
          </span>
        </div>
        <Textarea
          placeholder="اكتب تعليقك هنا..."
          value={newReview.comment}
          onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
          className="min-h-[100px]"
        />
        <Button
          onClick={handleSubmitReview}
          disabled={newReview.rating === 0 || !newReview.comment.trim()}
        >
          إرسال التقييم
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">لا توجد تقييمات بعد. كن أول من يقيم هذا المنتج!</p>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <span className="font-medium">{review.userName}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                {renderStars(review.rating)}
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 
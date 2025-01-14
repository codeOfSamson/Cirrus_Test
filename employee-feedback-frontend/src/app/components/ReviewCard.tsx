import React from 'react';
import AwesomeStarsRating from 'react-awesome-stars-rating';

type ReviewCardProps = {
  reviewerName: string;
  revieweeName: string;
  status: 'PENDING' | 'COMPLETED';
  rating: number;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void; // New prop
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  revieweeName,
  status,
  rating,
  onEdit,
  onDelete,
  onClick
}) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
    onClick={onClick}
    >
      <div className="mb-2">
        <p className="font-semibold text-gray-800">Reviewer: {reviewerName}</p>
        <p className="text-gray-600 text-sm">Reviewee: {revieweeName}</p>
        <p className="text-gray-600 text-sm">
          Status:{' '}
          <span
            className={`font-semibold ${
              status === 'PENDING' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {status}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-between">
        <AwesomeStarsRating
          value={rating}
          size={15}
          isEdit={false}
          className="flex items-center space-x-1 text-yellow-400"
        />
        <div className="space-x-4">
          <button
            onClick={onEdit}
            className="text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;

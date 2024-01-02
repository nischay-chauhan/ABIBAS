import { useState } from 'react';
import PropTypes from 'prop-types';

const ShoeCard = ({ shoe }) => {
  const { id, name, price, image, description, rating } = shoe;
  const maxLength = 150;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  const handleReadMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div key={id} className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-700 mt-2">&#8377;{price}</p>
        <p className="text-gray-600 mt-2">
          {showFullDescription ? description : truncatedDescription}
        </p>
        {description.length > maxLength && (
          <button
            onClick={handleReadMore}
            className="text-blue-500 hover:underline mt-2"
          >
            {showFullDescription ? 'Read Less' : 'Read More'}
          </button>
        )}
        <div className="flex items-center mt-2">
          <p className="text-gray-700">Rating: {rating.rate}</p>
          <span className="ml-2 text-gray-500">({rating.count} reviews)</span>
        </div>
      </div>
    </div>
  );
};

ShoeCard.propTypes = {
  shoe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShoeCard;

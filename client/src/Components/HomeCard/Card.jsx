import  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { auth, database } from '../../FireBaseConfig';
import toast, { Toaster } from 'react-hot-toast';
import { ref, get, set } from 'firebase/database';

const ShoeCard = ({ shoe }) => {
  const { id, name, price, image, description, rating } = shoe;
  const maxLength = 150;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const [user, setUser] = useState(null);

  const truncatedDescription =
    description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;

  const handleReadMore = () => {
    setShowFullDescription(!showFullDescription);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleAddToCart = () => {
    if (user) {
      const userId = user.uid;
      const userCartRef = ref(database, `users/${userId}/cart`);

      get(userCartRef).then((snapshot) => {
        const cart = snapshot.val();
        const updatedCart = cart || {};
        const existingItem = updatedCart[id];

        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          updatedCart[id] = {
            ...shoe,
            quantity: 1,
          };
        }

        set(userCartRef, updatedCart)
          .then(() => {
            console.log('Item added to cart:', updatedCart);
            toast.success('Item added to cart successfully!');
          })
          .catch((error) => {
            console.error('Error adding item to cart:', error);
            toast.error('Error adding item to cart');
          });
      });
    } else {
      toast.error('Please login to add items to cart');
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-md mx-auto overflow-hidden bg-white rounded-md shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <div key={id} className="p-4">
          <h2 className="text-xl text-black font-semibold">{name}</h2>
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
        {user ? (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700"
          >
            Add to Cart
          </button>
        ) : (
          <Link to="/login">
            <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
              Add to Cart
            </button>
          </Link>
        )}
      </div>
    </>
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

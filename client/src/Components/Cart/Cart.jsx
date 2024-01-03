import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { database } from '../../FireBaseConfig';
import { ref, get } from 'firebase/database';
import { auth } from "../../FireBaseConfig";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    if (auth.currentUser) {
      localStorage.setItem('userId', auth.currentUser.uid);
    }

    const userCartRef = ref(database, `users/${userId}/cart`);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 10000); // Set a timeout of 10 seconds

    get(userCartRef)
      .then((snapshot) => {
        clearTimeout(timeoutId); // Clear the timeout when data is successfully fetched
        setLoading(false);

        const cartData = snapshot.val();

        if (cartData) {
          const items = Object.values(cartData);
          setCartItems(items);

          const total = items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0);

          setTotalPrice(total);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId); // Clear the timeout in case of an error
        setLoading(false);
        console.error('Error fetching cart data:', error);
      });
  }, [userId]);

  const handleCheckout = () => {
    toast.success('Checkout complete!');
    // Add logic for handling the checkout process
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cartItems && cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b border-gray-300 py-2">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-700">
                      &#8377;{item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <p className="text-lg font-semibold">Total: &#8377;{totalPrice}</p>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <p>Your cart is empty or check your internet connection.</p>
          )}
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Cart;

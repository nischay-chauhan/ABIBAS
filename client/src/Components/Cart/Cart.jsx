import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';


const Cart = ({ cartItems }) => {
  const [totalPrice, setTotalPrice] = useState(
    cartItems ? cartItems.reduce((total, item) => total + item.price, 0) : 0
  );

  const handleCheckout = () => {
    toast.success('Checkout complete!');

  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Shopping Cart</h1>
      {cartItems && cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center border-b border-gray-300 py-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-700">&#8377;{item.price}</p>
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
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ),
};

export default Cart;

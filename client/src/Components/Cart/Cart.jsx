import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { database } from '../../FireBaseConfig';
import { ref, get,  remove } from 'firebase/database';
import { auth } from '../../FireBaseConfig';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      const newUserId = user ? user.uid : '';
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    });

    const userCartRef = ref(database, `users/${userId}/cart`);

    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 10000); // Set a timeout of 10 seconds
    get(userCartRef)
      .then((snapshot) => {
        clearTimeout(timeoutId); // Clear the timeout in case of success
        setLoading(false);

        const cartData = snapshot.val();

        if (cartData) {
          const items = Object.values(cartData);
          setCartItems(items);

          const total = items.reduce((acc, item) => {
            return acc + item.price * item.quantity;
          }, 0);

          setTotalPrice(total);
        } else {
          // If there is no cart data, set cartItems and total price to empty
          setCartItems([]);
          setTotalPrice(0);
        }
      })
      .catch((error) => {
        clearTimeout(timeoutId); // Clear the timeout in case of an error
        setLoading(false);
        console.error('Error fetching cart data:', error);
        toast.error('Error fetching cart data. Please try again.');
      });

    return () => unsubscribe();
  }, [userId]);


  useEffect(() => {
    updateTotalPrice();
  }, [cartItems]);
  

  const handleCheckout = () => {
    toast.success('Checkout complete!');
  };



  const updateTotalPrice = () => {
    const total = cartItems.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  
    setTotalPrice(total);
  };
  
  const handleIncrement = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
  
    setCartItems(updatedCart);
    updateTotalPrice(); 
  };
  
  const handleDecrement = (itemId) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
  
    setCartItems(updatedCart);
    updateTotalPrice(); 
  };
  

  const handleRemove = (itemId) => {
    const cartRef = ref(database, `users/${userId}/cart/${itemId}`);
    remove(cartRef)
      .then(() => {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== itemId)
        );
        updateTotalPrice(cartItems.filter((item) => item.id !== itemId));
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
        toast.error('Error removing item from cart. Please try again.');
      });
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
                    <div className="flex mt-2">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      >
                        -1
                      </button>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
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

export default Cart;

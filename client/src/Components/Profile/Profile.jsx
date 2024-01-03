import  { useEffect, useState } from 'react';
import { auth } from '../../FireBaseConfig';
import { signOut } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('User signed out successfully');
      setTimeout(() => {
        Navigate('/login');
      }, 800);

      console.log('User signed out successfully');
    } catch (error) {
      toast.error(error.message);
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg">
        <Toaster />
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        {user && (
          <div className="mb-4">
            <p className="text-gray-600">Welcome, {user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;

import { Link } from "react-router-dom";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../FireBaseConfig";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("User signed up:", user);
      toast.success("User signed up successfully");
      setTimeout(() => {
        Navigate("/login");
      }, 1200)

      setEmail("");
      setPassword("");
      setConfirmPassword("");


    } catch (error) {

      console.error("Error signing up:", error.message);
      toast.error("Error signing up. Please try again.");
    }
  };

  const handleGoogleSignIn = async() => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth , provider);
      const user = result.user;
      console.log("USer Signed in with Google" , user);
      toast.success("Logged in Successfully");
      setTimeout(() => {
        Navigate('/')
      },700)
    }catch(error){
      console.log("Error signing in with Google : " , error.message);
      toast.error("Error signing in with Google , Please try again Later")
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <Toaster position="top-center" reverseOrder={false} />

        <h1 className="text-4xl font-semibold text-center text-purple-700 underline">
          Sign Up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button
              type="button"
              onClick={handleSignup}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <h1 className="mt-6 text-2xl font-semibold text-center text-gray-700">OR</h1>

        <p className="mt-4 text-center text-gray-700">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-2 mt-4 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:bg-red-500"
          >
            <FaGoogle className="mr-2" /> Sign In with Google
          </button>
        </p>
        

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-purple-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;


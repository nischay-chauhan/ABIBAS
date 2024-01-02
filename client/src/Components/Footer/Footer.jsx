import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-500 to-gray-700 w-screen shadow dark:bg-black">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <h1 className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ABIBAS</h1>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-white">
            <li>
              <Link to="/about" className="p-4 text-md hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">About</Link>
            </li>
            <li>
              <Link to="/privacy-policy" target='_blank' className="p-4 text-md hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/licensing" target='_blank' className="p-4 text-md hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">Licensing</Link>
            </li>
            <li>
              <Link to="/contact" className="p-4 text-md hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black">Contact</Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link href="https://flowbite.com/" className="hover:underline">ABIBAS</Link>. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;

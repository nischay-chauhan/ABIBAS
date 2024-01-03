import { createBrowserRouter , RouterProvider } from "react-router-dom"
import Layout from "./Components/Layout/Layout"
import Home from "./Pages/Home/Home"
import SignUp from "./Components/SignUp/SignUp"
import Login from "./Components/Login/Login"
import About from "./Components/About/About"
import Contact from "./Components/Contact/Contact"
import Cart from "./Components/Cart/Cart";
import Policy from "./Pages/Policy/Policy"
import License from "./Pages/License/License"

import Profile from "./Components/Profile/Profile"

function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Layout><Home /></Layout>
    },
    {
      path : "/signup",
      element : <Layout><SignUp /></Layout>
    },
    {
      path: '/login',
      element: <Layout><Login /></Layout>,
    },
    {
      path: '/about',
      element: <Layout><About /></Layout>,
    },
    {
      path: '/contact',
      element: <Layout><Contact /></Layout>,
    },
    {
      path : "/cart",
      element : <Layout><Cart /></Layout>
    },
    {
      path : "privacy-policy",
      element : <Policy />
    },
    {path : "/licensing",
    element : <License />
  },
    {
      path : "/profile",
      element : <Layout><Profile /></Layout>

    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

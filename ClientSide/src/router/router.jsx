
import { createBrowserRouter } from 'react-router-dom'
import SignUp from '../components/SignUp/SignUp'
import Packages from '../components/packeges/packageList'
import LogIn from '../components/log-in/Log-in'
import PurchaseForm from '../components/PurchaseForm/PurchaseForm'
import Home from '../components/home/Home'
import Navbar from '../components/home/Navbar'
import History from '../components/Rental/rental-dashboard/History'
import SignOut from '../components/signOut/SignOut'
import Brunches from '../components/Brunches/Brunches'
import Using from '../components/using/Using'

export const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp />
  },

  {
    path: "/",
    element: <LogIn />
  },

  {
    path: "/signin",
    element: <LogIn />
  },
,
  {
    path: "/navbar",
    element: <Navbar />,
    children: [
      { path: "/navbar", element: <Home /> },
      { path: "/navbar/signout", element: <SignOut /> },
      { path: "/navbar/historyPurchases", element: <History /> },
      { path: "/navbar/purchase", element: <PurchaseForm /> },
      { path: "/navbar/brunches", element: <Brunches /> },
      { path: "/navbar/packageList", element: <Packages /> },
      { path: "/navbar/using", element: <Using/> },
    ]
  }
])

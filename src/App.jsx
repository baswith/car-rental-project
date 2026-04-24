import React, { useContext } from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Landing from './Pages/Landing'
import Home from './Pages/Home'
import Auth from './Pages/Auth'
import Admin from './Pages/Admin'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Category from './Pages/Category'
import AllCars from './Pages/AllCars'
import Car from './Pages/Car'
import Checkout from './Pages/Checkout'
import BookingHistory from './Pages/BookingHistory'
import { ToastContainer, toast } from 'react-toastify';
import CategoryMain from './Pages/CategoryMain'
import Pnf from './Pages/Pnf'
import { authorizationContext } from '../ContextAPI/ContextAPI'
import AdminBookingHistory from './Pages/AdminBookingHistory'






function App() {

  const { isAuthorized } = useContext(authorizationContext)
  const location = useLocation();
  const shouldHideHeader = location.pathname === '/admin' || location.pathname === '/view-all-booking';
  





  return (

    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />




      {!shouldHideHeader && <Header />}



      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/admin' element={isAuthorized ? <Admin /> : <Navigate to={'/login'} />}></Route>
        <Route path='/home' element={isAuthorized ? <Home /> : <Navigate to={'/login'} />}></Route>
        <Route path='/login' element={<Auth />}></Route>
        <Route path='/register' element={<Auth insideRegister={true} />}></Route>
        <Route path='/category' element={isAuthorized ? <Category /> : <Navigate to={'/login'} />}></Route>
        <Route path='/all-cars' element={isAuthorized ? <AllCars /> : <Navigate to={'/login'} />}></Route>
        <Route path='/car' element={isAuthorized ? <Car /> : <Navigate to={'/login'} />}></Route>
        <Route path='/checkout' element={isAuthorized ? <Checkout /> : <Navigate to={'/login'} />}></Route>
        <Route path='/booking-history' element={isAuthorized ? <BookingHistory /> : <Navigate to={'/login'} />}></Route>
        <Route path='/category-cars/:BodyType' element={isAuthorized ? <CategoryMain /> : <Navigate to={'/login'} />}></Route>
        <Route path='/view-all-booking' element={isAuthorized ? <AdminBookingHistory /> : <Navigate to={'/login'} />}></Route>
        <Route path='/*' element={<Pnf />}></Route>

      </Routes>
      <Footer />





    </>
  )
}

export default App
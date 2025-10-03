import { useState } from 'react'
import './App.css'
import ProductPage from './Components/ProductPage'
import Navbar from './Components/Navbar'
import Footer from './Components/Fotter'
import CartPage from './Cart/CartPage'
import ContactPage from './Pages/contact/ContactPage'
import AboutPage from './Pages/about/AboutPage'
import { BrowserRouter, Routes,Route } from 'react-router'
import Home from './Pages/home/Home'
import { ToastContainer, toast } from 'react-toastify';
import LoginPage from './Components/LoginPage'
import CheckoutPage from './Cart/CheckoutPage'
import OrderSuccessPage from './Cart/OrderSuccessPage'
import MyOrdersPage from './Cart/MyOrdersPage'
import ProductDetails from './Components/ProductDetailsPage'
import ProtectedRoute from './ProtectedRoute'
import ProfilePage from './Components/ProfilePage'
import RegisterPage from './Components/RegisterPage'

function App() { 

  return (
    <>
    <BrowserRouter>
        <Navbar />
         <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        <Routes>
            <Route path='/' element={<Home />} />
<Route path='/about' element={<AboutPage />} />
<Route path='/contact' element={<ContactPage />} />
<Route path='/products' element={<ProductPage />} />
<Route path='/cart' element={<CartPage />} />
<Route path='/login' element={<LoginPage />} />
<Route path='/register' element={<RegisterPage/>} />

{/* Protected Routes */}
<Route 
  path='/checkoutpage' 
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  } 
/>
<Route 
  path='/profile' 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
<Route 
  path='/orders' 
  element={
    <ProtectedRoute>
      <MyOrdersPage />
    </ProtectedRoute>
  } 
/>
<Route 
  path='/success' 
  element={
    <ProtectedRoute>
      <OrderSuccessPage />
    </ProtectedRoute>
  } 
/>

<Route path="/product/:id" element={<ProductDetails />} />

        </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/layout'
import Home from './pages/home'
import Shop from './pages/shop'
import Detail from './pages/detail'
import About from './pages/about'
import Login from './pages/login'
import Contact from './pages/contact'
import Cart from './pages/cart'
import Payment from './pages/payment'
import Admin from './pages/admin'
import DetailUpdate from './pages/detailUpdate'
import ProdWitchSearch from './pages/prodWithSearch'
import InfoUser from './pages/infoUser'
import Blogs from './pages/blogs'
import FinalCheckout from './pages/finalCheckout'
import Compare from './pages/compare'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ScrollToTop from './components/scrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path='shop' element={<Shop />}/>
            <Route path='prodWithSearch' element={<ProdWitchSearch />}/>
            <Route path='detail' element={<Detail/>}/>
            <Route path='detailUpdate' element={<DetailUpdate/>}/>
            <Route path='about' element={<About />}/>
            <Route path='contact' element={<Contact />}/>
            <Route path='login' element={<Login />}/>
            <Route path='cart' element={<Cart />}/>
            <Route path='payment' element={<Payment/>} />
            <Route path='admin' element={<Admin/>}/>
            <Route path='infoUser' element={<InfoUser/>}/>
            <Route path='blogs' element={<Blogs/>}/>
            <Route path='finalcheckout' element={<FinalCheckout/>}/>
            <Route path='compare' element={<Compare/>}/>
          </Route>
        </Routes>
        <ToastContainer />
        <ScrollToTopButton/>
      </BrowserRouter>
    </>
  )
}

export default App

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

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// deploy
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ScrollToTop from './components/scrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkzYuzhhdLk7cVBS4sx0P0CCw25R00YWk",
  authDomain: "techshop-an.firebaseapp.com",
  projectId: "techshop-an",
  storageBucket: "techshop-an.appspot.com",
  messagingSenderId: "713719451928",
  appId: "1:713719451928:web:d17cb0d3d408ae18434e6d",
  measurementId: "G-807MVBPG3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
// 

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
          </Route>
        </Routes>
        <ToastContainer />
        <ScrollToTopButton/>
      </BrowserRouter>
    </>
  )
}

export default App

/* eslint-disable react-hooks/rules-of-hooks */
import { HiOutlineMail } from 'react-icons/hi'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsBag } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaPhoneAlt } from 'react-icons/fa'
// import { VscAccount } from 'react-icons/vsc'
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProd } from '../redux/searchSlice';
import { IoSearch } from "react-icons/io5";

function header() {
    const location = useLocation()

    const [logo, setLogo] = useState()
    const [phone, setPhone] = useState()

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get('InfoShop/GetInfoShop');
                setLogo(res.infoShop[0].logo) 
                setPhone(res.infoShop[0].sdt) // Log the response data, assuming the relevant data is in the "data" property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //total items
    const ids = useSelector(state => state.prod.ids) //Obj
    const totalItems = Object.keys(ids).reduce((accumulator, productType) => {
        const productCounts = Object.values(ids[productType]);
        return accumulator + productCounts.reduce((sum, count) => sum + count, 0);
      }, 0);
    // const values = Object.values(ids); //Lay tat gia tri tu obj ids value[]
    // const totalItems = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    //check auth
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    //Search
    const navigate = useNavigate()
    const [search, setSearch] = useState()

    const listenSearch = (e) => {
        if (e.keyCode === 13) {
            dispatch(searchProd(e.target.value))
            navigate('prodWithSearch')
        }
    }

    const handleSearch = () => {
        dispatch(searchProd(search))
        navigate('prodWithSearch')
    }

    return (
        <>
        <header className="header-top-strip p-2 shadow-sm">
            <div className="container-xxl">
                <div className="p-md-1 d-flex header-group-icons align-items-center">
                    <span className='icons-banner text-white'><Link><HiOutlineMail className='fs-4 text-white mx-1'/></Link><span>CONTACT</span></span>
                    <span className='icons-banner text-white mx-1'><Link><AiOutlineClockCircle className ='fs-5 text-white mx-1'/></Link><span>08:00 - 17:00</span></span>
                    <span className='d-flex align-items-center text-white mx-1'><Link><FaPhoneAlt className ='fs-6 text-white mx-1'/></Link><span>{phone}</span></span>
                </div>
            </div>
        </header>
        <nav className="header-upper navbar navbar-expand-lg bg-body-tertiary sticky-top py-2">
            <div className="container-fluid container-xxl">
                <Link className="navbar-brand mx-auto" to={'/'}><img src={logo} alt=""  className='img-fluid logo ms-md-5'/></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="d-md-flex justify-content-evenly collapse navbar-collapse" id="navbarSupportedContent">
                    <nav className='nav-links'>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item ms-3 mx-md-3">
                                <Link to={'/'} className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Trang chủ</Link>
                            </li>
                            <li className="nav-item ms-3 mx-md-3">
                                <Link to={'shop'} className={location.pathname === '/shop' ? 'nav-link active' : 'nav-link'}>Sản phẩm</Link>
                            </li>
                            <li className="nav-item ms-3 mx-md-3">
                                <Link to={'about'} className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>Giới thiệu</Link>
                            </li>
                            <li className="nav-item ms-3 mx-md-3">
                                <Link to={'contact'} className={location.pathname === '/contact' ? 'nav-link active' : 'nav-link'}>Liên hệ</Link>
                            </li>
                            {(isAuth || isLoggedIn) && 
                            <li className="nav-item ms-3 mx-md-3">
                                <Link to={'admin'} className={location.pathname === '/admin' ? 'nav-link active' : 'nav-link'}>Admin</Link>
                            </li>}
                        </ul>
                    </nav>
                    <div className="d-flex" >
                        <input value={search} onKeyDown={(e) => listenSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control my-auto me-2" placeholder="Tìm kiếm"/>
                        <button onClick={() => handleSearch()} className="btn my-auto btn-outline-success" type=""><IoSearch /></button>
                    </div>
                </div>
                <div className="nav-links-nav col-md-3 d-md-flex align-items-center justify-content-end">
                        {/* <Link to={'login'} className='mx-md-2 d-flex'>  <VscAccount className='fs-md-3 fs-2 mx-2 mx-md-2'/>
                            <p>Account</p>
                        </Link> */}
                        <Link to={'cart'} className='sec-cart position-relative ms-3 ms-md-0 mx-md-2 d-flex'>
                            <BsBag className='fs-3 mx-2 mx-md-2 mb-md-2'/>
                            {totalItems > 0 && <p className='text-center totalItems'>{totalItems}</p>}
                        </Link>
                </div>
            </div>
            </nav>
        </>
    );
}

export default header;
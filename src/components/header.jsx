/* eslint-disable react-hooks/rules-of-hooks */
import { HiOutlineMail } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
import { BsBag } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { FaPhoneAlt } from 'react-icons/fa'
// import { VscAccount } from 'react-icons/vsc'
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';

function header() {
    const location = useLocation()

    const [logo, setLogo] = useState()
    const [phone, setPhone] = useState()

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

    return (
        <>
        <header className="header-top-strip p-2 shadow-sm">
            <div className="container-xxl">
                <div className="p-md-1 d-md-flex align-items-center">
                    <span className='icons-banner text-white'><Link><HiOutlineMail className='fs-4 text-white mx-1'/></Link><span>CONTACT</span></span>
                    <span className='icons-banner text-white mx-1'><Link><AiOutlineClockCircle className ='fs-5 text-white mx-1'/></Link><span>08:00 - 17:00</span></span>
                    <span className='icons-banner text-white mx-1'><Link><FaPhoneAlt className ='fs-6 text-white mx-1'/></Link><span>{phone}</span></span>
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
                            <li className="nav-item ms-3 mx-md-3">
                                <Link to={'admin'} className={location.pathname === '/admin' ? 'nav-link active' : 'nav-link'}>Admin</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="nav-links-nav col-md-3 d-md-flex align-items-center justify-content-end">
                        {/* <Link to={'login'} className='mx-md-2 d-flex'>  <VscAccount className='fs-md-3 fs-2 mx-2 mx-md-2'/>
                            <p>Account</p>
                        </Link> */}
                        <Link to={'cart'} className='sec-cart position-relative ms-3 ms-md-0 mx-md-2 d-flex'>
                            <p className='price'>0đ</p>
                            <BsBag className='fs-3 mx-2 mx-md-2 mb-md-2'/>
                            {<p className='text-center totalItems'>{0}</p>}
                        </Link>
                </div>
            </div>
            </nav>
        </>
    );
}

export default header;
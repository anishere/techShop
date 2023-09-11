/* eslint-disable react-hooks/rules-of-hooks */
import { BsDiscord, BsFacebook, BsGithub, BsSlack } from "react-icons/bs";
import { Link } from "react-router-dom";
import chplay from '../assets/imgs/chplay.jpg'
import appstore from '../assets/imgs/appstore.jpg'
import paybank from '../assets/imgs/pay.png'
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";

function footer() {
    const [phone, setPhone] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get('InfoShop/GetInfoShop');
                setPhone(res.infoShop[0].sdt) // Log the response data, assuming the relevant data is in the "data" property
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (<>
        <footer className="footer p-4">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-md-4 d-flex flex-column">
                        <h3 className="mb-4 footer-title">Liên hệ</h3>
                        <div className="footer-detail mb-3">
                            <p className="mb-3"><b>Địa chỉ: </b>Can Tho, Viet Nam</p>
                            <p className="mb-3"><b>Phone: </b><a href={`tel:+84${phone}`}>Call us at +84 {phone}</a></p>
                            <p className="mb-4"><b>Hours: </b>08:00 - 17:00</p>
                            <p className="mb-3"><b>Follow Us</b></p>
                            <div className="col-5 social-icons d-flex justify-content-around">
                                <Link to={'https://discord.com/'}><BsDiscord/></Link>
                                <Link to={'https://www.facebook.com/profile.php?id=100035519748585'}><BsFacebook/></Link>
                                <Link to={'https://github.com/anishere/ecommerceShop'}><BsGithub/></Link>
                                <Link to={'https://slack.com/'}><BsSlack/></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <h3 className='mb-4 footer-title'>Giới thiệu</h3>
                        <div className="footer-detail d-flex flex-column">
                            <Link to={'about'} className='mb-3'>Giới thiệu về chúng tôi</Link>
                            <Link to={'payment'} className='mb-3'>Vận chuyển</Link>
                            <Link className='mb-3'>Chính sách bảo mật</Link>
                            <Link className='mb-3'>Điều khoản và điều kiện</Link>
                            <Link className='mb-3'>Chính sách ưu đãi</Link>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <h3 className='mb-4 footer-title'>Account</h3>
                        <div className="footer-detail d-flex flex-column">
                            <Link to={'contact'} className='mb-3'>Trợ giúp</Link>
                            <Link to={'payment'} className='mb-3'>Thanh toán</Link>
                            <Link className='mb-3'>Giỏ hàng</Link>
                            <Link className='mb-3'>Mã giảm giá</Link>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3 className='mb-4 footer-title'>Install App</h3>
                        <div className="footer-detail">
                            <span className='mb-3'>Có sẵn trên Google Play Services & App Store</span>
                            <div>
                                <Link to={'https://play.google.com/store/games?hl=vi&gl=US'}>
                                    <img src={chplay} alt="link-chplay" className='img-fluid my-3'/>
                                </Link>
                                <Link to={'https://www.apple.com/vn/app-store'}>
                                    <img src={appstore} alt="link-chplay" className='img-fluid my-3'/>
                                </Link>  
                            </div>
                            <p>Phương thức thanh toán</p>
                            <Link to={'https://www.paypal.com/signin'}>
                                    <img src={paybank} alt="link-chplay" className='img-fluid p-2 my-3'/>
                            </Link>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-9">
                        <p className='text-success'>&copy;2023 Developed by An Developers</p>
                    </div>
                    <div className="col-md-3 d-md-flex justify-content-end">
                        <Link className='text-white fw-medium'>Privacy Policy</Link>
                        <Link className='mx-2 text-white fw-medium'>Terms of Use</Link>
                        <Link to={'contact'} className='text-white fw-medium'>Contact Us</Link>
                    </div>
                </div>
            </div>
        </footer>
    </>);
}

export default footer;
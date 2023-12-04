/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import imgAbout from '../assets/imgs/about.jpg'
import { URLgetAbout } from '../URL/url';
import { axiosCus } from '../axios/axios';
import iconHero1 from '../assets/imgs/he-1.png'
import iconHero2 from '../assets/imgs/he-2.png'
import iconHero3 from '../assets/imgs/he-3.png'
import iconHero4 from '../assets/imgs/he-4.png'
import iconHero5 from '../assets/imgs/he-5.png'
import Marquee from "react-fast-marquee";

function about() {
    const [about1, setAbout1] = useState()
    const [about2, setAbout2] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(`${URLgetAbout}`);
                setAbout1(res.about[0].about1)
                setAbout2(res.about[0].about2)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [about1, about2]);

    return (<>
        <section className="banner-shop banner-about">
            <div className="container-xxl">
                <div className="row">
                    <div className="bannerShop-detail text-center">
                        <h2 className="text-white fs-1">#Know Us</h2>
                        <span className="text-white fs-5">Get to know us more</span>
                    </div>
                </div>
            </div>
        </section>

        <section className='about-whoAreWe'>
            <div className="container-xxl">
                <div className="row">
                    <div className="col-md-6 text-center">
                        <img src={imgAbout} alt="" className='col-11 img-fluid'/>
                    </div>
                    <div className="col-md-6 p-md-5">
                        <h1 className='fs-2 mt-md-5 text-center text-info'>Who are we?</h1>
                        <p>{about1}</p>
                        <p className='mt-3'>{about2}</p>
                    </div>
                </div>
            </div>
        </section>

        <section className='about-marquee mb-5'>
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <Marquee>
                            <div className="px-4 text-center text-center">
                                <img src={iconHero1} alt="icon" className='img-fluid mx-auto'/>
                                <p className=''>Đặt hàng nhanh chống</p>
                            </div>
                            <div className="px-4 text-center">
                                <img src={iconHero2} alt="icon" className='img-fluid mx-auto'/>
                                <p className=''>Giao hàng nhanh chống</p>
                            </div>
                            <div className="px-4 text-center">
                                <img src={iconHero3} alt="icon" className='img-fluid mx-auto'/>
                                <p className=''>Siêu tiết kiệm</p>
                            </div>
                            <div className="px-4 text-center">
                                <img src={iconHero4} alt="icon" className='img-fluid mx-auto'/>
                                <p className=''>Hỗ trợ 24/7</p>
                            </div>
                            <div className="px-4 text-center">
                                <img src={iconHero5} alt="icon" className='img-fluid mx-auto'/>
                                <p className=''>Đặt hàng online</p>
                            </div>
                        </Marquee>
                    </div>
                </div>
            </div>
        </section>
    </>);
}

export default about;
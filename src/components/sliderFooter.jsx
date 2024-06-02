/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import './sliderFooter.css';
import image1 from '../assets/imgs/bannerfooter/footer1.jpg';
import image2 from '../assets/imgs/bannerfooter/footer2.jpg';
import image3 from '../assets/imgs/bannerfooter/footer3.jpg';
import image4 from '../assets/imgs/bannerfooter/footer4.jpg';
import image5 from '../assets/imgs/bannerfooter/bags.jpeg';
import { Link } from 'react-router-dom';

const Sliders = () => {
//   if (!Array.isArray(sliderData) || sliderData.length <= 0) {
//     return null;{ sliderData }
//   }

  const GalleryPrevArrow = ({ currentSlide, slideCount, ...props }) => {
    const { className, onClick } = props;

    return (
      <div {...props} className="custom-prevArrow" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        </svg>
      </div>
    );
  };

  const GalleryNextArrow = ({ currentSlide, slideCount, ...props }) => {
    const { className, onClick } = props;

    return (
      <div {...props} className="custom-nextArrow" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </div>
    );
  };

  const settings = {
    className: "center",
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    speed: 500,
    nextArrow: <GalleryNextArrow />,
    prevArrow: <GalleryPrevArrow />
  };

  const sliderData = [
    {
        "image": image1
    },
    {
        "image": image2
    },
    {
        "image": image3
    },
    {
      "image": image4
    },
    {
      "image": image5
    }
  ]

  console.log(sliderData)
  return (
    <Slider {...settings}>
      {sliderData.map((slide, index) => (
        <div className='slideItem' key={index}>
          <img src={slide.image} alt="slider" key={index} className="image" />
            <div className='slideItems-detail'>
                <h6>Vô vàng quà tặng</h6>
                <Link to={'shop'} >Mua ngay</Link>
            </div>
        </div>
      ))}
    </Slider>
  );
};

export default Sliders;

/* eslint-disable react-hooks/rules-of-hooks */
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import slider1 from '../assets/imgs/slider1.jpg'
import slider2 from '../assets/imgs/slider2.jpg'
import slider3 from '../assets/imgs/slider3.jpg'
import { Link } from "react-router-dom";
import Slider from "react-slick";

function sliderHome() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 5000,
        cssEase: "linear",
        pauseOnHover: true,
        appendDots: dots => (
            <div
              style={{
                borderRadius: "10px",
                bottom: "18px",
              }}
            >
              <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),
        customPaging: () => (
            <div 
                style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    cursor: "pointer",
                    border: "1px solid black",
                }}
            ></div>
        ),
    };

    return (
        <div className="sliderHome py-4">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-12">
                        <Slider {...settings}>
                        <div className="sliderHome-content">
                            <div id="back1" className="background" style={{ backgroundImage: `url(${slider1})` }}></div>
                            <div className="sliderHome-content-detail">
                                <h4>Thêm năng lượng cho công việc</h4>
                                <p className="my-3">Tăng cường hiệu suất để có năng suất tuyệt vời hơn</p>
                                <Link>Mua ngay</Link>
                            </div>
                        </div>
                        <div className="sliderHome-content">
                            <div id="back2" className="background" style={{ backgroundImage: `url(${slider2})` }}></div>
                            <div className="sliderHome-content-detail">
                                <h4>Hỗ trợ nâng cấp</h4>
                                <p className="my-3">Nâng cấp siêu ưu đãi khi sản phẩm còn bảo hành</p>
                                <Link>Mua ngay</Link>
                            </div>
                        </div>
                        <div className="sliderHome-content">
                            <div id="back3" className="background" style={{ backgroundImage: `url(${slider3})` }}></div>
                            <div className="sliderHome-content-detail">
                                <h4>Hỗ trợ phụ kiện</h4>
                                <p className="my-3">Phụ kiện giảm sâu khi mua cùng sản phẩm chính</p>
                                <Link>Mua ngay</Link>
                            </div>
                        </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default sliderHome;
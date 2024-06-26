/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from 'react-redux'
import { URLIDLapPC, URLhotProds, URLIDCPU, URLIDKeyBoard, URLIDMouse, URLIDRAM, URLIDTaiNghe } from '../URL/url';
import { axiosCus } from '../axios/axios';
import { useEffect, useState, useRef } from 'react';
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineFileProtect } from "react-icons/ai";
import { addItem, editQuantity, reduceItem } from '../redux/detailSlice';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function detail() {
    const ids = useSelector(state => state.prod.ids)
    const [hotProds, setHotProds] = useState()
    const [prod, setProd] = useState()
    const detail = useSelector((state) => state.prod)  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(URLhotProds);
                setHotProds(res.listproducts)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
            const fetchData = async () => {           
                try {
                    if(detail.type === 'lap' || detail.type === 'pc') {
                        const res = await axiosCus.get(`${URLIDLapPC}${detail.id}`);
                        setProd(res.listproducts[0])
                    } else if (detail.type === 'cpu') {
                        const res = await axiosCus.get(`${URLIDCPU}${detail.id}`);
                        setProd(res.listcpu[0])
                    } else if (detail.type === 'keyboard') {
                        const res = await axiosCus.get(`${URLIDKeyBoard}${detail.id}`);
                        setProd(res.listKeyBoard[0])
                    } else if (detail.type === 'mouse') {
                        const res = await axiosCus.get(`${URLIDMouse}${detail.id}`);
                        setProd(res.listMouse[0])
                    } else if (detail.type === 'ram') {
                        const res = await axiosCus.get(`${URLIDRAM}${detail.id}`);
                        setProd(res.listram[0])
                    } else if (detail.type === 'headphone') {
                        const res = await axiosCus.get(`${URLIDTaiNghe}${detail.id}`);
                        setProd(res.listTaiNghe[0])
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
    },[])

    const dispatch = useDispatch();

    const handleIncrease = (productId, prodsType) => {
        dispatch(addItem({ productId, prodsType }));
      };

      //off
    const handleEditValue = (e, id) => {
        const obj = {data: +e.target.value, id}
        dispatch(editQuantity(obj))
    }
    const handleReduce = (productId, prodsType) => {
        dispatch(reduceItem({ productId, prodsType }));
      };

    // slider
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    let sliderRef1 = useRef(null);
    let sliderRef2 = useRef(null);

    useEffect(() => {
        if(sliderRef1.current && sliderRef2.current) {
            setNav1(sliderRef1.current);
            setNav2(sliderRef2.current);
        }
        }, [sliderRef1.current, sliderRef2.current]);

    return (
        <>
        {prod && <div className="detail mt-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="img-product col-11 mx-auto col-md-6 card p-2">
                        <div>
                        <Slider asNavFor={nav2} ref={slider => (sliderRef1.current = slider)}>
                            <div>
                                <img src={prod.image} className="img-fluid" alt="1" />
                            </div>
                            <div>
                                <img src={prod.image2} className="img-fluid" alt="2" />
                            </div>
                            <div>
                                <img src={prod.image3} className="img-fluid" alt="3" />
                            </div>
                            <div>
                                <img src={prod.image4} className="img-fluid" alt="4" />
                            </div>
                        </Slider>
                        </div>
                        <div>
                        <Slider
                            asNavFor={nav1}
                            ref={slider => (sliderRef2.current = slider)}
                            slidesToShow={3}
                            swipeToSlide={true}
                            focusOnSelect={true}
                        >
                            <div>
                                <img src={prod.image} className="img-fluid" alt="1" />
                            </div>
                            <div>
                                <img src={prod.image2} className="img-fluid" alt="2" />
                            </div>
                            <div>
                                <img src={prod.image3} className="img-fluid" alt="3" />
                            </div>
                            <div>
                                <img src={prod.image4} className="img-fluid" alt="4" />
                            </div>
                        </Slider>
                        </div>
                        {/* <img src={prod.image} className="img-fluid" alt="" /> */}
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-between mx-auto pe-0">
                        <div className="detail-text card p-4 col-md-12">
                            <h5>{prod.brand}</h5>
                            <h4>{prod.productName}</h4>
                            <span className="my-1 fs-4 text-danger">{(prod.price - (prod.price * prod.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod.price.toLocaleString('vi-VN')}đ</strike></span>&nbsp;</span>
                            <p className='mb-2 mt-1'>Bảo hành: {prod.baoHanh}</p>

                            <span className=''>Chính sách bán hàng:</span>
                            <span><FaShippingFast className='detail-icons fs-5 my-1' />&nbsp; Miễn phí đơn hàng từ 5 triệu</span>
                            <span><AiOutlineFileProtect className='detail-icons fs-5 my-1' />&nbsp; Cam kết hàng chính hãng 100%</span>
                            <div className="detail-edit d-flex my-2">
                                <button onClick={() => handleIncrease(prod.productID, prod.type)} className="btn btn-outline-secondary">+</button>
                                <input value={ids[prod.type][prod.productID]} onChange={(e) => handleEditValue(e, prod.productID)} className="mx-2 text-center form-control" type="text"/>
                                <button onClick={() => handleReduce(prod.productID, prod.type)} className="btn btn-outline-secondary">-</button>
                            </div>
                            <div className="my-3">
                                <button onClick={() => handleIncrease(prod.productID, prod.type)} className="col-2 btn-buy btn">Mua</button>
                            </div>
                        </div>
                        <div className="other p-3 text-center card col-md-12">
                            <h5>Các sản phẩm khác bạn sẽ thích</h5>
                            <span>Chúng tôi có rất nhiều sản phẩm, hãy tham khảo và mua một sản phẩm phù hợp nhất!!</span>
                            <div className="d-flex">
                                {hotProds.slice(0, 4).map(prod => (
                                    <img key={prod.productID} className="mt-2 card img-fluid" src={prod.image}/>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='desDetail card col-12 mt-2 p-4'>
                        <div className="row">
                            <div className='col-8 pe-3'>
                                <h5>Mô tả sản phẩm</h5>
                                <p className="">{prod.description}</p>
                            </div>
                            <div className="col-4">
                                <h5>Thông tin chi tiết</h5>
                                <p>Thương hiệu:&nbsp;&nbsp;{prod.brand}</p>
                                {(prod.type === 'lap' || prod.type === 'pc') &&
                                <>
                                    <p>CPU: {prod.cpu}</p>
                                    <p>RAM: {prod.ram}</p>
                                    <p>Màn hình: {prod.manHinh}</p>
                                    <p>PIN: {prod.pin}</p>
                                    <p>Khối lượng: {prod.khoiLuong}</p>
                                    <p>Card Đồ họa: {prod.cardDoHoa}</p>
                                    <p>Bàn phím: {prod.banPhim}</p>
                                    <p>Màu sắc: {prod.mauSac}</p>
                                    <p>Nhu cầu: {prod.nhuCau}</p>
                                    <p>Lưu trữ: {prod.luuTru}</p>
                                    <p>Phụ kiện: {prod.phuKien}</p>
                                    <p>Kiểu kết nối: {prod.kieuKetNoi}</p>
                                </>
                                }
                                {prod.type === 'cpu' &&
                                <>
                                    <p>Socket: {prod.socKet}</p>
                                    <p>Số nhân xử lý: {prod.soNhan}</p>
                                    <p>Số luồng xử lý: {prod.soLuong}</p>
                                    <p>Kiến trúc: {prod.kienTruc}</p>
                                    <p>Tốc độ: {prod.tocDo}</p>
                                    <p>Cache: {prod.cache}</p>
                                    <p>Chip đồ họa: {prod.chipDoHoa}</p>
                                    <p>TDP: {prod.tdp}</p>
                                    <p>Bộ nhớ hỗ trợ: {prod.boNhoHoTro}</p>
                                </>
                                }
                                {prod.type === 'keyboard' &&
                                <>
                                    <p>Switch: {prod.switch}</p>
                                    <p>Màu sắc: {prod.mauSac}</p>
                                    <p>Kiểu kết nối: {prod.kieuKetNoi}</p>
                                    <p>Đèn LED: {prod.denLed}</p>
                                    <p>Kê tay: {prod.keTay}</p>
                                    <p>Kích thước: {prod.kichThuoc}</p>
                                </>
                                }
                                {prod.type === 'mouse' &&
                                <>
                                    <p>Màu sắc: {prod.mauSac}</p>
                                    <p>Kiểu kết nối: {prod.kieuKetNoi}</p>
                                    <p>Nhu cầu: {prod.nhuCau}</p>
                                    <p>Kiểu cầm: {prod.kieuCam}</p>
                                    <p>Số nút bấm: {prod.soNutBam}</p>
                                    <p>Đèn LED: {prod.denLed}</p>
                                    <p>Kích thước: {prod.kichThuoc}</p>
                                    <p>Khối lượng: {prod.khoiLuong}</p>
                                    <p>Độ phân giải (DPI): {prod.doPhanGiai}</p>
                                    <p>Dạng cảm biến: {prod.dangCamBien}</p>
                                    <p>Độ nhạy: {prod.doNhay}</p>
                                </>
                                }
                                {prod.type === 'ram' &&
                                <>
                                    <p>Màu sắc: {prod.mauSac}</p>
                                    <p>Thế hệ: {prod.theHe}</p>
                                    <p>Bus: {prod.bus}</p>
                                    <p>Đèn LED: {prod.denLed}</p>
                                    <p>Loại hàng: {prod.loaiHang}</p>
                                    <p>Part-number: {prod.partNumber}</p>
                                    <p>Nhu cầu: {prod.nhuCau}</p>
                                    <p>Dung lượng: {prod.dungLuong}</p>
                                    <p>Voltage: {prod.vol}</p>
                                </>
                                }
                                {prod.type === 'headphone' &&
                                <>
                                    <p>Tần số: {prod.tanSo}</p>
                                    <p>Kết nối: {prod.ketNoi}</p>
                                    <p>Kiểu kết nối: {prod.kieuKetNoi}</p>
                                    <p>Màu sắc: {prod.mauSac}</p>
                                    <p>Đèn LED: {prod.denLed}</p>
                                    <p>Microphone: {prod.microphone}</p>
                                    <p>Khối lượng: {prod.khoiLuong}</p>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
        </>
    );
}

export default detail;
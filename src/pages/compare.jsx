/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URLIDLapPC } from "../URL/url";
import { axiosCus } from "../axios/axios";
import { HandleClearCompare } from "../redux/compareSlice";
import { useNavigate } from "react-router-dom";


function compare() {

    const id1com = useSelector(state => state.compare.id1)
    const id2com = useSelector(state => state.compare.id2)
    
    const [prod1, setProd1] = useState()
    const [prod2, setProd2] = useState()

    useEffect(() => {
        const fetchData = async () => {          
            try {
                const res = await axiosCus.get(`${URLIDLapPC}${id1com}`);
                setProd1(res.listproducts[0])
                const res2 = await axiosCus.get(`${URLIDLapPC}${id2com}`);
                setProd2(res2.listproducts[0])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    },[])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClear = () => {
        dispatch(HandleClearCompare());
        navigate('../shop');
    }

    return (
        <div className="container-xxl p-4">
            <div className="row">
                <div className="col-6">
                    {prod1 && <div className="detail mt-5">
                <div className="container-xxl">
                    <div className="row">
                        <div className="img-product col-11 mx-auto col-md-6 card p-2">
                            <div>
                                <div>
                                    <img src={prod1.image} className="img-fluid" alt="1" />
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-between mx-auto pe-0">
                            <div className="detail-text card p-4 col-md-12">
                                <h5>{prod1.brand}</h5>
                                <h5>{prod1.productName}</h5>
                                <span className="my-1 fs-5 text-danger">{(prod1.price - (prod1.price * prod1.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod1.price.toLocaleString('vi-VN')}đ</strike></span>&nbsp;</span>
                                <p className='mb-2 mt-1'>Bảo hành: {prod1.baoHanh}</p>
                            </div>
                        </div>
                        <div className='desDetail card col-12 mt-2 p-4'>
                            <div className="row">
                                <div className='col-8 pe-3'>
                                    <h5>Mô tả sản phẩm</h5>
                                    <p className="">{prod1.description}</p>
                                </div>
                                <div className="col-4">
                                    <h5>Thông tin chi tiết</h5>
                                    <p>Thương hiệu:&nbsp;&nbsp;{prod1.brand}</p>
                                    {(prod1.type === 'lap' || prod1.type === 'pc') &&
                                    <>
                                        <p>CPU: {prod1.cpu}</p>
                                        <p>RAM: {prod1.ram}</p>
                                        <p>Màn hình: {prod1.manHinh}</p>
                                        <p>PIN: {prod1.pin}</p>
                                        <p>Khối lượng: {prod1.khoiLuong}</p>
                                        <p>Card Đồ họa: {prod1.cardDoHoa}</p>
                                        <p>Bàn phím: {prod1.banPhim}</p>
                                        <p>Màu sắc: {prod1.mauSac}</p>
                                        <p>Nhu cầu: {prod1.nhuCau}</p>
                                        <p>Lưu trữ: {prod1.luuTru}</p>
                                        <p>Phụ kiện: {prod1.phuKien}</p>
                                        <p>Kiểu kết nối: {prod1.kieuKetNoi}</p>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                    }
                </div>
                <div className="col-6">
                {prod2 && <div className="detail mt-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="img-product col-11 mx-auto col-md-6 card p-2">
                        <div>
                            <div>
                                <img src={prod2.image} className="img-fluid" alt="1" />
                            </div>
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-between mx-auto pe-0">
                        <div className="detail-text card p-4 col-md-12">
                            <h5>{prod2.brand}</h5>
                            <h5>{prod2.productName}</h5>
                            <span className="my-1 fs-5 text-danger">{(prod2.price - (prod2.price * prod2.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod2.price.toLocaleString('vi-VN')}đ</strike></span>&nbsp;</span>
                            <p className='mb-2 mt-1'>Bảo hành: {prod2.baoHanh}</p>
                        </div>
                    </div>
                    <div className='desDetail card col-12 mt-2 p-4'>
                        <div className="row">
                            <div className='col-8 pe-3'>
                                <h5>Mô tả sản phẩm</h5>
                                <p className="">{prod2.description}</p>
                            </div>
                            <div className="col-4">
                                <h5>Thông tin chi tiết</h5>
                                <p>Thương hiệu:&nbsp;&nbsp;{prod2.brand}</p>
                                {(prod2.type === 'lap' || prod2.type === 'pc') &&
                                <>
                                    <p>CPU: {prod2.cpu}</p>
                                    <p>RAM: {prod2.ram}</p>
                                    <p>Màn hình: {prod2.manHinh}</p>
                                    <p>PIN: {prod2.pin}</p>
                                    <p>Khối lượng: {prod2.khoiLuong}</p>
                                    <p>Card Đồ họa: {prod2.cardDoHoa}</p>
                                    <p>Bàn phím: {prod2.banPhim}</p>
                                    <p>Màu sắc: {prod2.mauSac}</p>
                                    <p>Nhu cầu: {prod2.nhuCau}</p>
                                    <p>Lưu trữ: {prod2.luuTru}</p>
                                    <p>Phụ kiện: {prod2.phuKien}</p>
                                    <p>Kiểu kết nối: {prod2.kieuKetNoi}</p>
                                </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </div>
                }
                </div>
                <button onClick={() => handleClear()} className="btn btn-warning">Clear</button>
            </div>
        </div>
    );
}

export default compare;
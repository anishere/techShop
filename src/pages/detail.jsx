/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux'
import { URLIDLapPC, URLhotProds } from '../URL/url';
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { FaShippingFast } from "react-icons/fa";
import { AiOutlineFileProtect } from "react-icons/ai";

function detail() {
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
        if(detail.type === 'lap' || detail.type === 'pc') {
            const fetchData = async () => {
                try {
                    const res = await axiosCus.get(`${URLIDLapPC}${detail.id}`);
                    setProd(res.listproducts[0])
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
        }
    },[])

    const handleIncrease = () => {}
    const handleEditValue = () => {}
    const handleReduce = () => {}

    return (
        <>

        {prod && <div className="detail mt-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="img-product col-11 mx-auto col-md-6 card p-2 p-md-5">
                        <img src={prod.image} className="img-fluid" alt="" />
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
                                <button onClick={() => handleIncrease(prod.id)} className="btn btn-outline-secondary">+</button>
                                <input onChange={(e) => handleEditValue(e, prod.id)} className="mx-2 text-center form-control" type="number"/>
                                <button onClick={() => handleReduce(prod.id)} className="btn btn-outline-secondary">-</button>
                            </div>
                            <div className="my-3">
                                <button onClick={() => handleIncrease(prod.id)} className="col-2 btn-buy btn">Mua</button>
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
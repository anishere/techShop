/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { BsDiscord, BsFacebook, BsGithub, BsSlack } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { axiosCus } from "../axios/axios";
import { URLgetALL, URLgetAllCPU, URLgetAllHeadPhone, URLgetAllKeyBoard, URLgetAllMouse, URLgetAllRAM } from "../URL/url";
import { useDispatch, useSelector } from "react-redux";
import { clearIds } from "../redux/detailSlice";


function finalCheckout() {
    const ids = useSelector(state => state.prod.ids)
    const keyIdsLap = Object.keys(ids.lap);
    const keyIdsCPU = Object.keys(ids.cpu);
    const keyIdsKeyBoard = Object.keys(ids.keyboard);
    const keyIdsMouse = Object.keys(ids.mouse);
    const keyIdsRAM = Object.keys(ids.ram);
    const keyIdsHeadPhone = Object.keys(ids.headphone);

    //Get prod 
    const [prodsLap, setProdsLap] = useState([])
    const [prodsCPU, setProdsCPU] = useState([])
    const [prodsRAM, setProdsRAM] = useState([])
    const [prodsKeyBoard, setProdsKeyBoard] = useState([])
    const [prodsMouse, setProdsMouse] = useState([])
    const [prodsHeadPhone, setProdsHeadPhone] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(Object.keys(ids.lap).length > 0) {
                    const res = await axiosCus.get(`${URLgetALL}`);
                    setProdsLap(res.listproducts)
                }
                if (Object.keys(ids.cpu).length > 0) {
                    const res = await axiosCus.get(`${URLgetAllCPU}`);
                    setProdsCPU(res.listcpu)
                }
                if (Object.keys(ids.keyboard).length > 0) {
                    const res = await axiosCus.get(`${URLgetAllKeyBoard}`);
                    setProdsKeyBoard(res.listKeyBoard)
                }
                if (Object.keys(ids.mouse).length > 0) {
                    const res = await axiosCus.get(`${URLgetAllMouse}`);
                    setProdsMouse(res.listMouse)
                }
                if (Object.keys(ids.ram).length > 0) {
                    const res = await axiosCus.get(`${URLgetAllRAM}`);
                    setProdsRAM(res.listram)
                }
                if (Object.keys(ids.headphone).length > 0) {
                    const res = await axiosCus.get(`${URLgetAllHeadPhone}`);
                    setProdsHeadPhone(res.listTaiNghe)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    },[])

    let totalPriceItems = 0;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClearCart = () => {
        dispatch(clearIds());
      };

    const handleBack = () => {
        handleClearCart();
        navigate('../')
    }

    return (
    <>
        <div className="container-xxl bg-white text-black p-5">
            <div className="row">
                <div className="col-12">
                    <h3 className="text-center text-success">Cảm ơn bạn đã đặt hàng !</h3>
                    <div className="text-center">
                        <h4 className="text-justify ">Cửa hàng sẽ liên hệ với bạn sớm nhất để xác nhận đơn đặt hàng</h4>
                        <p>Bạn có thể liên hệ với cửa hàng thông qua các phương thức sau</p>
                        <div className="col-2 mx-auto social-icons d-flex justify-content-around">
                            <Link className="fs-4 icon-finalcheckout" to={'https://discord.com/'}><BsDiscord/></Link>
                            <Link className="fs-4 icon-finalcheckout" to={'https://www.facebook.com/profile.php?id=100035519748585'}><BsFacebook/></Link>
                            <Link className="fs-4 icon-finalcheckout" to={'https://github.com/anishere/techShop.git'}><BsGithub/></Link>
                            <Link className="fs-4 icon-finalcheckout" to={'https://slack.com/'}><BsSlack/></Link>
                        </div>
                        <div className="col-12">
                        {prodsLap && prodsLap.filter(product => 
                        keyIdsLap.includes(`${product.productID}`) && ids.lap[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail text-start">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                            </div>
                        </div> 
                        )})
                    }
                    {prodsCPU && prodsCPU.filter(product => 
                        keyIdsCPU.includes(`${product.productID}`) && ids.cpu[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.cpu[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail text-start">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                            </div>
                        </div> 
                        )})
                    }{prodsKeyBoard && prodsKeyBoard.filter(product => 
                        keyIdsKeyBoard.includes(`${product.productID}`) && ids.keyboard[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.keyboard[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail text-start">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                            </div>
                        </div> 
                        )})
                    }{prodsMouse && prodsMouse.filter(product => 
                        keyIdsMouse.includes(`${product.productID}`) && ids.mouse[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.mouse[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail text-start">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                            </div>
                        </div> 
                        )})
                    }
                    {prodsRAM && prodsRAM.filter(product => 
                        keyIdsRAM.includes(`${product.productID}`) && ids.ram[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.ram[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail text-start">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                            </div>
                        </div> 
                        )})
                    }{prodsHeadPhone && prodsHeadPhone.filter(product => 
                        keyIdsHeadPhone.includes(`${product.productID}`) && ids.headphone[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.headphone[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail text-start">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                            </div>
                        </div> 
                        )})
                    }
                        <div className="text-success col-10 text-end">
                            <h4>Tổng tiền</h4>
                            <span className="fs-4">{totalPriceItems.toLocaleString('vi-VN')}đ</span>
                        </div>
                        </div>
                        <button onClick={() => handleBack()} className="btn btn-primary">Về trang chủ</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default finalCheckout;
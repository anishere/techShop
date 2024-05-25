/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearIds, deleteItem, editQuantity, putTotalPrice, reduceItem } from "../redux/detailSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { AiFillDelete } from "react-icons/ai";
import { URLgetALL, URLgetAllCPU, URLgetAllKeyBoard, URLgetAllMouse, URLgetAllRAM, URLgetAllHeadPhone } from "../URL/url";
//import { URLIDLapPC, URLIDCPU, URLIDKeyBoard, URLIDMouse, URLIDRAM, URLIDTaiNghe } from '../URL/url';


function cart() {

    const ids = useSelector(state => state.prod.ids)
    const keyIdsLap = Object.keys(ids.lap);
    const keyIdsCPU = Object.keys(ids.cpu);
    const keyIdsKeyBoard = Object.keys(ids.keyboard);
    const keyIdsMouse = Object.keys(ids.mouse);
    const keyIdsRAM = Object.keys(ids.ram);
    const keyIdsHeadPhone = Object.keys(ids.headphone);
    // total items
    const totalItems = Object.keys(ids).reduce((accumulator, productType) => {
        const productCounts = Object.values(ids[productType]);
        return accumulator + productCounts.reduce((sum, count) => sum + count, 0);
      }, 0);
    //
      
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
    },[totalItems])

    console.log(prodsCPU)
    //console.log(prodsLap);

    const dispatch = useDispatch()


    // const handleEditQuantity = (e, id) => {
    //     const obj = {data: +e.target.value, id}
    //     dispatch(editQuantity(obj))
    // }
    // const handleIncrease = id => dispatch(addItem(id))
    // const handleReduce = id => dispatch(reduceItem(id))
    // const handleDelete = id => dispatch(deleteItem(id))
    // const handleClearCart = () => dispatch(clearIds())
    // const handlePay = (totalPrice) => dispatch(putTotalPrice(totalPrice))

    // Thêm sản phẩm
  const handleIncrease = (productId, prodsType) => {
    dispatch(addItem({ productId, prodsType }));
  };

  // Giảm số lượng sản phẩm
  const handleReduce = (productId, prodsType) => {
    dispatch(reduceItem({ productId, prodsType }));
  };

  // Sửa số lượng sản phẩm
  const handleEditQuantity = (productId, prodsType, quantity) => {
    dispatch(editQuantity({ productId, prodsType, quantity }));
  };

  // Xóa sản phẩm
  const handleDelete = (productId, prodsType) => {
    dispatch(deleteItem({ productId, prodsType }));
  };

  // Xóa tất cả sản phẩm
  const handleClearCart = () => {
    dispatch(clearIds());
  };

  // Cập nhật tổng giá
  const handlePay = (totalPrice) => {
    dispatch(putTotalPrice(totalPrice));
  };

    let totalPriceItems = 0


    if(totalItems > 0) {
        return (<>
            <div className="cart py-5">
                <div className="container-xxl">
                    <div className="row">      
                    {prodsLap && prodsLap.filter(product => 
                        keyIdsLap.includes(`${product.productID}`) && ids.lap[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                                <div className="cart-item-edit d-flex justify-content-between px-md-3 my-4 text-md-center">
                                    <div className="my-auto">
                                        <button onClick={() => handleIncrease(product.productID, product.type)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.type][product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID, product.type)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID, product.type)} className="delete-button"><AiFillDelete/></button>
                                </div>
                                <div className="px-3">
                                    <input  type="text" className="form-control" placeholder="Nhập mã giảm giá..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div> 
                        )})
                    }
                    {prodsCPU && prodsCPU.filter(product => 
                        keyIdsCPU.includes(`${product.productID}`) && ids.cpu[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                                <div className="cart-item-edit d-flex justify-content-between px-md-3 my-4 text-md-center">
                                    <div className="my-auto">
                                        <button onClick={() => handleIncrease(product.productID, product.type)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.type][product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID, product.type)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID, product.type)} className="delete-button"><AiFillDelete/></button>
                                </div>
                                <div className="px-3">
                                    <input  type="text" className="form-control" placeholder="Nhập mã giảm giá..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div> 
                        )})
                    }{prodsKeyBoard && prodsKeyBoard.filter(product => 
                        keyIdsKeyBoard.includes(`${product.productID}`) && ids.keyboard[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                                <div className="cart-item-edit d-flex justify-content-between px-md-3 my-4 text-md-center">
                                    <div className="my-auto">
                                        <button onClick={() => handleIncrease(product.productID, product.type)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.type][product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID, product.type)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID, product.type)} className="delete-button"><AiFillDelete/></button>
                                </div>
                                <div className="px-3">
                                    <input  type="text" className="form-control" placeholder="Nhập mã giảm giá..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div> 
                        )})
                    }{prodsMouse && prodsMouse.filter(product => 
                        keyIdsMouse.includes(`${product.productID}`) && ids.mouse[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                                <div className="cart-item-edit d-flex justify-content-between px-md-3 my-4 text-md-center">
                                    <div className="my-auto">
                                        <button onClick={() => handleIncrease(product.productID, product.type)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.type][product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID, product.type)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID, product.type)} className="delete-button"><AiFillDelete/></button>
                                </div>
                                <div className="px-3">
                                    <input  type="text" className="form-control" placeholder="Nhập mã giảm giá..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div> 
                        )})
                    }
                    {prodsRAM && prodsRAM.filter(product => 
                        keyIdsRAM.includes(`${product.productID}`) && ids.ram[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                                <div className="cart-item-edit d-flex justify-content-between px-md-3 my-4 text-md-center">
                                    <div className="my-auto">
                                        <button onClick={() => handleIncrease(product.productID, product.type)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.type][product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID, product.type)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID, product.type)} className="delete-button"><AiFillDelete/></button>
                                </div>
                                <div className="px-3">
                                    <input  type="text" className="form-control" placeholder="Nhập mã giảm giá..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div> 
                        )})
                    }{prodsHeadPhone && prodsHeadPhone.filter(product => 
                        keyIdsHeadPhone.includes(`${product.productID}`) && ids.headphone[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = (product.price - (product.price * product.discount)) * ids.lap[product.productID]
                            totalPriceItems += totalPriceItem
                        return (
                        <div key={product.productID} className="cart-item d-md-flex col-md-11 mx-auto p-3 m-2">
                            <div className="col-md-5"><img src={product.image} alt="" className="d-block mx-auto img-fluid"/></div>
                            <div className="col-md-7">
                                <div className="cart-item-detail">
                                    <h5>{product.productName}</h5>
                                    <p>Hãng: <b>{product.brand}</b></p>
                                    <p>Đơn giá: <b>{(product.price - (product.price * product.discount)).toLocaleString('vi-VN')}đ</b></p>
                                    <p>Mã sản phẩm: <b>{product.productID}</b></p>
                                </div>
                                <div className="cart-item-edit d-flex justify-content-between px-md-3 my-4 text-md-center">
                                    <div className="my-auto">
                                        <button onClick={() => handleIncrease(product.productID, product.type)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.type][product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID, product.type)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID, product.type)} className="delete-button"><AiFillDelete/></button>
                                </div>
                                <div className="px-3">
                                    <input  type="text" className="form-control" placeholder="Nhập mã giảm giá..." aria-describedby="basic-addon1"/>
                                </div>
                            </div>
                        </div> 
                        )})
                    }
                    
                        <div className="clearCart col-md-11 mx-auto my-3 d-md-flex justify-content-end">
                            <button onClick={() => handleClearCart()}>Xóa hết</button>
                        </div>
                        <hr className="col-11 mx-auto" />

                        <div className="cart-end col-md-11 mx-auto d-md-flex justify-content-between">
                            <div className="my-3">
                                <Link to={'../shop'}>Tiếp tục mua sắm</Link>
                                <Link onClick={() => handlePay(totalPriceItems)} to={'../payment'} className="mx-4">Đặt hàng</Link>
                            </div>
                            <div className="text-success">
                                <h4>Total</h4>
                                <span className="fs-4">{totalPriceItems.toLocaleString('vi-VN')}đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
    } else {
        return (<>
            <div className="empty text-center d-flex flex-wrap">
                <p className="fs-4 col-12">Giỏ hàng bạn đang rỗng !!!</p>
                <Link className="btn btn-success" to={'../shop'}>Tiếp tục mua sắm</Link>    
            </div>
        </>);
    }
}

export default cart;
/* eslint-disable react-hooks/rules-of-hooks */
import { useDispatch, useSelector } from "react-redux";
import { addItem, clearIds, deleteItem, editQuantity, putTotalPrice, reduceItem } from "../redux/detailSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLgetALL } from "../URL/url";
import { AiFillDelete } from "react-icons/ai";


function cart() {

    const ids = useSelector(state => state.prod.ids)
    const keyIds = Object.keys(ids);
    // total items
    const values = Object.values(ids);
    const totalItems = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    //

    //Get prod 
    const [prod, setProd] = useState()
    useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await axiosCus.get(`${URLgetALL}`);
                    setProd(res.listproducts)
                    console.log('Cartt-----------------',res.listproducts)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData()
    },[totalItems])

    const dispatch = useDispatch()

    const handleEditQuantity = (e, id) => {
        const obj = {data: +e.target.value, id}
        dispatch(editQuantity(obj))
    }

    const handleIncrease = id => dispatch(addItem(id))

    const handleReduce = id => dispatch(reduceItem(id))

    const handleDelete = id => dispatch(deleteItem(id))

    const handleClearCart = () => dispatch(clearIds())

    let totalPriceItems = 0
    console.log(prod)
    console.log(keyIds)

    const handlePay = (totalPrice) => dispatch(putTotalPrice(totalPrice))

    if(prod && totalItems > 0) {

        return (<>
            <div className="cart py-5">
                <div className="container-xxl">
                    <div className="row">
                    {prod.filter(product => 
                        keyIds.includes(`${product.productID}`) && ids[product.productID] > 0) //trong keyIds la cac string
                        .map(product => {
                            const totalPriceItem = product.price * ids[product.productID]
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
                                        <button onClick={() => handleIncrease(product.productID)}>+</button>
                                        <input className="mx-4 fs-5 text-danger" type="text" value={ids[product.productID]} onChange={(e) => handleEditQuantity(e, product.productID)} />
                                        <button onClick={() => handleReduce(product.productID)}>-</button>
                                    </div>
                                    <button onClick={() => handleDelete(product.productID)} className="delete-button"><AiFillDelete/></button>
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
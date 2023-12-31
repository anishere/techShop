/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useSelector } from "react-redux";
import { URLorder } from "../URL/url";
import { axiosCus } from "../axios/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function payment() {
    const [SDT, setSDT] = useState()
    const [name, setName] = useState()
    const [address, setAddress] = useState()

    const navigate = useNavigate()


    const totalPrice = useSelector(state => state.prod.totalPrice)
    const listcart = useSelector(state => state.prod.ids)

    useEffect(() => {
        if(totalPrice <= 0)
            navigate('/')
    }, [])

    const handleSubmit = async () => {
        try {
            const response = await axiosCus.post(`${URLorder}`, {
                phoneNumber: SDT,
                name: name,
                address: address,
                listCart: JSON.stringify(listcart),
                totalPrice: totalPrice
            });
        
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            alert('Đặt hàng thành công shop sẽ liên hệ với bạn để xác nhận sớm nhất')
            window.location.reload(); 
            window.location.href = '/';
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }

    return (
        <div className="container-xxl p-4">
            <div className="row">
                <div className="col-12">
                <form className="bg-white p-4 text-black payment-form">
                    <h3 className="text-center">Phiếu đặt hàng</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">SĐT:</label>
                    <input value={SDT} onChange={(e) => setSDT(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tên:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Địa chỉ:</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <h4>Tổng tiền: {totalPrice.toLocaleString('vi-VN')}vnđ</h4>
                    <button onClick={() => handleSubmit()} type="button" className="btn btn-primary">Xác nhận</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default payment;
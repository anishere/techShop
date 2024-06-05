/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useSelector } from "react-redux";
import { URLorder } from "../URL/url";
import { axiosCus } from "../axios/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import qrcode from '../assets/imgs/qrcode.jpg';

function payment() {
    const [SDT, setSDT] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [email, setEmail] = useState('')
    const [note, setNote] = useState('')

    const navigate = useNavigate()


    const totalPrice = useSelector(state => state.prod.totalPrice)
    const listcart = useSelector(state => state.prod.ids)

    const convertCartToArray = (cart) => {
        let cartArray = [];
        
        Object.keys(cart).forEach(type => {
          Object.keys(cart[type]).forEach(id => {
            cartArray.push({
              type: type,
              id: id,
              quantity: cart[type][id]
            });
          });
        });
        
        return cartArray;
      };
    
    const carttoDB = convertCartToArray(listcart)
    
    console.log(carttoDB);

    useEffect(() => {
        if(totalPrice <= 0)
            navigate('/')
    }, [])

    const handleSubmit = async () => {
        if(SDT == '' || name == '' || address == '' || email == '') {
            alert("Hãy nhập đủ thông tin trước khi tiến hành đặt hàng")
        } else {
        try {
            const response = await axiosCus.post(`${URLorder}`, {
                phoneNumber: SDT,
                name: name,
                address: address,
                note: note,
                email: email,
                codePayment: code,
                listCart: JSON.stringify(carttoDB),
                totalPrice: totalPrice,
                status: 'Đang xử lí',
            }); 
            
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            if (response.statusCode === 200) {
                alert('Đặt hàng thành công. Shop sẽ liên hệ với bạn để xác nhận sớm nhất.');
                window.location.reload();
                window.location.href = '/';
            } else {
                console.error("Error updating product:", response.data);
                // Xử lý lỗi nếu cần thiết
            }
        } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
        }
        }
    }
    
    const [code, setCode] = useState('');

    const generateRandomCode = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    useEffect(() => {
        const handleGenerateCode = () => {
            const newCode = generateRandomCode(6); // Tạo mã có độ dài 10 ký tự
            setCode(newCode);
        }
        handleGenerateCode();
    },[])

    return (
        <div className="container-xxl p-4">
            <div className="row">
                <div className="col-8">
                <form className="bg-white p-4 text-black payment-form">
                    <h3 className="text-center">Phiếu đặt hàng</h3>
                <div className="mb-3 row">
                    <div className="col-6">
                        <label htmlFor="exampleInputPassword1" className="form-label">Tên:</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                    </div>
                    <div className="col-6">
                        <label htmlFor="exampleInputEmail1" className="form-label">SĐT:</label>
                        <input value={SDT} onChange={(e) => setSDT(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Địa chỉ:</label>
                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Note:</label>
                    <textarea value={note} onChange={(e) => setNote(e.target.value)} type="text" className="form-control" id="exampleInputEmail1"/>
                </div>
                <h4>Tổng tiền: {totalPrice.toLocaleString('vi-VN')}vnđ</h4>
                    <button onClick={() => handleSubmit()} type="button" className="btn btn-primary">Xác nhận</button>
                </form>
                </div>
                <div className="col-4">
                <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Thanh toán QR</Accordion.Header>
                    <Accordion.Body>
                    <img src={qrcode} alt="" className="img-fluid" />
                    <h6>Nội dung chuyển khoản: <span className="text-primary">{`${code}`}</span></h6>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Thanh toán khi nhận hàng</Accordion.Header>
                    <Accordion.Body>
                    <div className="form-check">
                        <input className="form-check-input mb-1" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <span className="ms-2 cod-text">COD</span>
                    </div>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
                </div>
            </div>
        </div>
    );
}

export default payment;
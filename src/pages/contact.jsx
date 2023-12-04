/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLaddFeedBack, infoShop } from "../URL/url";
import { toast } from "react-toastify";


function contact() {
    const [infoContact, setInfoContact] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(`${infoShop}`);
                setInfoContact(res.infoShop[0])
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    //two way feedback
    const [name, setName] = useState()
    const [SDT, setSDT] = useState()
    const [email, setEmail] = useState()
    const [feedBack, setFeedback] = useState()

    const handleSubmit = async () => {
        try {
            const response = await axiosCus.post(`${URLaddFeedBack}`, {
                ten: name,
                email: email,
                sdt: SDT,
                messageDetail: feedBack,
            });
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success('Gửi góp ý thành công', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              setName('')
              setEmail('')
              setSDT('')
              setFeedback('')
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }
    
    return (<>
        <section className="banner-shop banner-contact">
            <div className="container-xxl">
                <div className="row">
                    <div className="bannerShop-detail text-center">
                        <h1 className="fs-1">Liên hệ với chúng tôi</h1>
                        <h1 className="fs-5">Chúng tôi luôn sẵn sàng để hỗ trợ</h1>
                    </div>
                </div>
            </div>
        </section>

        {infoContact && <section className="contact-info p-4">
            <div className="container-xxl">
                <div className="row">
                    <div className="col-md-6">
                        <iframe className="col-12" src={`${infoContact.map}`}></iframe>
                    </div>
                    <div className="text-center text-black d-flex align-items-center col-6">
                        <div className="contact-info-detail col-12 p-5">
                            <h4>Liên hệ với chúng tôi</h4>
                            <p className="my-2"><b>Địa chỉ: </b>{infoContact.address}</p>
                            <p className="my-2"><b>SĐT: </b><a href={`tel:+84${infoContact.sdt}`}>{infoContact.sdt}</a></p>
                            <p className="my-2"><b>Hours: </b>Từ 8 a.m đến 6 p.m</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>}

        <section className="contact-message text-black my-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="contact-message-detail p-5 col-md-8 mx-auto">
                        <h4 className="text-center text-success">Feedback</h4>
                        <div className="d-flex mt-4">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="me-3 form-control" placeholder="Tên" aria-label="Username" aria-describedby="basic-addon1"/>
                            <input type="text" value={SDT} onChange={(e) => setSDT(e.target.value)} className="form-control" placeholder="Số điện thoại" aria-label="Username" aria-describedby="basic-addon1"/>
                        </div>
                        <div className="mb-4 mt-4">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Địa chỉ Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Góp ý</label>
                            <textarea value={feedBack} onChange={(e) => setFeedback(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div className="text-center">
                            <button onClick={() => handleSubmit()} className="btn btn-success">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>);
}

export default contact;
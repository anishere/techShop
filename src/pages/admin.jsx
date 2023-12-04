/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Table from 'react-bootstrap/Table';
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { URLLap, URLaddProd, URLchangePass, URLdeleteFeedback, URLdeleteOrder, URLdeleteProd, URLupdateAbout, URLupdateInfoShop } from '.././URL/url'
import { infoShop, about, infoCustomer, feedBack } from '.././URL/url';
import ReactPaginate from 'react-paginate';
import { UpInfoProd } from '../redux/detailSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux'

function admin() {

    const dispatch = useDispatch()
    const [URL, setURL] = useState(URLLap)
    const [listRes, setListRes] = useState()

    const [type, setType] = useState('lap')

    const [totalProds, setTotalProds] = useState()
    const totalPages = Math.ceil((totalProds / 20))

    const [selected, setSelected] = useState(true)

    //check auth
    const navigate = useNavigate()
    const isAuth = useSelector((state) => state.auth.isAuthenticated)

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if(isLoggedIn !== true)
            if(isAuth === false)
                navigate('../login')
    }, []) 

    const handleSelectURL = (URL, type) => {
        setURL(URL)
        setType(type)
        setSelected(!selected)
    }

    const types = [
        'lap',
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(URL);
                if (type === 'infoShop')
                {
                    setTotalProds(0)
                    setListRes(res.infoShop)
                }                  
                else if (type === 'about')
                {
                    setListRes(res.about)
                    setTotalProds(0)
                }    
                else if (type === 'infoCustomer')
                {
                    setListRes(res.listcustomers)
                    setTotalProds(0)
                }    
                else if (type === 'feedback')
                {
                    setListRes(res.listMessage)
                    setTotalProds(0)
                }         
                else if (type === 'lap' || type === 'pc')
                {
                    setListRes(res.listproducts)
                    let total = await axiosCus.get('ProductsPCLap/TotalCount')
                    setTotalProds(total.totalCount)
                }     
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [URL, type]);

    const handleSelectPage = (e) => {
        setURL(`ProductsPCLap/GetLaptops?page=${e.selected+1}&pageSize=20`)
    }

    const handleSelectProd = (id, type) => {
        dispatch(UpInfoProd({id, type}))
    }

    //model Add Prod
    const [show, setShow] = useState(false);
    // two ways for input
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [des, setDes] = useState()
    const [discount, setDiscount] = useState()
    const [price, setPrice] = useState()
    const [warranty, setWarranty] = useState()
    const [image, setImage] = useState()
    const [typeAdd, setTypeAdd] = useState()
    const [CPU, setCPU] = useState()
    const [RAM, setRAM] = useState()
    const [screen, setScreen] = useState()
    const [PIN, setPIN] = useState()
    const [OS, setOS] = useState()
    const [weight, setWeight] = useState()
    const [GPU, setGPU] = useState()
    const [keyboard, setKeyboard] = useState()
    const [color, setColor] = useState()
    const [demand, setDemand] = useState()
    const [storage, setStorage] = useState()
    const [accessory, setAccessory] = useState()
    const [connect, setConnect] = useState()
    const [dateUpdate, setDateUpdate] = useState()
    const [hot, setHot] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddProd = async () => {
        try {
          const response = await axiosCus.post(`${URLaddProd}`, {
            productName: name,
            description: des,
            brand: brand,
            discount: discount,
            price: price,
            image: image,
            type: type,
            baoHanh: warranty,
            cpu: CPU,
            ram: RAM,
            manHinh: screen,
            pin: PIN,
            heDieuHanh: OS,
            khoiLuong: weight,
            cardDoHoa: GPU,
            banPhim: keyboard,
            mauSac: color,
            nhuCau: demand,
            luuTru: storage,
            phuKien: accessory,
            kieuKetNoi: connect,
            hot: hot,
            ngayNhap: new Date(dateUpdate).toISOString(),
          });
      
          // Xử lý dữ liệu trả về nếu cần thiết
          console.log(response.statusCode);
          toast.success(response.statusMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            handleClose()
            location.reload();
        } catch (error) {
          // Xử lý lỗi
          console.error("Error updating product:", error);
        }
      };  

    const handleDeleteProduct = async (id) => {
        try {
            const response = await axiosCus.delete(`${URLdeleteProd}${id}`);
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success(response.statusMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              location.reload();
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }
    const handleConfirm = (id) => {
        if(confirm('Sản phẩm sẽ bị xóa và không thể khôi phục, bạn chắc chứ ?')){
            handleDeleteProduct(id)
        }
    }

    //Modal InfoShop
    const [showInfo, setShowInfo] = useState(false);
    const handleShowInfo = () => setShowInfo(true)
    const handleUpdateInfo = async () => {
        try {
            const response = await axiosCus.put(`${URLupdateInfoShop}`, {
              sdt: SDTshop,
              address: addressShop,
              logo: logoShop,
              map: mapShop
            });
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success(response.statusMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              setShowInfo(false)
              location.reload();
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }
    //two way info
    const [SDTshop, setSDTshop] = useState();
    const [addressShop, setAdressShop] = useState();
    const [logoShop, setLogoShop] = useState();
    const [mapShop, setMapShop] = useState();

    //modal aboutShop
    const [showAbout, setShowAbout] = useState(false);
    const handleShowAbout = () => setShowAbout(true)
    const handleUpdateAbout = async () => {
        try {
            const response = await axiosCus.put(`${URLupdateAbout}`, {
              about1: about1,
              about2: about2
            });
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success(response.statusMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              setShowInfo(false)
              location.reload();
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }
    //two way About
    const [about1, setAbout1] = useState()
    const [about2, setAbout2] = useState()

    //Order
    const handleDeleteOrder = async (id) => {
        if(confirm('Sau khi xóa sẽ không thể khôi phục bạn chắc chứ')) {
        try {
            const response = await axiosCus.delete(`${URLdeleteOrder}${id}`);
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success(response.statusMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            location.reload();
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
        }
    }

    //Feedback
    const handleDeleteFeedback = async (id) => {
        if(confirm('Sau khi xóa sẽ không thể khôi phục bạn chắc chứ')) {
        try {
            const response = await axiosCus.delete(`${URLdeleteFeedback}${id}`);
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success(response.statusMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            location.reload();
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
        }
    }

    const [showPass, setShowPass] = useState(false);
    const [passNew, setPassNew] = useState()
    const handleChangePass = async () => {
        try {
            const response = await axiosCus.post(`${URLchangePass}${passNew}`);
        
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            toast.success(response.statusMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              handleClose()
              location.reload();
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
    }

    const formatNumber = (number) => parseFloat(number).toLocaleString('vi-VN');

    return (<>
        <div className="container-xxl mb-5">
        <div className="admin-button mb-5">
                <button className='btn btn-primary mx-2' onClick={() => handleSelectURL(infoShop, 'infoShop')}>Thông tin shop</button>
                <button className='btn btn-primary' onClick={() => handleSelectURL(about,'about')}>Trang giới thiệu</button>
                <button className='btn btn-primary mx-2' onClick={() => handleSelectURL(infoCustomer,'infoCustomer')}>Thông tin đặt hàng</button>
                <button className='btn btn-primary' onClick={() => handleSelectURL(feedBack,'feedback')}>FeedBack</button>
                <button className='btn btn-primary mx-2' onClick={() => handleSelectURL(URLLap,'lap')}>Sản phẩm LapTop</button>
        </div>

        <div className="admin-table">
            { types.includes(type) &&
            <>
            <span>Tổng sản phẩm: {totalProds}</span> 
            </>              
            }
            <span className='mx-2 text-capitalize'>Type: {type}</span>

            <Button variant="primary" onClick={handleShow}>
                Thêm sản phẩm
            </Button>

            <button onClick={() => setShowPass(true)} className='btn btn-primary mx-4'>Thay đổi mật khẩu</button>
            <button onClick={() => handleLogout()} className='btn btn-warning' >Đăng xuất</button>

            <Modal
                className='text-black'
                size="sm"
                show={showPass}
                onHide={() => setShowPass(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Thay đổi mật khẩu
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Mật khẩu mới: </p>
                    <input type="text" value={passNew} onChange={(e) => setPassNew(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPass(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleChangePass}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        { type === 'infoShop' &&
                            <>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Logo</th>
                            <th>Map</th>
                            <th>Chỉnh sửa</th>
                            </>
                        }
                        { type === 'about' &&
                            <>
                            <th>Đoạn 1</th>
                            <th>Đoạn 2</th>
                            <th>Chỉnh sửa</th>
                            </>
                        }
                        { type === 'infoCustomer' &&
                            <>
                            <th>SĐT</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th>Đơn hàng</th>
                            <th>Tổng tiền</th>
                            <th>Xóa</th>
                            </>
                        }
                        { type === 'feedback' &&
                            <>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Tên</th>
                            <th>FeedBack</th>
                            <th>Xóa</th>
                            </>
                        }
                        {/* Cột chung của products */}
                        { types.includes(type) &&
                        (<>
                            <th>Mã SP</th>
                            <th>Tên SP</th>
                            <th>Brand</th>
                            <th>Mô tả</th>
                            <th>Giảm giá</th>
                            <th>Giá</th>
                            <th>Bảo hành</th>
                            <th>Ảnh</th>
                            <th>Loại</th>
                            { (type === 'lap') &&
                                //Cột của LapPC
                                <>
                                <th>CPU</th> 
                                <th>RAM</th>
                                <th>Màn hình</th>
                                <th>PIN</th>
                                <th>Hệ điều hành</th>
                                <th>Khối lượng</th>
                                <th>Card đồ họa</th>
                                <th>Bàn phím</th>
                                <th>Màu sắc</th> 
                                <th>Nhu cầu</th>
                                <th>Lưu trữ</th>
                                <th>Phụ kiện</th>
                                <th>Kiểu kết nối</th>
                                <th>Hot</th>
                                </>
                            }
                            <th>Ngày nhập</th> 
                            <th>Chi tiết sp</th>
                            <th>Xóa</th>
                        </>)
                        }
                    </tr>
                </thead>
                <tbody>
                {listRes && listRes.length > 0 &&
                    listRes.map((item, index) => {
                        return (
                            <tr key={index}>
                                {type === 'infoShop' &&
                                    <>
                                    <td><p>{item.sdt}</p></td>
                                    <td><p>{item.address}</p></td>
                                    <td><p>{item.logo}</p></td>
                                    <td><p>{item.map}</p></td>
                                    <td><button onClick={handleShowInfo} className='btn btn-success'>Thay đổi</button></td>                                    
                                    {/* Modal InfoShop */}
                                    <Modal
                                        className='text-black'
                                        show={showInfo}
                                        onHide={() => setShowInfo(false)}
                                        aria-labelledby="example-custom-modal-styling-title"
                                        fullscreen={true}
                                    >
                                        <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            Thông tin shop
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <div className="row">
                                            <div className="col-12 d-flex flex-column justify-content-between mx-auto pe-0">
                                                <div className="detailUpdate card p-4 col-md-12">
                                                <p>SDT: {item.sdt}</p>
                                                <input type="text" value={SDTshop} onChange={(e) => setSDTshop(e.target.value)} />
                                                <p>Địa chỉ: {item.address}</p>
                                                <input type="text" value={addressShop} onChange={(e) => setAdressShop(e.target.value)} />
                                                <p>Logo: {item.logo}</p>
                                                <input type="text" value={logoShop} onChange={(e) => setLogoShop(e.target.value)} />
                                                <p>Map: {item.map}</p>
                                                <input type="text" value={mapShop} onChange={(e) => setMapShop(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowInfo(false)}>
                                            Đóng
                                        </Button>
                                        <Button variant="primary" onClick={handleUpdateInfo}>
                                            Xác nhận
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </> 
                                }
                                {type === 'about' &&
                                    <>
                                    <td><p>{item.about1}</p></td>
                                    <td><p>{item.about2}</p></td>
                                    <td><button className='btn btn-success' onClick={handleShowAbout} >Thay đổi</button></td>
                                    {/* Modal About */}
                                    <Modal
                                        className='text-black'
                                        show={showAbout}
                                        onHide={() => setShowAbout(false)}
                                        aria-labelledby="example-custom-modal-styling-title"
                                        fullscreen={true}
                                    >
                                        <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            Cập nhật giới thiệu
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <div className="row">
                                            <div className="col-12 d-flex flex-column justify-content-between mx-auto pe-0">
                                                <div className="detailUpdate card p-4 col-md-12">
                                                <p>Giới thiệu 1: {item.about1}</p>
                                                <input type="text" value={about1} onChange={(e) => setAbout1(e.target.value)} />
                                                <p>Giới thiệu 2: {item.about2}</p>
                                                <input type="text" value={about2} onChange={(e) => setAbout2(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowInfo(false)}>
                                            Đóng
                                        </Button>
                                        <Button variant="primary" onClick={handleUpdateAbout}>
                                            Xác nhận
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </>
                                }
                                { type === 'infoCustomer' &&
                                    <>
                                    <td><p>{item.phoneNumber}</p></td>
                                    <td><p>{item.name}</p></td>
                                    <td><p>{item.address}</p></td>
                                    <td><p>{item.listCart}</p></td>
                                    <td><p>{formatNumber(item.totalPrice)}</p></td>
                                    <td><button onClick={() => handleDeleteOrder(item.id)} className='btn btn-danger'>Xóa</button></td>
                                    </>
                                }
                                { type === 'feedback' &&
                                    <>
                                    <td><p>{item.sdt}</p></td>
                                    <td><p>{item.email}</p></td>
                                    <td><p>{item.ten}</p></td>
                                    <td><p>{item.messageDetail}</p></td>
                                    <td><button onClick={() => handleDeleteFeedback(item.id)} className='btn btn-danger'>Xóa</button></td>
                                    </>
                                }
                                {/* Nếu là Products */}
                                {type && types.includes(type) &&
                                    <>
                                    <td><p>{item.productID}</p></td>
                                    <td><p>{item.productName}</p></td>
                                    <td><p>{item.brand}</p></td>
                                    <td><p>{item.description}</p></td>
                                    <td><p>{item.discount}</p></td>
                                    <td><p>{item.price}</p></td>
                                    <td><p>{item.baoHanh}</p></td>
                                    <td><img src={item.image} alt="" className='' height={'60px'} /></td>
                                    <td><p>{item.type}</p></td>
                                    {(item.type === 'lap') &&
                                        // lap 
                                        <>
                                        <td><p>{item.cpu}</p></td> 
                                        <td><p>{item.ram}</p></td>
                                        <td><p>{item.manHinh}</p></td>
                                        <td><p>{item.pin}</p></td>
                                        <td><p>{item.heDieuHanh}</p></td>
                                        <td><p>{item.khoiLuong}</p></td>
                                        <td><p>{item.cardDoHoa}</p></td>
                                        <td><p>{item.banPhim}</p></td>
                                        <td><p>{item.mauSac}</p></td> 
                                        <td><p>{item.nhuCau}</p></td>
                                        <td><p>{item.luuTru}</p></td>
                                        <td><p>{item.phuKien}</p></td>
                                        <td><p>{item.kieuKetNoi}</p></td>
                                        <td><p>{item.hot}</p></td>
                                        </>
                                    }
                                    <td><p>{item.ngayNhap}</p></td> 
                                    <td><Link to={'../detailUpdate'} className="mx-auto" onClick={() => handleSelectProd(item.productID, item.type)}>Chi tiết</Link></td>
                                    <td><button className='btn btn-danger' onClick={() => handleConfirm(item.productID)}>Xóa</button></td>
                                    </>                                
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>

            {totalPages > 1 &&
            <div className='d-flex justify-content-center'>
            <ReactPaginate
            key={selected}
            nextLabel="next >"
            onPageChange={(e) => {handleSelectPage(e)}}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            />
            </div>
            }
            {/* Model Prod*/}
            <Modal show={show} onHide={handleClose} fullscreen={true} className='text-black modal-Add'>
                <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-12 d-flex flex-column justify-content-between mx-auto pe-0">
                        <div className="detailUpdate card p-4 col-md-12">
                            <p className='text-danger'>*Lưu ý: Nhập hết tất cả thông tin</p>
                            <p>Tên: </p>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            <p>Thương hiệu:</p>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            <p>Giá:</p>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            <p>Discount:</p>
                            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                            <p>Bảo hành:</p>
                            <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
                            <p>Hệ điều hành:</p>
                            <input type="text" value={OS} onChange={(e) => setOS(e.target.value)} />
                            <p>CPU:</p>
                            <input type="text" value={CPU} onChange={(e) => setCPU(e.target.value)} />
                            <p>RAM: </p>
                            <input type="text" value={RAM} onChange={(e) => setRAM(e.target.value)} />
                            <p>Màn hình:</p>
                            <input type="text" value={screen} onChange={(e) => setScreen(e.target.value)} />
                            <p>PIN: </p>
                            <input type="text" value={PIN} onChange={(e) => setPIN(e.target.value)} />
                            <p>Khối lượng:</p>
                            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            <p>Card Đồ họa:</p>
                            <input type="text" value={GPU} onChange={(e) => setGPU(e.target.value)} />
                            <p>Bàn phím:</p>
                            <input type="text" value={keyboard} onChange={(e) => setKeyboard(e.target.value)} />
                            <p>Màu sắc:</p>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            <p>Nhu cầu:</p>
                            <input type="text" value={demand} onChange={(e) => setDemand(e.target.value)} />
                            <p>Lưu trữ:</p>
                            <input type="text" value={storage} onChange={(e) => setStorage(e.target.value)} />
                            <p>Phụ kiện:</p>
                            <input type="text" value={accessory} onChange={(e) => setAccessory(e.target.value)} />
                            <p>Kiểu kết nối:</p>
                            <input type="text" value={connect} onChange={(e) => setConnect(e.target.value)} />
                            <p>Ngày cập nhật (năm/tháng/ngày) : </p>
                            <input type="text" value={dateUpdate} onChange={(e) => setDateUpdate(e.target.value)} />
                            <p>Sản phẩm có hot không: </p>
                            <input type="text" value={hot} onChange={(e) => setHot(e.target.value)} />
                            <p>Type: </p>
                            <input type="text" value={typeAdd} onChange={(e) => setTypeAdd(e.target.value)} />
                            <p>Link ảnh:</p>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                            <p>Mô tả sản phẩm:</p>
                            <textarea className='col-12' type="text" value={des} onChange={(e) => setDes(e.target.value)} />
                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" onClick={handleAddProd}>
                    Thêm
                </Button>
                </Modal.Footer>
            </Modal>

            

        </div>
        </div>
    </>);
}

export default admin;
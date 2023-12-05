/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux'
import { URLIDLapPC, URLupdateProd } from '../URL/url';
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function detailUpdate() {
    const [prod, setProd] = useState()
    const detail = useSelector((state) => state.prod)

    // two ways for input
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [des, setDes] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [warranty, setWarranty] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [CPU, setCPU] = useState('');
    const [RAM, setRAM] = useState('');
    const [screen, setScreen] = useState('');
    const [PIN, setPIN] = useState('');
    const [OS, setOS] = useState('');
    const [weight, setWeight] = useState('');
    const [GPU, setGPU] = useState('');
    const [keyboard, setKeyboard] = useState('');
    const [color, setColor] = useState('');
    const [demand, setDemand] = useState('');
    const [storage, setStorage] = useState('');
    const [accessory, setAccessory] = useState('');
    const [connect, setConnect] = useState('');
    const [dateUpdate, setDateUpdate] = useState('');
    const [hot, setHot] = useState('');

    useEffect(() => {
        // Kiểm tra xem prod có tồn tại không
        if (prod) {
          setName(prod.productName || '');
          setBrand(prod.brand || '');
          setDes(prod.description || '');
          setDiscount(prod.discount || '');
          setPrice(prod.price || '');
          setWarranty(prod.baoHanh || '');
          setImage(prod.image || '');
          setType(prod.type || '');
          setCPU(prod.cpu || '');
          setRAM(prod.ram || '');
          setScreen(prod.manHinh || '');
          setPIN(prod.pin || '');
          setOS(prod.heDieuHanh || '');
          setWeight(prod.khoiLuong || '');
          setGPU(prod.cardDoHoa || '');
          setKeyboard(prod.banPhim || '');
          setColor(prod.mauSac || '');
          setDemand(prod.nhuCau || '');
          setStorage(prod.luuTru || '');
          setAccessory(prod.phuKien || '');
          setConnect(prod.kieuKetNoi || '');
          setDateUpdate(prod.dateUpdate || '');
          setHot(prod.hot || '');
        }
      }, [prod]);

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

    const navigate = useNavigate();

    const handleUpdate = async (id) => {
        try {
          const response = await axiosCus.put(`${URLupdateProd}${id}`, {
            productID: id,
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
            setTimeout(() => {
                navigate('../admin')
            }, 3000);
        } catch (error) {
          // Xử lý lỗi
          console.error("Error updating product:", error);
        }
      };      

    return (
        <>

        {prod && <div className="detail mt-5">
            <div className="container-xxl">
                <div className="row">
                    <div className="img-product col-11 mx-auto col-md-4 card p-2 p-md-5">
                        <img src={prod.image} className="img-fluid" alt="" />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-between mx-auto pe-0">
                        <div className="detailUpdate card p-4 col-md-12">
                            <p className='text-danger'>*Lưu ý: Nhập hết tất cả thông tin</p>
                            <p>Tên: {prod.productName}</p>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                            <p>Thương hiệu:&nbsp;&nbsp; {prod.brand}</p>
                            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            <p>Giá: {(prod.price).toLocaleString('vi-VN')}</p>
                            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                            <p>Discount: {prod.discount}</p>
                            <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                            <p>Bảo hành: {prod.baoHanh}</p>
                            <input type="text" value={warranty} onChange={(e) => setWarranty(e.target.value)} />
                            <p>Hệ điều hành: {prod.heDieuHanh}</p>
                            <input type="text" value={OS} onChange={(e) => setOS(e.target.value)} />
                            <p>CPU: {prod.cpu}</p>
                            <input type="text" value={CPU} onChange={(e) => setCPU(e.target.value)} />
                            <p>RAM: {prod.ram}</p>
                            <input type="text" value={RAM} onChange={(e) => setRAM(e.target.value)} />
                            <p>Màn hình: {prod.manHinh}</p>
                            <input type="text" value={screen} onChange={(e) => setScreen(e.target.value)} />
                            <p>PIN: {prod.pin}</p>
                            <input type="text" value={PIN} onChange={(e) => setPIN(e.target.value)} />
                            <p>Khối lượng: {prod.khoiLuong}</p>
                            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            <p>Card Đồ họa: {prod.cardDoHoa}</p>
                            <input type="text" value={GPU} onChange={(e) => setGPU(e.target.value)} />
                            <p>Bàn phím: {prod.banPhim}</p>
                            <input type="text" value={keyboard} onChange={(e) => setKeyboard(e.target.value)} />
                            <p>Màu sắc: {prod.mauSac}</p>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            <p>Nhu cầu: {prod.nhuCau}</p>
                            <input type="text" value={demand} onChange={(e) => setDemand(e.target.value)} />
                            <p>Lưu trữ: {prod.luuTru}</p>
                            <input type="text" value={storage} onChange={(e) => setStorage(e.target.value)} />
                            <p>Phụ kiện: {prod.phuKien}</p>
                            <input type="text" value={accessory} onChange={(e) => setAccessory(e.target.value)} />
                            <p>Kiểu kết nối: {prod.kieuKetNoi}</p>
                            <input type="text" value={connect} onChange={(e) => setConnect(e.target.value)} />
                            <p>Ngày cập nhật (năm/tháng/ngày) : {prod.ngayNhap}</p>
                            <input type="text" value={dateUpdate} onChange={(e) => setDateUpdate(e.target.value)} />
                            <p>Sản phẩm có hot không: {prod.hot}</p>
                            <input type="text" value={hot} onChange={(e) => setHot(e.target.value)} />
                            <p>Type: {prod.type}</p>
                            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                            <p>Link ảnh: {prod.image}</p>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                        </div>
                    </div>
                    <div className='desDetail card col-12 mt-2 p-4'>
                        <div className="row">
                            <div className='col-12 pe-3'>
                                <h5>Mô tả sản phẩm</h5>
                                <p className="">{prod.description}</p>
                                <textarea className='col-12' type="text" value={des} onChange={(e) => setDes(e.target.value)} />
                            </div>
                            <div className="col-12 detailUpdateBtn">
                                <button className='btn btn-success' onClick={() => handleUpdate(prod.productID)}>Cập nhật</button>
                                <button className='btn btn-primary'>Trở về</button>
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

export default detailUpdate;
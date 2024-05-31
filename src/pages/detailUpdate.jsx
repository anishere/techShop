/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector } from 'react-redux'
import { URLIDCPU, URLIDKeyBoard, URLIDLapPC, URLIDMouse, URLIDRAM, URLIDTaiNghe, URLupdateProd, URLupdateProdCPU, URLupdateProdHeadPhone, URLupdateProdKeyBoard, URLupdateProdMouse, URLupdateProdRAM } from '../URL/url';
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

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
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [type, setType] = useState('');
    //Lap
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
    const [hot, setHot] = useState('');
    //cpu
    const [socKet,setSocKet] = useState('')
    const [soNhan, setSoNhan] = useState('')
    const [soLuong, setSoLuong] = useState('')
    const [kienTruc, setKienTruc] = useState('')
    const [tocDo, setTocDo] = useState('')
    const [cache, setCache] = useState('')
    const [chipDoHoa, setChipDoHoa] = useState('')
    const [tdp, setTdp] = useState('')
    const [boNhoHoTro, setboNhoHoTro] = useState('') 
    //keyboard
    const [switchKB, setSwitchKB] = useState('')
    const [kieuKetNoi, setKieuKetNoi] = useState('')
    const [denLed, setDenLed] = useState('')
    const [keTay, setKeTay] = useState('')
    const [kichThuoc, setKichThuoc] = useState('')
    //mouse
    const [kieuCam, setKieuCam] = useState('')
    const [soNutBam, setSoNutBam] = useState('')
    const [doPhanGiai, setDoPhanGiai] = useState('')
    const [dangCamBien, setDangCamBien] = useState('') 
    const [doNhay, setDoNhay] = useState('')
    //RAM
    const [theHe, setTheHe] = useState('')
    const [bus, setBus] = useState('')
    const [loaiHang, setLoaiHang] = useState('')
    const [partNumber, setPartNumber] = useState('')
    const [vol, setVol] = useState('')
    const [dungLuong, setDungLuong] = useState('')
    //HeadPhone
    const [tanSo, setTanSo] = useState('')
    const [microphone, setMicrophone] = useState('')

    const [dateUpdate, setDateUpdate] = useState('');
    
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
            setImage2(prod.image2 || '');
            setImage3(prod.image3 || '');
            setImage4(prod.image4 || '');
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
            setHot(prod.hot || '');
    
            setDateUpdate(prod.dateUpdate || '');
    
            // CPU
            setSocKet(prod.socKet || '');
            setSoNhan(prod.soNhan || '');
            setSoLuong(prod.soLuong || '');
            setKienTruc(prod.kienTruc || '');
            setTocDo(prod.tocDo || '');
            setCache(prod.cache || '');
            setChipDoHoa(prod.chipDoHoa || '');
            setTdp(prod.tdp || '');
            setboNhoHoTro(prod.boNhoHoTro || '');
    
            // Keyboard
            setSwitchKB(prod.switch || '');
            setKieuKetNoi(prod.kieuKetNoi || '');
            setDenLed(prod.denLed || '');
            setKeTay(prod.keTay || '');
            setKichThuoc(prod.kichThuoc || '');
    
            // Mouse
            setKieuCam(prod.kieuCam || '');
            setSoNutBam(prod.soNutBam || '');
            setDoPhanGiai(prod.doPhanGiai || '');
            setDangCamBien(prod.dangCamBien || '');
            setDoNhay(prod.doNhay || '');
    
            // RAM
            setTheHe(prod.theHe || '');
            setBus(prod.bus || '');
            setLoaiHang(prod.loaiHang || '');
            setPartNumber(prod.partNumber || '');
            setVol(prod.vol || '');
            setDungLuong(prod.dungLuong || '');
    
            // HeadPhone
            setTanSo(prod.tanSo || '');
            setMicrophone(prod.microphone || '');
        }
    }, [prod]);    

    useEffect(() => {
        
            const fetchData = async () => {
                try {
                    if(detail.type === 'lap' || detail.type === 'pc') {
                        const res = await axiosCus.get(`${URLIDLapPC}${detail.id}`);
                        setProd(res.listproducts[0])
                    } else if (detail.type === 'cpu') {
                        const res = await axiosCus.get(`${URLIDCPU}${detail.id}`);
                        setProd(res.listcpu[0])
                    } else if (detail.type === 'keyboard') {
                        const res = await axiosCus.get(`${URLIDKeyBoard}${detail.id}`);
                        setProd(res.listKeyBoard[0])
                    } else if (detail.type === 'mouse') {
                        const res = await axiosCus.get(`${URLIDMouse}${detail.id}`);
                        setProd(res.listMouse[0])
                    } else if (detail.type === 'ram') {
                        const res = await axiosCus.get(`${URLIDRAM}${detail.id}`);
                        setProd(res.listram[0])
                    } else if (detail.type === 'headphone') {
                        const res = await axiosCus.get(`${URLIDTaiNghe}${detail.id}`);
                        setProd(res.listTaiNghe[0])
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            fetchData();
    },[])

    const navigate = useNavigate();

    const handleUpdate = async (id) => {
        try {
        if(prod.type === 'lap') {
          const response = await axiosCus.put(`${URLupdateProd}${id}`, {
            productID: id,
            productName: name,
            description: des,
            brand: brand,
            discount: discount,
            price: price,
            image: image,
            image2: image2,
            image3: image3,
            image4: image4,
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
            }, 1000);
        } else if (prod.type === 'cpu') {
            const response = await axiosCus.put(`${URLupdateProdCPU}${id}`, {
                productID: id,
                productName: name,
                description: des,
                brand: brand,
                discount: discount,
                price: price,
                image: image,
                image2: image2,
                image3: image3,
                image4: image4,
                type: type,
                baoHanh: warranty,
                socKet: socKet,
                soNhan: soNhan,
                soLuong: soLuong,
                kienTruc: kienTruc,
                tocDo: tocDo,
                cache: cache,
                chipDoHoa: chipDoHoa,
                tdp: tdp,
                boNhoHoTro: boNhoHoTro,
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
                }, 1000);
        } else if (prod.type === 'keyboard') {
            const response = await axiosCus.put(`${URLupdateProdKeyBoard}${id}`, {
                productID: id,
                productName: name,
                description: des,
                brand: brand,
                discount: discount,
                price: price,
                image: image,
                image2: image2,
                image3: image3,
                image4: image4,
                type: type,
                baoHanh: warranty,
                switch: switchKB,
                mauSac: color,
                kieuKetNoi: kieuKetNoi,
                denLed: denLed,
                keTay: keTay,
                kichThuoc: kichThuoc,
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
                }, 1000);
        } else if (prod.type === 'mouse') {
            const response = await axiosCus.put(`${URLupdateProdMouse}${id}`, {
                productID: id,
                productName: name,
                description: des,
                brand: brand,
                discount: discount,
                price: price,
                image: image,
                image2: image2,
                image3: image3,
                image4: image4,
                type: type,
                baoHanh: warranty,
                mauSac: color,
                kieuKetNoi: kieuKetNoi,
                nhuCau: demand,
                kieuCam: kieuCam,
                soNutBam: soNutBam,
                denLed: denLed,
                kichThuoc: kichThuoc,
                khoiLuong: weight,
                doPhanGiai: doPhanGiai,
                dangCamBien: dangCamBien,
                doNhay: doNhay,
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
                }, 1000);
        } else if (prod.type === 'ram') {
            const response = await axiosCus.put(`${URLupdateProdRAM}${id}`, {
                productID: id,
                productName: name,
                description: des,
                brand: brand,
                discount: discount,
                price: price,
                image: image,
                image2: image2,
                image3: image3,
                image4: image4,
                type: type,
                baoHanh: warranty,
                mauSac: color,
                theHe: theHe,
                bus: bus,
                denLed: denLed,
                loaiHang: loaiHang,
                partNumber: partNumber,
                nhuCau: demand,
                dungLuong: dungLuong,
                vol: vol,
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
                }, 1000);
        } else if (prod.type === 'headphone') {
            const response = await axiosCus.put(`${URLupdateProdHeadPhone}${id}`, {
                productID: id,
                productName: name,
                description: des,
                brand: brand,
                discount: discount,
                price: price,
                image: image,
                image2: image2,
                image3: image3,
                image4: image4,
                type: type,
                baoHanh: warranty,
                tanSo: tanSo,
                ketNoi: connect,
                kieuKetNoi: kieuKetNoi,
                mauSac: color,
                denLed: denLed,
                microphone: microphone,
                khoiLuong: weight,
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
                }, 1000);
        }
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
                        <img src={prod.image2} className="img-fluid" alt="" />
                        <img src={prod.image3} className="img-fluid" alt="" />
                        <img src={prod.image4} className="img-fluid" alt="" />
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
                            {prod.type === 'lap' &&
                            <>
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
                            <p>Sản phẩm có hot không: {prod.hot}</p>
                            <input type="text" value={hot} onChange={(e) => setHot(e.target.value)} />
                            </>
                            }
                            {prod.type === 'cpu' &&
                            <>
                            <p>Socket: </p>
                            <input type="text" value={socKet} onChange={(e) => setSocKet(e.target.value)} />
                            <p>Số nhân xử lý: </p>
                            <input type="text" value={soNhan} onChange={(e) => setSoNhan(e.target.value)} />
                            <p>Số luồng xử lý: </p>
                            <input type="text" value={soLuong} onChange={(e) => setSoLuong(e.target.value)} />
                            <p>Kiến trúc: </p>
                            <input type="text" value={kienTruc} onChange={(e) => setKienTruc(e.target.value)} />
                            <p>Tốc độ: </p>
                            <input type="text" value={tocDo} onChange={(e) => setTocDo(e.target.value)} />
                            <p>Cache: </p>
                            <input type="text" value={cache} onChange={(e) => setCache(e.target.value)} />
                            <p>Chip đồ họa: </p>
                            <input type="text" value={chipDoHoa} onChange={(e) => setChipDoHoa(e.target.value)} />
                            <p>TPD: </p>
                            <input type="text" value={tdp} onChange={(e) => setTdp(e.target.value)} />
                            <p>Bộ nhớ hỗ trợ: </p>
                            <input type="text" value={boNhoHoTro} onChange={(e) => setboNhoHoTro(e.target.value)} />
                            </>
                            }
                            {prod.type === 'keyboard' &&
                            <>
                            <p>Switch: </p>
                            <input type="text" value={switchKB} onChange={(e) => setSwitchKB(e.target.value)} />
                            <p>Màu sắc: </p>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            <p>Kiểu kết nối: </p>
                            <input type="text" value={kieuKetNoi} onChange={(e) => setKieuKetNoi(e.target.value)} />
                            <p>Đèn LED: </p>
                            <input type="text" value={denLed} onChange={(e) => setDenLed(e.target.value)} />
                            <p>Kê tay: </p>
                            <input type="text" value={keTay} onChange={(e) => setKeTay(e.target.value)} />
                            <p>Kích thước: </p>
                            <input type="text" value={kichThuoc} onChange={(e) => setKichThuoc(e.target.value)} />
                            </>
                            }
                            {prod.type === 'mouse' &&
                            <>
                            <p>Màu sắc: </p>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            <p>Kiểu kết nối: </p>
                            <input type="text" value={kieuKetNoi} onChange={(e) => setKieuKetNoi(e.target.value)} />
                            <p>Nhu cầu: </p>
                            <input type="text" value={demand} onChange={(e) => setDemand(e.target.value)} />
                            <p>Kiểu cầm: </p>
                            <input type="text" value={kieuCam} onChange={(e) => setKieuCam(e.target.value)} />
                            <p>Số nút bấm: </p>
                            <input type="text" value={soNutBam} onChange={(e) => setSoNutBam(e.target.value)} />
                            <p>Đèn LED: </p>
                            <input type="text" value={denLed} onChange={(e) => setDenLed(e.target.value)} />
                            <p>Kích thước: </p>
                            <input type="text" value={kichThuoc} onChange={(e) => setKichThuoc(e.target.value)} />
                            <p>Khối lượng: </p>
                            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            <p>Độ phân giải: </p>
                            <input type="text" value={doPhanGiai} onChange={(e) => setDoPhanGiai(e.target.value)} />
                            <p>Dạng cảm biến: </p>
                            <input type="text" value={dangCamBien} onChange={(e) => setDangCamBien(e.target.value)} />
                            <p>Độ nhạy: </p>
                            <input type="text" value={doNhay} onChange={(e) => setDoNhay(e.target.value)} />
                            </>
                            }
                            {prod.type === 'ram' &&
                            <>
                            <p>Màu sắc: </p>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            <p>Thế hệ: </p>
                            <input type="text" value={theHe} onChange={(e) => setTheHe(e.target.value)} />
                            <p>Bus: </p>
                            <input type="text" value={bus} onChange={(e) => setBus(e.target.value)} />
                            <p>Đèn LED: </p>
                            <input type="text" value={denLed} onChange={(e) => setDenLed(e.target.value)} />
                            <p>Loại hàng: </p>
                            <input type="text" value={loaiHang} onChange={(e) => setLoaiHang(e.target.value)} />
                            <p>Part-Number: </p>
                            <input type="text" value={partNumber} onChange={(e) => setPartNumber(e.target.value)} />
                            <p>Nhu cầu: </p>
                            <input type="text" value={demand} onChange={(e) => setDemand(e.target.value)} />
                            <p>Dung lượng: </p>
                            <input type="text" value={dungLuong} onChange={(e) => setDungLuong(e.target.value)} />
                            <p>Voltage: </p>
                            <input type="text" value={vol} onChange={(e) => setVol(e.target.value)} />
                            </>
                            }
                            {prod.type === 'headphone' &&
                            <>
                            <p>Tần số: </p>
                            <input type="text" value={tanSo} onChange={(e) => setTanSo(e.target.value)} />
                            <p>Kết nối: </p>
                            <input type="text" value={connect} onChange={(e) => setConnect(e.target.value)} />
                            <p>Kiểu kết nối: </p>
                            <input type="text" value={kieuKetNoi} onChange={(e) => setKieuKetNoi(e.target.value)} />
                            <p>Màu sắc: </p>
                            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} />
                            <p>Đèn LED: </p>
                            <input type="text" value={denLed} onChange={(e) => setDenLed(e.target.value)} />
                            <p>Microphone: </p>
                            <input type="text" value={microphone} onChange={(e) => setMicrophone(e.target.value)} />
                            <p>Khối lượng: </p>
                            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </>
                            }
                            <p>Ngày cập nhật (năm/tháng/ngày) : {prod.ngayNhap}</p>
                            <input type="text" value={dateUpdate} onChange={(e) => setDateUpdate(e.target.value)} />
                            <p>Type: {prod.type}</p>
                            <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                            <p>Link ảnh: {prod.image}</p>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                            <p>Link ảnh 2: {prod.image2}</p>
                            <input type="text" value={image2} onChange={(e) => setImage2(e.target.value)} />
                            <p>Link ảnh 3: {prod.image3}</p>
                            <input type="text" value={image3} onChange={(e) => setImage3(e.target.value)} />
                            <p>Link ảnh 4: {prod.image4}</p>
                            <input type="text" value={image4} onChange={(e) => setImage4(e.target.value)} />
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
                                <button className='btn btn-primary me-2'><Link className='text-white' to={'../admin'}>Trở về</Link></button>
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
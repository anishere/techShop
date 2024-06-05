/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Table from 'react-bootstrap/Table';
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { URLAddBlog, URLBlog, URLCPU, URLDeleteAccount, URLDeleteBlog, URLGetAllAccounts, URLKeyBoard, URLLap, URLMouse, URLRAM, URLTaiNghe, URLUpdateBlogs, URLaddProd, URLaddProdCPU, URLaddProdHeadPhone, URLaddProdKeyBoard, URLaddProdMouse, URLaddProdRAM, URLchangePass, URLdeleteFeedback, URLdeleteOrder, URLdeleteProd, URLdeleteProdCPU, URLdeleteProdHeadPhone, URLdeleteProdKeyBoard, URLdeleteProdMouse, URLdeleteProdRAM, URLsearch, URLsearchCPU, URLsearchHeadPhone, URLsearchKeyBoard, URLsearchMouse, URLsearchRAM, URLupdateAbout, URLupdateInfoShop } from '.././URL/url'
import { infoShop, about, allOrders, feedBack } from '.././URL/url';
import ReactPaginate from 'react-paginate';
import { UpInfoProd } from '../redux/detailSlice';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { URLtotalProd, URLtotalProdCPU, URLtotalProdKeyBoard, URLtotalProdMouse, URLtotalProdRAM, URLtotalProdHeadPhone } from "../URL/url";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux'
import { searchProd } from '../redux/searchSlice';
import { IoSearch } from 'react-icons/io5';

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
        //const isUser = localStorage.getItem('isUser') === 'true';
        if(isLoggedIn !== true){
            if(isAuth === false)
                navigate('../login')
        }
    }, []) 

    const handleSelectURL = (URL, type) => {
        setSearch('')
        setURL(URL)
        setType(type)
        setSelected(!selected)
    }

    const types = [
        'lap',
        'cpu',
        'mouse',
        'keyboard',
        'ram',
        'headphone',
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
                else if (type === 'allOrders')
                {
                    setListRes(res.listorders)
                    setTotalProds(0)
                }    
                else if (type === 'feedback')
                {
                    setListRes(res.listMessage)
                    setTotalProds(0)
                }   
                else if (type === 'accounts')
                {
                    setListRes(res.listaccounts)
                    // let total = await axiosCus.get(URLtotalProd)
                    // setTotalProds(total.totalCount)
                }  
                else if (type === 'blogs')
                    {
                        setListRes(res.listBlogs)
                        // let total = await axiosCus.get(URLtotalProd)
                        // setTotalProds(total.totalCount)
                    }         
                else if (type === 'lap' || type === 'pc')
                {
                    setListRes(res.listproducts)
                    let total = await axiosCus.get(URLtotalProd)
                    setTotalProds(total.totalCount)
                }    
                else if (type === 'cpu')
                {
                    console.log(res.listcpu)
                    setListRes(res.listcpu)
                    let total = await axiosCus.get(URLtotalProdCPU)
                    setTotalProds(total.totalCount)
                } 
                else if (type === 'keyboard')
                {
                    setListRes(res.listKeyBoard)
                    let total = await axiosCus.get(URLtotalProdKeyBoard)
                    setTotalProds(total.totalCount)
                } 
                else if (type === 'mouse')
                {
                    setListRes(res.listMouse)
                    let total = await axiosCus.get(URLtotalProdMouse)
                    setTotalProds(total.totalCount)
                }
                else if (type === 'ram')
                {
                    setListRes(res.listram)
                    let total = await axiosCus.get(URLtotalProdRAM)
                    setTotalProds(total.totalCount)
                }
                else if (type === 'headphone')
                {
                    setListRes(res.listTaiNghe)
                    let total = await axiosCus.get(URLtotalProdHeadPhone)
                    setTotalProds(total.totalCount)
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [URL, type]);

    const handleSelectPage = (e) => {
        if(type === 'lap' || type === 'pc') {
            if(searchName === ''){
                setURL(`ProductsPCLap/GetLaptops?page=${e.selected+1}&pageSize=20`)
            } else {
                setURL(`ProductsPCLap/SearchProducts?keyword=${searchName}&page=${e.selected+1}&pageSize=20`)
            }
        } else if (type === 'cpu') {
            if(searchName === ''){
                setURL(`ProductsCPU/ListCPU?page=${e.selected+1}&pageSize=20`)
            } else {
                setURL(`ProductsCPU/SearchCPUs?keyword=${searchName}&page=${e.selected+1}&pageSize=20`)
            }
        } else if (type === 'keyboard') {
            if(searchName === ''){
                setURL(`ProductsKeyBoard/ListKeyBoard?page=${e.selected+1}&pageSize=20`)
            } else {
                setURL(`ProductsKeyBoard/SearchKeyboards?keyword=${searchName}&page=${e.selected+1}&pageSize=20`)
            }
        } else if (type === 'mouse') {
            if(searchName === ''){
                setURL(`ProductsMouse/ListMouse?page=${e.selected+1}&pageSize=20`)
            } else {
                setURL(`ProductsMouse/SearchMouse?keyword=${searchName}&page=${e.selected+1}&pageSize=20`)
            }
        } else if (type === 'ram') {
            if(searchName === ''){
                setURL(`ProductsRAM/ListRAM?page=${e.selected+1}&pageSize=20`)
            } else {
                setURL(`ProductsRAM/SearchRAM?keyword=${searchName}&page=${e.selected+1}&pageSize=20`)
            }
        } else if (type === 'headphone') {
            if(searchName === ''){
                setURL(`ProductsTaiNghe/ListTaiNghe?page=${e.selected+1}&pageSize=20`)
            } else {
                setURL(`ProductsTaiNghe/SearchTaiNghe?keyword=${searchName}&page=${e.selected+1}&pageSize=20`)
            }
        }
    }

    const handleSelectProd = (id, type) => {
        dispatch(UpInfoProd({id, type}))
    }

    //model Add Prod
    const [show, setShow] = useState(false);
    // two ways for input update
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [des, setDes] = useState()
    const [discount, setDiscount] = useState()
    const [price, setPrice] = useState()
    const [warranty, setWarranty] = useState()
    const [image, setImage] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [typeAdd, setTypeAdd] = useState()
    //lap
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
    //cpu
    const [socKet,setSocKet] = useState()
    const [soNhan, setSoNhan] = useState()
    const [soLuong, setSoLuong] = useState()
    const [kienTruc, setKienTruc] = useState()
    const [tocDo, setTocDo] = useState()
    const [cache, setCache] = useState()
    const [chipDoHoa, setChipDoHoa] = useState()
    const [tdp, setTdp] = useState()
    const [boNhoHoTro, setboNhoHoTro] = useState() 
    //keyboard
    const [switchKB, setSwitchKB] = useState()
    const [kieuKetNoi, setKieuKetNoi] = useState()
    const [denLed, setDenLed] = useState()
    const [keTay, setKeTay] = useState()
    const [kichThuoc, setKichThuoc] = useState()
    //mouse
    const [kieuCam, setKieuCam] = useState()
    const [soNutBam, setSoNutBam] = useState()
    const [doPhanGiai, setDoPhanGiai] = useState()
    const [dangCamBien, setDangCamBien] = useState() 
    const [doNhay, setDoNhay] = useState()
    //RAM
    const [theHe, setTheHe] = useState()
    const [bus, setBus] = useState()
    const [loaiHang, setLoaiHang] = useState()
    const [partNumber, setPartNumber] = useState()
    const [vol, setVol] = useState()
    //HeadPhone
    const [tanSo, setTanSo] = useState()
    const [microphone, setMicrophone] = useState()
    //Blog
    const [tenBlog, setTenBlog] = useState();
    const [imageBlog, setImageBlog] = useState();
    const [noiDungBlog, setNoiDungBlog] = useState();
    const [nguoiViet, setNguoiViet] = useState();
    const [ngayViet, setNgayViet] = useState();

    const [dateUpdate, setDateUpdate] = useState()
    const [hot, setHot] = useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddProd = async () => {
        try {
        if(type === 'lap') {
          const response = await axiosCus.post(`${URLaddProd}`, {
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
            handleClose()
            location.reload();
            }
            else if (type === 'cpu') {
                const response = await axiosCus.post(`${URLaddProdCPU}`, {
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
                    handleClose()
                    location.reload();
            }
            else if (type === 'keyboard') {
                const response = await axiosCus.post(`${URLaddProdKeyBoard}`, {
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
                    handleClose()
                    location.reload();
            }
            else if (type === 'mouse') {
                const response = await axiosCus.post(`${URLaddProdMouse}`, {
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
                    handleClose()
                    location.reload();
            }
            else if (type === 'ram') {
                const response = await axiosCus.post(`${URLaddProdRAM}`, {
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
                    dungLuong: storage,
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
                    handleClose()
                    location.reload();
            }
            else if (type === 'headphone') {
                const response = await axiosCus.post(`${URLaddProdHeadPhone}`, {
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
                    handleClose()
                    location.reload();
            }
        } catch (error) {
          // Xử lý lỗi
          console.error("Error updating product:", error);
        }
      };   

    const handleDeleteProduct = async (id) => {
        try {
            if(type === 'lap') {
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
            } else if (type === 'cpu') {
                const response = await axiosCus.delete(`${URLdeleteProdCPU}${id}`);
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
            } else if (type === 'keyboard') {
                const response = await axiosCus.delete(`${URLdeleteProdKeyBoard}${id}`);
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
            } else if (type === 'mouse') {
                const response = await axiosCus.delete(`${URLdeleteProdMouse}${id}`);
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
            } else if (type === 'ram') {
                const response = await axiosCus.delete(`${URLdeleteProdRAM}${id}`);
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
            } else if (type === 'headphone') {
                const response = await axiosCus.delete(`${URLdeleteProdHeadPhone}${id}`);
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
            }
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
    const [addressShop, setAddressShop] = useState();
    const [logoShop, setLogoShop] = useState();
    const [mapShop, setMapShop] = useState();
    useEffect(() => {
        // Kiểm tra xem prod có tồn tại không
        if (listRes && type === 'infoShop') {
            const prod = listRes[0];
            setSDTshop(prod.sdt || '');
            setAddressShop(prod.address || '');
            setLogoShop(prod.logo || '');
            setMapShop(prod.map || '');
        }
      }, [listRes]);

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
    useEffect(() => {
        // Kiểm tra xem prod có tồn tại không
        if (listRes && type === "about") {
            const prod = listRes[0];
            setAbout1(prod.about1 || '');
            setAbout2(prod.about2 || '');
        }
      }, [listRes]);

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
        localStorage.removeItem('isUser');
        window.location.reload();
    }

    const formatNumber = (number) => parseFloat(number).toLocaleString('vi-VN');

    //Search
    const [search, setSearch] = useState()
    const listenSearch = (e) => {
        if (e.keyCode === 13) {
            dispatch(searchProd(e.target.value))
        } 
    }
    const handleSearch = () => {
        dispatch(searchProd(search))
    }
    const searchName = useSelector((state) => state.search.search)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(type === 'lap') {
                    const res = await axiosCus.get(`${URLsearch}${searchName}`);
                    setListRes(res.listproducts)
                    setTotalProds(res.totalCount)
                } else if (type === 'cpu') {
                    const res = await axiosCus.get(`${URLsearchCPU}${searchName}`);
                    setListRes(res.listcpu)
                    setTotalProds(res.totalCount)
                } else if (type === 'keyboard') {
                    const res = await axiosCus.get(`${URLsearchKeyBoard}${searchName}`);
                    setListRes(res.listKeyBoard)
                    setTotalProds(res.totalCount)
                } else if (type === 'mouse') {
                    const res = await axiosCus.get(`${URLsearchMouse}${searchName}`);
                    setListRes(res.listMouse)
                    setTotalProds(res.totalCount)
                } else if (type === 'ram') {
                    const res = await axiosCus.get(`${URLsearchRAM}${searchName}`);
                    setListRes(res.listram)
                    setTotalProds(res.totalCount)
                } else if (type === 'headphone') {
                    const res = await axiosCus.get(`${URLsearchHeadPhone}${searchName}`);
                    setListRes(res.listTaiNghe)
                    setTotalProds(res.totalCount)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [searchName])

    const handleDeleteAccount = async (id) => {
        if(confirm('Sau khi xóa sẽ không thể khôi phục bạn chắc chứ')) {
            try {
                const response = await axiosCus.delete(`${URLDeleteAccount}${id}`);
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

    const [IdUser, setIdUser] = useState(null);
    const handleEditPermission = async (id) => {
        setIdUser(id);
        handleShowPermission();
    }
    const [permission, setPermission] = useState('');
    const [showEditPermission, setShowEditPermission] = useState(false);
    const handleClosePermission = () => setShowEditPermission(false);
    const handleShowPermission = () => setShowEditPermission(true);
    const submit2 = async () => {
        try {
            const response = await axiosCus.put(`Account/UpdateRole?idTaiKhoan=${IdUser}&newRole=${permission}`);
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(`Account/UpdateRole?idTaiKhoan=${IdUser}&newRole=${permission}`)
            console.log(response.statusCode);
            if(response.statusCode === 200) {
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
            }
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
        handleClosePermission();
    };


    const [showStatusOrder, setShowStatusOrder] = useState(false);
    const handleCloseStatusOrder = () => setShowStatusOrder(false);
    const handleShowStatusOrder = () => setShowStatusOrder(true)
    const [statusOrder, setStatusOrder] = useState('')
    const [orderId, setOrderId] = useState(null); 

    const handleUpdateOrder = (id) => {
        setOrderId(id);
        handleShowStatusOrder();
    };

    const submit = async () => {
        try {
            const response = await axiosCus.post(`Order/UpdateOrderStatus?orderId=${orderId}&newStatus=${statusOrder}`);
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(`Order/UpdateOrderStatus?orderId=${orderId}&newStatus=${statusOrder}`)
            if (response.statusCode === 200) {
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
            } else {
                toast.error(response.statusMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
            toast.error("An error occurred while updating the order.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        handleCloseStatusOrder();
    };

    const handleAddBlog = async () => {
        try {
            const response = await axiosCus.post(URLAddBlog, {
                tenBlog: tenBlog,
                detail: noiDungBlog,
                image: imageBlog,
                nguoiViet: nguoiViet,
                ngayViet: new Date(ngayViet).toISOString(),
            });
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response.statusCode);
            if(response.statusCode === 200) {
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
            }
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }

    const handleDeleteBlog = async (id) => {
        if(confirm('Sau khi xóa sẽ không thể khôi phục bạn chắc chứ')) {
            try {
                const response = await axiosCus.delete(`${URLDeleteBlog}${id}`);
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

    const [showBlogForm, setShowBlogForm] = useState(false);
    const handleCloseBlogForm = () => setShowBlogForm(false);
    const handleShowBlogForm = () => setShowBlogForm(true);
    const [editBlog, setEditBlog] = useState(false);
    const [idBlog, setIdBlog] = useState(null);
    const handleEditBlog = (id) => {
        setEditBlog(!editBlog);
        setIdBlog(id);
        handleShowBlogForm();
    }

    const submitBlog = async () => {
        try {
            const response = await axiosCus.put(URLUpdateBlogs, {
                id: idBlog,
                tenBlog: tenBlog,
                detail: noiDungBlog,
                image: imageBlog,
                nguoiViet: nguoiViet,
                ngayViet: new Date(ngayViet).toISOString(),
            });
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response)
            if (response.statusCode === 200) {
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
            } else {
                toast.error(response.statusMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
            toast.error("An error occurred while updating the order.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
        handleCloseBlogForm();
    }

    useEffect(() => {
        // Kiểm tra xem prod có tồn tại không
        if (listRes && type === 'blogs') {
            const blog = listRes.find(blog => blog.id === idBlog)
            if(blog && editBlog === true) {
            setTenBlog(blog.tenBlog || '');
            setNoiDungBlog(blog.detail || '');
            setImageBlog(blog.image || '');
            setNguoiViet(blog.nguoiViet || '');
            setNgayViet(blog.ngayViet || '');
            }
        }
      }, [listRes, type, idBlog]);

    return (<>
        <div className="container-fluid mb-5">
        <div className=''>
        <div className="admin-button mb-5">
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(infoShop, 'infoShop')}>Thông tin shop</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(about,'about')}>Trang giới thiệu</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(allOrders,'allOrders')}>Thông tin đặt hàng</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLGetAllAccounts,'accounts')}>Quản lý tài khoản</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLBlog,'blogs')}>Quản lý Blogs</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(feedBack,'feedback')}>FeedBack</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLLap,'lap')}>LapTop</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLCPU,'cpu')}>CPU</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLMouse,'mouse')}>Mouse</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLKeyBoard,'keyboard')}>KeyBoard</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLRAM,'ram')}>RAM</button>
                <button className='btn btn-primary mx-1' onClick={() => handleSelectURL(URLTaiNghe,'headphone')}>Tai Nghe</button>
        </div>

        <div className="admin-table">
            { types.includes(type) &&
            <>
            <span>Tổng sản phẩm: {totalProds}</span> 
            </>              
            }
            <span className='mx-2 text-capitalize'>Type: {type}</span>

            <Button variant="primary" onClick={handleShow}>
                {type === 'blogs' ? "Viết blog" : "Thêm sản phẩm"}
            </Button>

            {/* <button onClick={() => setShowPass(true)} className='btn btn-primary mx-4'>Thay đổi mật khẩu</button> */}
            <button onClick={() => handleLogout()} className='btn ms-2 btn-warning' >Đăng xuất</button>
            <div className="d-flex col-4 my-2" >
                <input value={search} onKeyDown={(e) => listenSearch(e)} onChange={(e) => setSearch(e.target.value)} className="form-control my-auto me-2" placeholder="Tìm kiếm"/>
                <button onClick={() => handleSearch()} className="btn my-auto btn-outline-success" type=""><IoSearch /></button>
            </div>

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
                        { type === 'allOrders' &&
                            <>
                            <th>ID</th>
                            <th>SĐT</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th>Email</th>
                            <th>Note</th>
                            <th>Đơn hàng</th>
                            <th>Tổng tiền</th>
                            <th>Mã thanh toán</th>
                            <th>Trạng thái</th>
                            <th>Cập nhật</th>
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
                        { type === 'accounts' &&
                            <>
                            <th>ID Tài khoản</th>
                            <th>Tên tài khoản</th>
                            <th>Mật khẩu</th>
                            <th>Email</th>
                            <th>SDT</th>
                            <th>Link avatar</th>
                            <th>Quyền</th>
                            <th>Phân quyền</th>
                            <th>Xóa</th>
                            </>
                        }
                        { type === 'blogs' &&
                            <>
                            <th>ID</th>
                            <th>Tên Blog</th>
                            <th>Hình ảnh</th>
                            <th>Nội dung</th>
                            <th>Người viết</th>
                            <th>Ngày Viết</th>
                            <th>Sửa</th>
                            <th>Xóa</th>
                            </>
                        }
                        {/* Cột chung của products */}
                        { types.includes(type) &&
                        (<>
                            <th>Mã SP</th>
                            <th>Tên SP</th>
                            <th>Brand</th>
                            <th>Giảm giá</th>
                            <th>Giá</th>
                            <th>Bảo hành</th>
                            <th>Ảnh</th>
                            <th>Ảnh 2</th>
                            <th>Ảnh 3</th>
                            <th>Ảnh 4</th>
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
                            {
                                (type === 'cpu') &&
                                <>
                                <th>Socket</th>
                                <th>Số nhân xử lý</th>
                                <th>Số luồng xử lý</th>
                                <th>Kiến trúc</th>
                                <th>Tốc độ</th>
                                <th>Cache</th>
                                <th>Chip đồ họa</th>
                                <th>TDP</th>
                                <th>Bộ nhớ hỗ trợ</th>
                                </>
                            }
                            {(type === 'keyboard') &&
                                <>
                                <th>Switch</th>
                                <th>Màu sắc</th>
                                <th>Kiểu kết nối</th>
                                <th>Đèn LED</th>
                                <th>Kê tay</th>
                                <th>Kích thước</th>
                                </>
                            }
                            {(type === 'mouse') &&
                                <>
                                <th>Màu sắc</th>
                                <th>Kiểu kết nối</th>
                                <th>Nhu cầu</th>
                                <th>Kiểu cầm</th>
                                <th>Số nút bấm</th>
                                <th>Đèn LED</th>
                                <th>Kích thước</th>
                                <th>Khối lượng</th>
                                <th>Độ phân giải</th>
                                <th>Dạng cảm biến</th>
                                <th>Độ nhạy</th>
                                </>
                            }
                            {(type === 'ram') &&
                                <>
                                <th>Màu sắc</th>
                                <th>Thế hệ</th>
                                <th>Bus</th>
                                <th>Đèn LED</th>
                                <th>Loại hàng</th>
                                <th>Part-Number</th>
                                <th>Nhu cầu</th>
                                <th>Dung lượng</th>
                                <th>Voltage</th>
                                </>
                            }
                            {(type === 'headphone') &&
                                <>
                                <th>Tần số</th>
                                <th>Kết nối</th>
                                <th>Kiểu kết nối</th>
                                <th>Màu sắc</th>
                                <th>Đèn LED</th>
                                <th>Microphone</th>
                                <th>Khối lượng</th>
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
                                                <input type="text" value={addressShop} onChange={(e) => setAddressShop(e.target.value)} />
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
                                                <textarea type="text" value={about1} onChange={(e) => setAbout1(e.target.value)} />
                                                <p>Giới thiệu 2: {item.about2}</p>
                                                <textarea type="text" value={about2} onChange={(e) => setAbout2(e.target.value)} />
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
                                { type === 'allOrders' &&
                                    <>
                                    <td><p>{item.id}</p></td>
                                    <td><p>{item.phoneNumber}</p></td>
                                    <td><p>{item.name}</p></td>
                                    <td><p>{item.address}</p></td>
                                    <td><p>{item.email}</p></td>
                                    <td><p>{item.note}</p></td>
                                    <td>                         
                                        <p>{item.listCart}</p>
                                    </td>
                                    <td><p>{formatNumber(item.totalPrice)}</p></td>
                                    <td><p>{item.codePayment}</p></td>
                                    <td><p>{item.status}</p></td>
                                    <td><button onClick={() => handleUpdateOrder(item.id)} className='btn btn-primary'>Edit</button></td>
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
                                { type === 'accounts' &&
                                    <>
                                    <td><p>{item.idTaiKhoan}</p></td>
                                    <td><p>{item.userName}</p></td>
                                    <td><p>{item.password}</p></td>
                                    <td><p>{item.email}</p></td>
                                    <td><p>{item.sdt}</p></td>
                                    <td><img src={item.image} alt="1" className='rounded-circle' height={'60px'} /></td>
                                    <td><p>{item.phanQuyen}</p></td>
                                    <td><button onClick={() => handleEditPermission(item.idTaiKhoan)} className='btn btn-danger'>Chỉnh</button></td>
                                    <td><button onClick={() => handleDeleteAccount(item.idTaiKhoan)} className='btn btn-danger'>Xóa</button></td>
                                                {/* Modal edit permission */}
                                    </>
                                }
                                {type === 'blogs' &&
                                    <>
                                    <td><p>{item.id}</p></td>
                                    <td><p>{item.tenBlog}</p></td>
                                    <td><p>{item.image}</p></td>
                                    <td><p>{item.detail}</p></td>
                                    <td><p>{item.nguoiViet}</p></td>
                                    <td><p>{item.ngayViet}</p></td>
                                    <td><button onClick={() => handleEditBlog(item.id)} className='btn btn-danger'>Chỉnh</button></td>
                                    <td><button onClick={() => handleDeleteBlog(item.id)} className='btn btn-danger'>Xóa</button></td>
                                    </>
                                }
                                {/* Nếu là Products */}
                                {type && types.includes(type) &&
                                    <>
                                    <td><p>{item.productID}</p></td>
                                    <td><p>{item.productName}</p></td>
                                    <td><p>{item.brand}</p></td>
                                    <td><p>{item.discount}</p></td>
                                    <td><p>{item.price}</p></td>
                                    <td><p>{item.baoHanh}</p></td>
                                    <td><img src={item.image} alt="1" className='' height={'60px'} /></td>
                                    <td><img src={item.image2} alt="2" className='' height={'60px'} /></td>
                                    <td><img src={item.image3} alt="3" className='' height={'60px'} /></td>
                                    <td><img src={item.image4} alt="4" className='' height={'60px'} /></td>
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
                                    {(item.type === 'cpu') &&
                                        <>
                                        <td><p>{item.socKet}</p></td>
                                        <td><p>{item.soNhan}</p></td>
                                        <td><p>{item.soLuong}</p></td>
                                        <td><p>{item.kienTruc}</p></td>
                                        <td><p>{item.tocDo}</p></td>
                                        <td><p>{item.cache}</p></td>
                                        <td><p>{item.chipDoHoa}</p></td>
                                        <td><p>{item.tdp}</p></td>
                                        <td><p>{item.boNhoHoTro}</p></td>         
                                        </>
                                    }
                                    {(item.type === 'keyboard') &&
                                        <>
                                        <td><p>{item.switch}</p></td>
                                        <td><p>{item.mauSac}</p></td>
                                        <td><p>{item.kieuKetNoi}</p></td>
                                        <td><p>{item.denLed}</p></td>
                                        <td><p>{item.keTay}</p></td>
                                        <td><p>{item.kichThuoc}</p></td>
                                        </>
                                    }
                                    {(item.type === 'mouse') &&
                                        <>
                                        <td><p>{item.mauSac}</p></td>
                                        <td><p>{item.kieuKetNoi}</p></td>
                                        <td><p>{item.nhuCau}</p></td>
                                        <td><p>{item.kieuCam}</p></td>
                                        <td><p>{item.soNutBam}</p></td>
                                        <td><p>{item.denLed}</p></td>
                                        <td><p>{item.kichThuoc}</p></td>
                                        <td><p>{item.khoiLuong}</p></td>
                                        <td><p>{item.doPhanGiai}</p></td>
                                        <td><p>{item.dangCamBien}</p></td>
                                        <td><p>{item.doNhay}</p></td>
                                        </>
                                    }
                                    {(item.type === 'ram') &&
                                        <>
                                        <td><p>{item.mauSac}</p></td>
                                        <td><p>{item.theHe}</p></td>
                                        <td><p>{item.bus}</p></td>
                                        <td><p>{item.denLed}</p></td>
                                        <td><p>{item.loaiHang}</p></td>
                                        <td><p>{item.partNumber}</p></td>
                                        <td><p>{item.nhuCau}</p></td>
                                        <td><p>{item.dungLuong}</p></td>
                                        <td><p>{item.vol}</p></td>
                                        </>
                                    }
                                    {(item.type === 'headphone') &&
                                        <>
                                        <td><p>{item.tanSo}</p></td>
                                        <td><p>{item.ketNoi}</p></td>
                                        <td><p>{item.kieuKetNoi}</p></td>
                                        <td><p>{item.mauSac}</p></td>
                                        <td><p>{item.denLed}</p></td>
                                        <td><p>{item.microphone}</p></td>
                                        <td><p>{item.khoiLuong}</p></td>
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
            <div className='d-flex justify-content-center mt-2'>
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

            <Modal
                show={showStatusOrder}
                onHide={handleCloseStatusOrder}
                backdrop="static"
                keyboard={false}
                className='text-black'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật trạng thái</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-check">
                        <label className="form-label">Trạng thái:</label>
                        <input value={statusOrder} onChange={(e) => setStatusOrder(e.target.value)} type="text" className="form-control"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatusOrder}>
                        Thoát
                    </Button>
                    <Button onClick={() => submit()} variant="primary">Xác nhận</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showEditPermission}
                onHide={handleClosePermission}
                backdrop="static"
                keyboard={false}
                className='text-black'
            >
                <Modal.Header closeButton>
                <Modal.Title>Thay đổi quyền</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-check">
                <input onClick={() => setPermission('true')} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label onClick={() => setPermission('true')} className="form-check-label" htmlFor="flexRadioDefault1">
                    Admin
                </label>
                </div>
                <div className="form-check">
                <input onClick={() => setPermission('false')} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                <label onClick={() => setPermission('false')} className="form-check-label" htmlFor="flexRadioDefault2">
                    User
                </label>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePermission}>
                    Thoát
                </Button>
                <Button onClick={() => submit2()} variant="primary">Xác nhận</Button>
                </Modal.Footer>
            </Modal>

            {/* Model Prod*/}
            <Modal show={show} onHide={handleClose} fullscreen={true} className='text-black modal-Add'>
                <Modal.Header closeButton>
                <Modal.Title>{type === 'blogs' ? "Viết blog" : 'Thêm sản phẩm'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                    <div className="col-12 d-flex flex-column justify-content-between mx-auto pe-0">
                        <div className="detailUpdate card p-4 col-md-12">
                        { type === 'blogs' &&
                        <>
                        <p>Tên Blog:</p>
                        <input value={tenBlog} onChange={(e) => setTenBlog(e.target.value)} type="text" name="" id="" />
                        <p>Ảnh bìa:</p>
                        <input value={imageBlog} onChange={(e) => setImageBlog(e.target.value)} type="text" name="" id="" />
                        <p>Nội dung:</p>
                        <textarea value={noiDungBlog} onChange={(e) => setNoiDungBlog(e.target.value)} type="text" name="" id="" />
                        <p>TacGia:</p>
                        <input value={nguoiViet} onChange={(e) => setNguoiViet(e.target.value)} type="text" name="" id="" />
                        <p>Ngày Viết:</p>
                        <input value={ngayViet} onChange={(e) => setNgayViet(e.target.value)} type="date" name="" id="" />
                        </>
                        }
                        {type !== 'blogs' &&
                        <>
                            <p>Bạn đang thêm sản phầm kiểu: <span className='text-primary'>{type}</span></p>
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
                            {type === 'lap' &&
                            <>
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
                            <p>Sản phẩm có hot không: </p>
                            <input type="text" value={hot} onChange={(e) => setHot(e.target.value)} />
                            </>
                            }
                            {type === 'cpu' &&
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
                            {type === 'keyboard' &&
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
                            {type === 'mouse' &&
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
                            {type === 'ram' &&
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
                            <input type="text" value={storage} onChange={(e) => setStorage(e.target.value)} />
                            <p>Voltage: </p>
                            <input type="text" value={vol} onChange={(e) => setVol(e.target.value)} />
                            </>
                            }
                            {type === 'headphone' &&
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
                            <p>Ngày cập nhật (năm-tháng-ngày) (2024-01-13) : </p>
                            <input type="text" value={dateUpdate} onChange={(e) => setDateUpdate(e.target.value)} />
                            <p>Type: </p>
                            <input type="text" value={typeAdd} onChange={(e) => setTypeAdd(e.target.value)} />
                            <p>Link ảnh:</p>
                            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
                            <p>Link ảnh 2:</p>
                            <input type="text" value={image2} onChange={(e) => setImage2(e.target.value)} />
                            <p>Link ảnh 3:</p>
                            <input type="text" value={image3} onChange={(e) => setImage3(e.target.value)} />
                            <p>Link ảnh 4:</p>
                            <input type="text" value={image4} onChange={(e) => setImage4(e.target.value)} />
                            <p>Mô tả sản phẩm:</p>
                            <textarea className='col-12' type="text" value={des} onChange={(e) => setDes(e.target.value)} />
                        </>
                        }
                        </div>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
                {type !== 'blogs' && 
                <Button variant="primary" onClick={handleAddProd}>
                    Thêm
                </Button>
                }
                {type === 'blogs' &&
                <Button variant="primary" onClick={() => handleAddBlog()}>
                Thêm
                </Button>
                }
                </Modal.Footer>
            </Modal>      

                 {/*Blog  */}
            <Modal className='text-black' fullscreen={true} show={showBlogForm} onHide={handleCloseBlogForm}>
                <Modal.Header closeButton>
                <Modal.Title>Viết Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <>
                        <p>Tên Blog:</p>
                        <input value={tenBlog} onChange={(e) => setTenBlog(e.target.value)} type="text" name="" id="" />
                        <p>Ảnh bìa:</p>
                        <input value={imageBlog} onChange={(e) => setImageBlog(e.target.value)} type="text" name="" id="" />
                        <p>Nội dung:</p>
                        <textarea className='w-100' value={noiDungBlog} onChange={(e) => setNoiDungBlog(e.target.value)} type="text" name="" id="" />
                        <p>TacGia:</p>
                        <input value={nguoiViet} onChange={(e) => setNguoiViet(e.target.value)} type="text" name="" id="" />
                        <p>Ngày Viết:</p>
                        <input value={ngayViet} onChange={(e) => setNgayViet(e.target.value)} type="date" name="" id="" />
                        </>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseBlogForm}>
                    Thoát
                </Button>
                <Button variant="primary" onClick={submitBlog}>
                    Đăng
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
        </div>
        </div>
    </>);
}

export default admin;
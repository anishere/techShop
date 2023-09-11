/* eslint-disable react-hooks/rules-of-hooks */
import Table from 'react-bootstrap/Table';
import { axiosCus } from '../axios/axios';
import { useEffect, useState } from 'react';
import { URLLap, URLPC} from '.././URL/url'
import { URLCPU} from '.././URL/url'
import { URLKeyBoard} from '.././URL/url'
import { URLMouse} from '.././URL/url'
import { URLRAM} from '.././URL/url'
import { URLTaiNghe} from '.././URL/url'
import { infoShop, about, infoCustomer, feedBack } from '.././URL/url';
import ReactPaginate from 'react-paginate';

function admin() {
    const [URL, setURL] = useState(URLLap)
    const [listRes, setListRes] = useState()

    const [type, setType] = useState('lap')

    const [totalProds, setTotalProds] = useState()
    const totalPages = Math.ceil((totalProds / 20))

    const [selected, setSelected] = useState(true)

    const handleSelectURL = (URL, type) => {
        setURL(URL)
        setType(type)
        setSelected(!selected)
    }

    const types = [
        'lap',
        'pc',
        'mouse',
        'ram',
        'cpu',
        'tainghe',
        'keyboard'
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
                else if (type === 'cpu')
                {
                    setListRes(res.listcpu)
                    let total = await axiosCus.get('ProductsCPU/TotalCount')
                    setTotalProds(total.totalCount)
                }   
                else if (type === 'keyboard')
                {
                    setListRes(res.listKeyBoard)  
                    let total = await axiosCus.get('ProductsKeyBoard/TotalCount')
                    setTotalProds(total.totalCount)
                }
                else if (type === 'mouse')
                {
                    setListRes(res.listMouse) 
                    let total = await axiosCus.get('ProductsMouse/TotalCount')
                    setTotalProds(total.totalCount)
                }          
                else if (type === 'ram')
                {
                    setListRes(res.listram)
                    let total = await axiosCus.get('ProductsRAM/TotalCount')
                    setTotalProds(total.totalCount)
                }                   
                else if (type === 'tainghe')
                {
                    setListRes(res.listTaiNghe)
                    let total = await axiosCus.get('ProductsTaiNghe/TotalCount')
                    setTotalProds(total.totalCount)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [URL, type]);

    const handleSelectPage = (e) => {
        switch(type) {
            case 'lap':
                setURL(`ProductsPCLap/GetLaptops?page=${e.selected+1}&pageSize=20`)
                break
            case 'pc':
                setURL(`ProductsPCLap/GetPCs?page=${e.selected+1}&pageSize=20`)
                break
            case 'cpu':
                setURL(`ProductsCPU/ListCPU?page=${e.selected+1}&pageSize=20`)
                break
            case 'ram':
                setURL(`ProductsRAM/ListRAM?page=${e.selected+1}&pageSize=20`)
                break
            case 'keyboard':
                setURL(`ProductsKeyBoard/ListKeyBoard?page=${e.selected+1}&pageSize=20`)
                break
            case 'tainghe':
                setURL(`ProductsTaiNghe/ListTaiNghe?page=${e.selected+1}&pageSize=20`)
                break
            case 'mouse':
                setURL(`ProductsMouse/ListMouse?page=${e.selected+1}&pageSize=20`)
                break
        }
    }

    return (<>
        <div className="container-xxl mb-5">
        <div className="admin-button mb-5">
                <button onClick={() => handleSelectURL(infoShop, 'infoShop')}>Info Shop</button>
                <button onClick={() => handleSelectURL(about,'about')}>About</button>
                <button onClick={() => handleSelectURL(infoCustomer,'infoCustomer')}>Information Customer</button>
                <button onClick={() => handleSelectURL(feedBack,'feedback')}>FeedBack</button>
                <button onClick={() => handleSelectURL(URLLap,'lap')}>LapTop</button>
                <button onClick={() => handleSelectURL(URLPC, 'pc')}>PC</button>
                <button onClick={() => handleSelectURL(URLCPU, 'cpu')}>CPUs</button>
                <button onClick={() => handleSelectURL(URLKeyBoard, 'keyboard')}>KeyBoards</button>
                <button onClick={() => handleSelectURL(URLMouse, 'mouse')}>Mouses</button>
                <button onClick={() => handleSelectURL(URLRAM, 'ram')}>RAM</button>
                <button onClick={() => handleSelectURL(URLTaiNghe, 'tainghe')}>Tai Nghe</button>
        </div>

        <div className="admin-table">
            { types.includes(type) &&
            <>
            <span>Tổng sản phẩm: {totalProds}</span> 
            </>              
            }
            <span className='mx-2 text-capitalize'>Type: {type}</span>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        { type === 'infoShop' &&
                            <>
                            <th>SĐT</th>
                            <th>Địa chỉ</th>
                            <th>Logo</th>
                            <th>Map</th>
                            </>
                        }
                        { type === 'about' &&
                            <>
                            <th>Đoạn 1</th>
                            <th>Đoạn 2</th>
                            </>
                        }
                        { type === 'infoCustomer' &&
                            <>
                            <th>SĐT</th>
                            <th>Tên</th>
                            <th>Địa chỉ</th>
                            <th>Đơn hàng</th>
                            <th>Tổng tiền</th>
                            </>
                        }
                        { type === 'feedback' &&
                            <>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Tên</th>
                            <th>FeedBack</th>
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
                            { (type === 'lap' || type === 'pc') &&
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
                            { type === 'cpu' &&
                                //Cột của CPUs
                                <>
                                <th>Socket</th> 
                                <th>Số Nhân</th>
                                <th>Số Luồng</th>
                                <th>Kiến trúc</th>
                                <th>Tốc độ</th>
                                <th>Cache</th>
                                <th>Chip đồ họa</th>
                                <th>TDP</th>
                                <th>Bộ nhớ hỗ trợ</th> 
                                </>
                            }
                            { type === 'keyboard' &&
                                //Cột của KeyBoard
                                <>
                                <th>Switch</th> 
                                <th>Màu sắc</th>
                                <th>Kiểu kết nối</th>
                                <th>Đèn led</th>
                                <th>Kê tay</th>
                                <th>Kiểu kích thước</th>
                                </>
                            }
                            { type === 'mouse' &&
                                //Cột của Mouse
                                <>
                                <th>Màu sắc</th>
                                <th>Kiểu kết nối</th>
                                <th>Nhu cầu</th>
                                <th>Kiểu cầm</th>
                                <th>Số nút bấm</th>
                                <th>Đèn led</th>
                                <th>Kích thước</th>
                                <th>Khối lượng</th>
                                <th>Độ phân giải</th>
                                <th>Dạng cảm biến</th>
                                <th>Độ nhạy</th>
                                </>
                            }
                            { type === 'ram' &&
                                //Cột của RAM
                                <>
                                <th>Màu sắc</th>
                                <th>Thế hệ</th>
                                <th>Bus</th>
                                <th>Đèn led</th>
                                <th>Loại hàng</th>
                                <th>Pard number</th>
                                <th>Nhu cầu</th>
                                <th>Dung lượng</th>
                                <th>Vol</th>
                                </>
                            }
                            { type === 'tainghe' &&
                                //Cột của Tai nghe
                                <>
                                <th>Tần số</th>
                                <th>Kết nối</th>
                                <th>Kiểu kết nối</th>
                                <th>Màu sắc</th>
                                <th>Đèn led</th>
                                <th>Microphone</th>
                                <th>Khối lượng</th>
                                </>
                            }
                            <th>Ngày nhập</th> 
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
                                    </>
                                }
                                {type === 'about' &&
                                    <>
                                    <td><p>{item.about1}</p></td>
                                    <td><p>{item.about2}</p></td>
                                    </>
                                }
                                { type === 'infoCustomer' &&
                                    <>
                                    <td><p>{item.phoneNumber}</p></td>
                                    <td><p>{item.name}</p></td>
                                    <td><p>{item.address}</p></td>
                                    <td><p>{item.listCart}</p></td>
                                    <td><p>{item.totalPrice}</p></td>
                                    </>
                                }
                                { type === 'feedback' &&
                                    <>
                                    <td><p>{item.sdt}</p></td>
                                    <td><p>{item.email}</p></td>
                                    <td><p>{item.ten}</p></td>
                                    <td><p>{item.messageDetail}</p></td>
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
                                    {(item.type === 'lap' || item.type === 'pc') &&
                                        // lap or pc
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
                                        // CPU
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
                                        // Keyboard
                                        <>
                                        <td><p>{item.switch}</p></td> 
                                        <td><p>{item.mauSac}</p></td>
                                        <td><p>{item.kieuKetNoi}</p></td>
                                        <td><p>{item.denLed}</p></td>
                                        <td><p>{item.keTay}</p></td>
                                        <td><p>{item.kichThuoc}</p></td>
                                        </>
                                    } 
                                    {(item.type === 'ram') &&
                                        // RAM
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
                                    {(item.type === 'mouse') &&
                                        // Mouse
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
                                    {(item.type === 'tainghe') &&
                                        // Tai Nghe
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
        </div>
        </div>
    </>);
}

export default admin;
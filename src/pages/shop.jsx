/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLLap, URLtotalProd, URLtotalProdBrand, URLCPU, URLKeyBoard, URLMouse, URLRAM, URLTaiNghe } from "../URL/url";
import { URLBrandsLap, URLBrandsCPU, URLBrandsRAM, URLBrandsHeadPhone, URLBrandsKeyBoard, URLBrandsMouse } from "../URL/url";
import { useDispatch, useSelector } from "react-redux";
import { UpInfoProd, addItem } from "../redux/detailSlice";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { URLtotalProdCPU, URLtotalProdKeyBoard, URLtotalProdMouse, URLtotalProdRAM, URLtotalProdHeadPhone } from "../URL/url";
import { URLtotalProdCPUbyBrand, URLtotalProdKeyBoardbyBrand, 
    URLtotalProdMousebyBrand, URLtotalProdRAMbyBrand, URLtotalProdHeadPhonebyBrand
 } from "../URL/url";
 import { CiCirclePlus } from "react-icons/ci";
 import { MdOutlineCompare } from "react-icons/md";

import claptop from "../assets/imgs/categoryProd/claptop.webp";
import ccpu from "../assets/imgs/categoryProd/ccpu.webp";
import cmouse from "../assets/imgs/categoryProd/cmouse.webp";
import ckeyboard from "../assets/imgs/categoryProd/ckeyboard.webp";
import cheadphone from "../assets/imgs/categoryProd/cheadphone.webp";
import cram from "../assets/imgs/categoryProd/cram.webp"
import { HandleCompare1, HandleCompare2 } from "../redux/compareSlice";

function shop() {
    const dispatch = useDispatch()
    const [prodsType, setProdsType] = useState("laptop");
    const [listProds, setListProds] = useState();
    const [brandProds, setBrandProds] = useState('ALL');
    const [listBrands, setListBrands] = useState();

    const [totalProds, setTotalProds] = useState()
    const totalPages = Math.ceil((totalProds / 20))


    const [selected, setSelected] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if(prodsType === "laptop") {
                try {
                    if(brandProds === 'ALL') {
                        const res = await axiosCus.get(URLLap);   
                        setListProds(res.listproducts)
                        const resBrand = await axiosCus.get(URLBrandsLap)
                        setListBrands(resBrand.brands)
                        const restotal = await axiosCus.get(URLtotalProd);
                        setTotalProds(restotal.totalCount);
                    } else {
                        const res = await axiosCus.get(`ProductsPCLap/GetLaptopsBrand?page=1&pageSize=20&brand=${brandProds}`);
                        setListProds(res.listproducts)
                        const restotal = await axiosCus.get(`${URLtotalProdBrand}${brandProds}`);
                        setTotalProds(restotal.totalCount);
                    } 
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else if (prodsType === 'cpu') {
                try{
                    const res = await axiosCus.get(URLCPU);
                    setListProds(res.listcpu)
                    const resBrand = await axiosCus.get(URLBrandsCPU)
                    setListBrands(resBrand.brands)
                    if(brandProds === 'ALL') {
                        const restotal = await axiosCus.get(URLtotalProdCPU);
                        setTotalProds(restotal.totalCount);
                    } else {
                        const restotal = await axiosCus.get(`${URLtotalProdCPUbyBrand}${brandProds}`);
                        setTotalProds(restotal.totalCount);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else if (prodsType === 'keyboard') {
                try{
                    const res = await axiosCus.get(URLKeyBoard);
                    setListProds(res.listKeyBoard)
                    const resBrand = await axiosCus.get(URLBrandsKeyBoard)
                    setListBrands(resBrand.brands)
                    if(brandProds === 'ALL') {
                        const restotal = await axiosCus.get(URLtotalProdKeyBoard);
                        setTotalProds(restotal.totalCount);
                    } else {
                        const restotal = await axiosCus.get(`${URLtotalProdKeyBoardbyBrand}${brandProds}`);
                        setTotalProds(restotal.totalCount);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else if (prodsType === 'mouse') {
                try{
                    const res = await axiosCus.get(URLMouse);
                    setListProds(res.listMouse)
                    const resBrand = await axiosCus.get(URLBrandsMouse)
                    setListBrands(resBrand.brands)
                    if(brandProds === 'ALL') {
                        const restotal = await axiosCus.get(URLtotalProdMouse);
                        setTotalProds(restotal.totalCount);
                    } else {
                        const restotal = await axiosCus.get(`${URLtotalProdMousebyBrand}${brandProds}`);
                        setTotalProds(restotal.totalCount);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else if (prodsType === 'ram') {
                try{
                    const res = await axiosCus.get(URLRAM);
                    setListProds(res.listram)
                    const resBrand = await axiosCus.get(URLBrandsRAM)
                    setListBrands(resBrand.brands)
                    if(brandProds === 'ALL') {
                        const restotal = await axiosCus.get(URLtotalProdRAM);
                        setTotalProds(restotal.totalCount);
                    } else {
                        const restotal = await axiosCus.get(`${URLtotalProdRAMbyBrand}${brandProds}`);
                        setTotalProds(restotal.totalCount);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            } else if (prodsType === 'headphone') {
                try{
                    const res = await axiosCus.get(URLTaiNghe);
                    setListProds(res.listTaiNghe)
                    const resBrand = await axiosCus.get(URLBrandsHeadPhone)
                    setListBrands(resBrand.brands)
                    if(brandProds === 'ALL') {
                        const restotal = await axiosCus.get(URLtotalProdHeadPhone);
                        setTotalProds(restotal.totalCount);
                    } else {
                        const restotal = await axiosCus.get(`${URLtotalProdHeadPhonebyBrand}${brandProds}`);
                        setTotalProds(restotal.totalCount);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };
        fetchData();
    }, [brandProds, prodsType]);

    const handleSelectPage = (e) => {
        const fetchData = async () => {
            try {
                if(prodsType === 'laptop') {
                    if(brandProds === 'ALL') {
                        const res = await axiosCus.get(`ProductsPCLap/GetLaptops?page=${e.selected+1}&pageSize=20`);
                        setListProds(res.listproducts)
                    } else {
                        const res = await axiosCus.get(`ProductsPCLap/GetLaptopsBrand?page=${e.selected+1}&pageSize=20&brand=${brandProds}`);
                        setListProds(res.listproducts)
                    }
                }
                if(prodsType === 'cpu') {
                    if(brandProds === 'ALL') {                     
                        const res = await axiosCus.get(`ProductsCPU/ListCPU?page=${e.selected+1}&pageSize=20`);
                        setListProds(res.listcpu)
                    } else {                  
                        const res = await axiosCus.get(`ProductsCPU/GetProductsByBrand?brand=${brandProds}&page=${e.selected+1}&pageSize=20`);
                        setListProds(res.listcpu)
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        scrollToTop();
    }

    const handleSelectProd = (id, type) => {
        dispatch(UpInfoProd({id, type}))
    }

    const handleBrand = (brand) => {
        if (brand === "all") {
            BrandAll();
        }
        else 
        {
            handleSelectPage(0)
            setBrandProds(brand)

            // setSelected(!selected)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    };

    const BrandAll = () => {
        setBrandProds('ALL');
        scrollToTop();
    }

    //buy
    const ids = useSelector(state => state.prod.ids)

    const handleAddItem = (id, type) => {
        dispatch(addItem({productId: id, prodsType: type}))
    }

    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const [idCom1, setIdCom1] = useState()
    // eslint-disable-next-line no-unused-vars
    const [idCom2, setIdCom2] = useState()

    const id1 = useSelector(state => state.compare.id1)
    
    useEffect(() => {
        setIdCom1(id1)
    }, [id1])

    const handleAddId1 = (id) => {
        dispatch(HandleCompare1(id))
    }

    const handleAddId2 = (id) => {
        dispatch(HandleCompare2(id))
        navigate('../compare')
    }

    return (<>
        <section className="banner-shop">
            <div className="container-xxl">
                <div className="row">
                    <div className="bannerShop-detail text-center">
                        <h2 className="fs-1"><span className="fs-1 text-success">#100%</span> Tất cả sản phẩm đều được giảm giá</h2>
                        <span className="fs-5">Đặt hàng ngay chúng tôi sẽ vận chuyển sớm nhất</span>
                    </div>
                </div>
            </div>
        </section>

        <section className="category-shop">
            <div className="container-xxl">
                <div className="row">
                    <div className="px-0">
                        <h5>Danh mục</h5>
                        <div className="category-shop-container d-flex justify-content-around">
                            <div onClick={() => {
                                setSelected(!selected)
                                setProdsType("laptop")
                                setBrandProds("ALL")
                            }}>
                                <a >
                                    <div><img src={claptop} alt="" className="category-shop-imgs" /></div>
                                    <div className="category-shop-subtitle">Laptop</div>
                                </a>
                            </div>
                            <div onClick={() => {
                                setSelected(!selected)
                                setProdsType("cpu")
                                setBrandProds("ALL")
                            }}>
                                <a >
                                    <div><img src={ccpu} alt="" className="category-shop-imgs" /></div>
                                    <div className="category-shop-subtitle">CPU</div>
                                </a>
                            </div>
                            <div onClick={() => {
                                setSelected(!selected)
                                setProdsType("keyboard")
                                setBrandProds("ALL")
                            }}>
                                <a >
                                    <div><img src={ckeyboard} alt="" className="category-shop-imgs" /></div>
                                    <div className="category-shop-subtitle">Bàn Phím</div>
                                </a>
                            </div>
                            <div onClick={() => {
                                setSelected(!selected)
                                setProdsType("mouse")
                                setBrandProds("ALL")
                            }}>
                                <a >
                                    <div><img src={cmouse} alt="" className="category-shop-imgs" /></div>
                                    <div className="category-shop-subtitle">Chuột</div>
                                </a>
                            </div>
                            <div onClick={() => {
                                setSelected(!selected)
                                setProdsType("ram");
                                setBrandProds("ALL");
                            }}>
                                <a >
                                    <div><img src={cram} alt="" className="category-shop-imgs" /></div>
                                    <div className="category-shop-subtitle">RAM</div>
                                </a>
                            </div>
                            <div onClick={() => {
                                setSelected(!selected)
                                setProdsType("headphone");
                                setBrandProds("ALL");
                            }}>
                                <a >
                                    <div><img src={cheadphone} alt="" className="category-shop-imgs" /></div>
                                    <div className="category-shop-subtitle">Tai Nghe</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <h5 className="">Lọc:</h5>
                    <div className="category-shop-opLap">
                    <h6 className="my-0 me-2">Hãng: </h6>
                    <select onChange={(e) => handleBrand(e.target.value)} className="form-select">
                        <option value="all">Tất cả</option>
                        {listBrands && listBrands.map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                    </div>
                    <hr />
                </div>
            </div>
        </section>

        <div className="container-xxl prodsShop p-2 overflow-hidden my-3">
            <div className="row d-flex justify-content-between mt-2">
                {listProds && listProds.map((prod) => {
                if (brandProds === 'ALL') {
                    return (
                    <div key={prod.productID} className="card col-md-3 col-10 mx-auto my-2 newProds-item">
                        <div className="mt-3 newProds-img">
                            <img className="img-fluid" src={prod.image}  alt="new products img"/>
                        </div>
                        <div className="card-body">
                            <h6>{prod.brand}</h6>
                            <Link to={'../detail'} className="text-white" onClick={() => handleSelectProd(prod.productID, prod.type)}><h6 className="card-title">{prod.productName}</h6></Link>
                            <p className="card-text mb-1 newProds-price">{(prod.price - (prod.price * prod.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod.price.toLocaleString('vi-VN')}đ</strike></span></p>
                            <Link onClick={() => {handleAddItem(prod.productID, prod.type)}} className="btn my-2">Mua ngay
                            { ids && ids[prod.type][prod.productID] > 0 && <span>&nbsp;({ids[prod.type][prod.productID]})</span>}
                            </Link>
                            {id1 === null &&
                                <i onClick={() => handleAddId1(prod.productID)} className="fs-3 icon float-end"><CiCirclePlus /></i>
                            }
                            {id1 !== null &&
                                <i onClick={() => handleAddId2(prod.productID)} className="fs-3 icon float-end"><MdOutlineCompare /></i>
                            }
                        </div>
                    </div>
                    )
                } else if (prod.brand && prod.brand === brandProds) {                  
                    return (
                        <div key={prod.productID} className="card col-md-3 col-10 mx-auto my-2 newProds-item">
                            <div className="mt-3 newProds-img">
                                <img className="img-fluid" src={prod.image}  alt="new products img"/>
                            </div>
                            <div className="card-body">
                                <h6>{prod.brand}</h6>
                                <Link to={'../detail'} className="text-white" onClick={() => handleSelectProd(prod.productID, prod.type)}><h6 className="card-title">{prod.productName}</h6></Link>
                                <p className="card-text mb-1 newProds-price">{(prod.price - (prod.price * prod.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod.price.toLocaleString('vi-VN')}đ</strike></span></p>
                                <Link onClick={() => {handleAddItem(prod.productID, prod.type)}} href="" className="btn my-2">Mua ngay
                                { ids && ids[prod.type][prod.productID] > 0 && <span>&nbsp;({ids[prod.type][prod.productID]})</span>}
                                </Link>
                                <i></i>
                            </div>
                        </div>
                    )
                }
                })}
            </div>
        </div>

        {totalPages > 1 &&
            <div className='d-flex justify-content-center mb-3'>
            <ReactPaginate
            key={selected}
            nextLabel=">"
            onPageChange={(e) => {handleSelectPage(e)}}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={totalPages}
            previousLabel="<"
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

    </>);
}

export default shop;
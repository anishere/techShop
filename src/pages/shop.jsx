/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLLap, URLtotalProd, URLtotalProdBrand } from "../URL/url";
import { useDispatch, useSelector } from "react-redux";
import { UpInfoProd, addItem } from "../redux/detailSlice";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

function shop() {
    const dispatch = useDispatch()
    const [listProds, setListProds] = useState();
    const [brandProds, setBrandProds] = useState('ALL');
    const [listBrands, setListBrands] = useState();

    const [totalProds, setTotalProds] = useState()
    const totalPages = Math.ceil((totalProds / 20))

    const [selected, setSelected] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(brandProds === 'ALL') {
                    const res = await axiosCus.get(URLLap);
                    const resBrand = await axiosCus.get('ProductsPCLap/GetBrands')
                    setListProds(res.listproducts)
                    setListBrands(resBrand.brands)
                } else {
                    const res = await axiosCus.get(`ProductsPCLap/GetLaptopsBrand?page=1&pageSize=20&brand=${brandProds}`);
                    setListProds(res.listproducts)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [brandProds])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(brandProds === 'ALL') {
                    const res = await axiosCus.get(URLtotalProd);
                    setTotalProds(res.totalCount);
                } else {
                    const res = await axiosCus.get(`${URLtotalProdBrand}${brandProds}`);
                    setTotalProds(res.brandProductCount);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [brandProds])

    const handleSelectPage = (e) => {
        const fetchData = async () => {
            try {
                if(brandProds === 'ALL') {
                    const res = await axiosCus.get(`ProductsPCLap/GetLaptops?page=${e.selected+1}&pageSize=20`);
                    setListProds(res.listproducts)
                } else {
                    const res = await axiosCus.get(`ProductsPCLap/GetLaptopsBrand?page=${e.selected+1}&pageSize=20&brand=${brandProds}`);
                    setListProds(res.listproducts)
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
        handleSelectPage(0)
        setBrandProds(brand)

        setSelected(!selected)
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

    const handleAddItem = (id) => {
        dispatch(addItem(id))
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
                    <h5>Nhãn hàng:</h5>
                    <button onClick={() => BrandAll()} className="buttonBrand col-1 mx-2 btn">Tất cả</button>
                    {listBrands && listBrands.map((brand) => {
                        return (
                            <button key={brand} onClick={() => handleBrand(brand)} className="buttonBrand col-1 mx-2 btn">{brand}</button>
                        )})
                    }
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
                            <Link onClick={() => {handleAddItem(prod.productID)}} href="" className="btn my-2">Mua ngay
                            { ids[prod.productID] > 0 && <span>&nbsp;({ids[prod.productID]})</span>}
                            </Link>
                        </div>
                    </div>
                    )
                } else if (prod.brand === brandProds) {
                    
                    return (
                        <div key={prod.productID} className="card col-md-3 col-10 mx-auto my-2 newProds-item">
                            <div className="mt-3 newProds-img">
                                <img className="img-fluid" src={prod.image}  alt="new products img"/>
                            </div>
                            <div className="card-body">
                                <h6>{prod.brand}</h6>
                                <Link to={'../detail'} className="text-white" onClick={() => handleSelectProd(prod.productID, prod.type)}><h6 className="card-title">{prod.productName}</h6></Link>
                                <p className="card-text mb-1 newProds-price">{(prod.price - (prod.price * prod.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod.price.toLocaleString('vi-VN')}đ</strike></span></p>
                                <Link onClick={() => {handleAddItem(prod.productID)}} href="" className="btn my-2">Mua ngay
                                { ids[prod.productID] > 0 && <span>&nbsp;({ids[prod.productID]})</span>}
                                </Link>
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
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLLap } from "../URL/url";
import { useDispatch } from "react-redux";
import { UpInfoProd } from "../redux/detailSlice";
import { Link } from "react-router-dom";

function shop() {
    const dispatch = useDispatch()
    const [listProds, setListProds] = useState();
    const [brandProds, setBrandProds] = useState('ALL');
    const [listBrands, setlistBrands] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(URLLap);
                const resBrand = await axiosCus.get('ProductsPCLap/GetBrands')
                setListProds(res.listproducts)
                setlistBrands(resBrand.brands)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    const handleSelectProd = (id, type) => {
        dispatch(UpInfoProd({id, type}))
    }

    const handleBrand = (brand) => {
        setBrandProds(brand)
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
                    <button onClick={() => setBrandProds('ALL')} className="buttonBrand col-1 mx-2 btn">Tất cả</button>
                    {listBrands && listBrands.map((brand) => {
                        return (
                            <button key={Math.random} onClick={() => handleBrand(brand)} className="buttonBrand col-1 mx-2 btn">{brand}</button>
                        )})
                    }
                    <hr />
                </div>
            </div>
        </section>

        <div className="container-xxl prodsShop p-2 overflow-hidden my-5">
            <div className="row d-flex justify-content-between mt-5">
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
                            <Link href="#" className="btn my-2">Mua ngay</Link>
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
                                <Link href="#" className="btn my-2">Mua ngay</Link>
                            </div>
                        </div>
                    )
                }
                })}
            </div>
        </div>

    </>);
}

export default shop;
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { URLhotProds } from "../URL/url";
import { axiosCus } from "../axios/axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UpInfoProd } from "../redux/detailSlice";
import { useDispatch } from "react-redux";

function hotProds() {
    const dispatch = useDispatch()
    const [hotProds, setHotProds] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(URLhotProds);
                setHotProds(res.listproducts)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    const handleSelectProd = (id, type) => {
        dispatch(UpInfoProd({id, type}))
    }

    return (
        <div className="container-xxl newProds p-2 overflow-hidden my-5">
            <h2 className="text-center">Sản phẩm HOT</h2>
            <div className="row d-flex justify-content-between mt-5">
                {hotProds && hotProds.slice(0,4).map((prod) => {
                    return (
                    <div key={prod.productID} className="card col-md-3 col-10 mx-auto my-2 newProds-item">
                        <div className="mt-3 newProds-img">
                            <img className="img-fluid" src={prod.image}  alt="new products img"/>
                        </div>
                        <div className="card-body">
                            <h6>{prod.brand}</h6>
                            <Link to={'detail'} className="text-white" onClick={() => handleSelectProd(prod.productID, prod.type)}><h6 className="card-title">{prod.productName}</h6></Link>
                            <p className="card-text mb-1 newProds-price">{(prod.price - (prod.price * prod.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod.price.toLocaleString('vi-VN')}đ</strike></span></p>
                            <Link href="#" className="btn my-2">Mua ngay</Link>
                        </div>
                    </div>
                    )
                })}
            </div>
       </div>
    );
}

export default hotProds;
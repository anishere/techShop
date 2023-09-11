/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { Link } from "react-router-dom";
import { URLnewProds } from "../URL/url";
import { useEffect } from "react";
import { axiosCus } from "../axios/axios";

function newProds() {

    const [newProds, setNewProds] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(URLnewProds);
                setNewProds(res.listproducts)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])

    return (<>
       <div className="container-xxl newProds p-2 overflow-hidden my-5">
            <h2 className="text-center">Sản phẩm mới</h2>
            <div className="row d-flex justify-content-between mt-5">
                {newProds && newProds.map((prod) => {
                    return (
                    <div key={prod.productID} className="card col-md-3 col-10 mx-auto my-2 newProds-item">
                        <div className="mt-3 newProds-img">
                            <img className="img-fluid" src={prod.image}  alt="new products img"/>
                        </div>
                        <div className="card-body">
                            <h6>{prod.brand}</h6>
                            <h6 className="card-title">{prod.productName}</h6>
                            <p className="card-text mb-1 newProds-price">{(prod.price - (prod.price * prod.discount)).toLocaleString('vi-VN')}đ <span className="newProds-priceOld"><strike>{prod.price.toLocaleString('vi-VN')}đ</strike></span></p>
                            <Link href="#" className="btn my-2">Mua ngay</Link>
                        </div>
                    </div>
                    )
                })}
            </div>
       </div>
    </>);
}

export default newProds;
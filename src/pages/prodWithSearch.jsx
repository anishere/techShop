/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { axiosCus } from "../axios/axios";
import { URLsearch, URLsearchCPU, URLsearchHeadPhone, URLsearchKeyBoard, URLsearchMouse, URLsearchRAM } from "../URL/url";
import { useDispatch, useSelector } from "react-redux";
import { UpInfoProd, addItem } from "../redux/detailSlice";
import { Link } from "react-router-dom";

function prodWitchSearch() {
    const dispatch = useDispatch()
    const [listProds, setListProds] = useState([]);
    const searchName = useSelector((state) => state.search.search)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosCus.get(`${URLsearch}${searchName}`);
                if (res && res.listproducts) {
                    setListProds(prevListProds => [...prevListProds, ...res.listproducts]);
                }

                const resCPU = await axiosCus.get(`${URLsearchCPU}${searchName}`);
                if (res && resCPU.listcpu) {
                    setListProds(prevListProds => [...prevListProds, ...resCPU.listcpu]);
                }

                const resKeyBoard = await axiosCus.get(`${URLsearchKeyBoard}${searchName}`);
                if (res && resKeyBoard.listKeyBoard) {
                    setListProds(prevListProds => [...prevListProds, ...resKeyBoard.listKeyBoard]);
                }

                const resMouse = await axiosCus.get(`${URLsearchMouse}${searchName}`);
                if (res && resMouse.listMouse) {
                    setListProds(prevListProds => [...prevListProds, ...resMouse.listMouse]);
                }

                const resRAM = await axiosCus.get(`${URLsearchRAM}${searchName}`);
                if (res && resRAM.listram) {
                    setListProds(prevListProds => [...prevListProds, ...resRAM.listram]);
                }

                const resHeadPhone = await axiosCus.get(`${URLsearchHeadPhone}${searchName}`);
                if (res && resHeadPhone.listTaiNghe) {
                    setListProds(prevListProds => [...prevListProds, ...resHeadPhone.listTaiNghe]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [searchName])

    const handleSelectProd = (id, type) => {
        dispatch(UpInfoProd({id, type}))
    }

    //buy
    const ids = useSelector(state => state.prod.ids)

    const handleAddItem = (id, type) => {
        dispatch(addItem({productId: id, prodsType: type}))
    }
    
    console.log(listProds)
 
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
            
        <section>
        <section className="category-shop">
            <div className="container-xxl">
                <div className="row">
                    <h5>Tìm thấy {listProds ? listProds.length : 0} sản phẩm</h5>
                    <h6>theo tìm kiếm: {searchName}</h6>
                    <hr />
                </div>
            </div>
        </section>
        </section>

        <div className="container-xxl prodsShop p-2 overflow-hidden my-3">
            <div className="row d-flex justify-content-between mt-2">
                {listProds && listProds.length > 0 ? (
                    listProds.map((prod) => {
                        return (
                            <div key={`${prod.productID}${prod.type}`} className="card col-md-3 col-10 mx-auto my-2 newProds-item">
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
                                </div>
                            </div>
                        )
                    }))
                    :(
                        <div className="row mt-2">
                            <h4 className="">
                                Không có sản phẩm nào được tìm thấy theo tìm kiếm: {searchName}
                            </h4>
                        </div>
                    )}
            </div>
        </div>

        {/* {totalPages > 1 &&
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
            } */}

    </>);
}

export default prodWitchSearch;
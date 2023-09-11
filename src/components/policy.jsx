import { GiReceiveMoney } from 'react-icons/gi'
import { BsPatchCheck } from 'react-icons/bs'
import { TbTruckDelivery } from 'react-icons/tb'
import { GiShakingHands } from 'react-icons/gi'

function policy() {
    return (
        <section className="policy container-xxl my-5">
            <div className="row d-flex justify-content-between">
                <div className="col-md-3 col-10 mx-auto my-2 policy-item d-flex align-items-center justify-content-between">
                    <GiReceiveMoney className='fs-1' />
                    <p className=''>Siêu ưu đãi</p>
                </div>
                <div className="col-md-3 col-10 mx-auto my-2 policy-item d-flex align-items-center justify-content-between">
                    <BsPatchCheck className='fs-1' />
                    <p className=''>Bảo hành toàn diện</p>
                </div>
                <div className="col-md-3 col-10 mx-auto my-2 policy-item d-flex align-items-center justify-content-between">
                    <TbTruckDelivery className='fs-1' />
                    <p className=''>Giao hàng nhanh chống</p>
                </div>
                <div className="col-md-3 col-10 mx-auto my-2 policy-item d-flex align-items-center justify-content-between">
                    <GiShakingHands className='fs-1' />
                    <p className=''>Trả góp 0%, đưa trước 0đ</p>
                </div>
            </div>
        </section>
    );
}

export default policy;
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { axiosCus } from "../axios/axios"
import { useSelector } from "react-redux"


function infoUser() {

    // const [email, setEmail] = useState()
    // const [SDT, setSDT] = useState()
    // const [image, setImage] = useState()
    // const [name, setName] = useState('')
    // const [password, setPassword] = useState('')
    const [infoUser, setInfoUser] = useState();

    const idTaiKhoan = useSelector((state) => state.auth.idTaiKhoan)

    useEffect(() => {      
            const fetchData = async () => {
                const res = await axiosCus.get(`Account/account/${idTaiKhoan}`)
                setInfoUser(res)
            }
            fetchData();    
      },[])

    console.log(infoUser)

    return (
        <div className="container-xxl">
            <div className="row infoUser p-4">
                <div className="col-3">
                    <img className="rounded-circle" src={infoUser && infoUser.image} alt="" />
                </div>
                <div className="col-9 mt-4 text-black">
                    {infoUser &&
                    <div className="detail">
                        <p>User Name: </p>
                        <p>{infoUser.userName}</p>
                        <p>Email: </p>
                        <p>{infoUser.email}</p>
                        <p>Số điện thoại: </p>
                        <p>{infoUser.sdt}</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default infoUser;
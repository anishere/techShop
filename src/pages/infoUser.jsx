/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react"
import { axiosCus } from "../axios/axios"
import { useSelector } from "react-redux"
import { FaUserEdit } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { MdPassword } from "react-icons/md";

function infoUser() {

    const [email, setEmail] = useState()
    const [SDT, setSDT] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [passwordCur, setPasswordCur] = useState('')
    const [passwordNew1, setPasswordNew1] = useState('')
    const [passwordNew2, setPasswordNew2] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showP, setShowP] = useState(false);
    const handleCloseP = () => setShowP(false);
    const handleShowP = () => setShowP(true);

    const [load, setLoad] = useState(false);

    const [infoUser, setInfoUser] = useState();

    const idTaiKhoan = useSelector((state) => state.auth.idTaiKhoan)

    useEffect(() => {      
            const fetchData = async () => {
                const res = await axiosCus.get(`Account/account/${idTaiKhoan}`)
                setInfoUser(res)
            }
            fetchData();    
      },[idTaiKhoan, load])

      useEffect(() => {
        if(infoUser) {
            setName(infoUser.userName)
            setEmail(infoUser.email)
            setImage(infoUser.image)
            setSDT(infoUser.sdt)
        }
      },[infoUser])

    const handleEditPF = async () => {
        try {
            const fetchData = async () => {
                const res = await axiosCus.post('Account/updateAccount', {
                    IdTaiKhoan: idTaiKhoan,
                    UserName: name,
                    Email: email,
                    SDT: SDT,
                    Image: image,
                });
                if(res === true) {
                    toast.success('Cập nhật thành cộng', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                } else {
                    toast.error('Cập nhật thất bại', {
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
                setLoad(!load)
                setShow(!show)
            }
            fetchData(); 
        } catch (error) {
            console.error('There was an error updating the account!', error);
        }  
    }

    const handleChangePass = async () => {
        if(passwordNew1 === passwordNew2) {
            try {
                const fetchData = async () => {
                    const res = await axiosCus.post(`Account/update?userName=${infoUser.userName}&currentPassword=${passwordCur}&newPassword=${passwordNew1}`);
                    if(res === true) {
                        toast.success('Cập nhật thành cộng', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                    } else {
                        toast.error('Lỗi cập nhật', {
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
                    setLoad(!load)
                    setShowP(!show)
                }
                fetchData(); 
            } catch (error) {
                console.error('There was an error updating the account!', error);
            }
        } else {
            toast.error('Mật khẩu xác nhận ko đúng', {
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
    }

    return (
        <div className="container-xxl">
            <div className="row infoUser p-4">
                <div className="col-4">
                    <img className="rounded-circle" src={infoUser && infoUser.image} alt="" />
                </div>
                <div className="col-8 mt-5 text-black">
                    {infoUser &&
                    <div className="detail">
                    <h3 className="">Thông tin tài khoản</h3>
                        <p>User Name: </p>
                        <p>{infoUser.userName}</p>
                        <p>Email: </p>
                        <p>{infoUser.email}</p>
                        <p>Số điện thoại: </p>
                        <p>{infoUser.sdt}</p>
                        <div className="d-flex justify-content-between">
                        <span onClick={handleShow} className="editProfile ms-2"><i className="fs-4"><FaUserEdit /></i></span>
                        <span onClick={handleShowP} className="changePass" ><i className="fs-4"><MdPassword /></i></span>
                        </div>
                    </div>
                    }
                </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="modalUpdateInfo text-black"
            >
                <Modal.Header closeButton>
                <Modal.Title>Cập nhật thông tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="input-group group-updateInfo mb-3">
                    <label htmlFor="">User Name:</label>
                    <p><input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/></p>
                    <label htmlFor="">Email:</label>
                    <p><input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1"/></p>
                    <label htmlFor="">Số điện thoại:</label>
                    <p><input value={SDT} onChange={(e) => setSDT(e.target.value)} type="text" className="form-control" placeholder="Số điện thoại" aria-label="Username" aria-describedby="basic-addon1"/></p>
                    <label htmlFor="">Link Avatar:</label>
                    <p><input value={image} onChange={(e) => setImage(e.target.value)} type="text" className="form-control" placeholder="Link Avatar" aria-label="Username" aria-describedby="basic-addon1"/></p>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Thoát
                </Button>
                <Button onClick={() => handleEditPF()} variant="primary">Xác nhận</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showP}
                onHide={handleCloseP}
                backdrop="static"
                keyboard={false}
                className="text-black"
            >
                <Modal.Header closeButton>
                <Modal.Title>Đổi mật khẩu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="">User Name:</label>
                    <p><input value={name} onChange={''} type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"/></p>
                    <label htmlFor="">Mật khẩu hiện tại:</label>
                    <p><input value={passwordCur} onChange={(e) => setPasswordCur(e.target.value)} type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/></p>
                    <label htmlFor="">Mật khẩu mới:</label>
                    <p><input value={passwordNew1} onChange={(e) => setPasswordNew1(e.target.value)} type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/></p>
                    <label htmlFor="">Xác nhận khẩu mới:</label>
                    <p><input value={passwordNew2} onChange={(e) => setPasswordNew2(e.target.value)} type="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1"/></p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseP}>
                    Thoát
                </Button>
                <Button onClick={() => handleChangePass()} variant="primary">Xác nhận</Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    );
}

export default infoUser;
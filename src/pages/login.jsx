/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosCus } from "../axios/axios";
import { URLlogin } from "../URL/url";
import { useDispatch, useSelector } from 'react-redux'
import { SetAuth, SetIdTaiKhoan } from "../redux/authSlice";
import firebase from "../firebase";

function login() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const [register, setRegister] = useState(false)
    const [email, setEmail] = useState()
    const [SDT, setSDT] = useState()
    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const isUser = localStorage.getItem('isUser') === 'true';
        if(isUser === true)
            navigate('../')
        if(isAuth === true || isLoggedIn === true)
            navigate('../admin')
    }, []) 

    const handleBack = () => {
        navigate('/')
    }

    const setupCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button',{
            size: 'invisible',
            defaultCountry: 'VN',
        })
    }

    useEffect(() => {
        setupCaptcha();
    },[])

    const handleSendOTP = async () => {
        const appVerify = window.recaptchaVerifier;
        await firebase.auth().signInWithPhoneNumber(SDT, appVerify)
        .then((res) => {
            window.confirmationResult = res;
            alert("Gửi thành công")
        })
        .catch((err) => {
            alert("Thất bại", err);
        })
    }

    const [otp, setOTP] = useState();

    const handleVerifyOTP = () => {
        window.confirmationResult
        .confirm(otp)
        .then(() => {
            alert("Xác nhận thành công");
            toast.success('Đăng kí thành công', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            setRegister(!register)
        })
        .catch((err) => {
            console.error(err);
            alert("Xác nhận thất bại")
        })
    }

    const handleLogin = async (name, password) => {
        try {
            if(register === true) {
                const response = await axiosCus.post(`Account/register`, {
                    email: email,
                    image: image,
                    sdt: SDT,
                    userName: name,
                    password: password,
                  });

                  handleSendOTP()

                  if(response) {
                    ''
                  } else {
                    toast.error('Tài khoản đã tồn tại hoặc lỗi thông tin', {
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
            } else {
                const response = await axiosCus.post(`${URLlogin}`, {
                    userName: name,
                    password: password
                });
            
                // Xử lý dữ liệu trả về nếu cần thiết
                if(response.phanQuyen === 'admin') {
                    toast.success('Thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                    localStorage.setItem('isLoggedIn', true);
                    localStorage.setItem('visible', response.visible.trim());
                    dispatch(SetIdTaiKhoan(response.idTaiKhoan))
                    dispatch(SetAuth(true))
                    navigate('../admin')
                } else if (response.phanQuyen === 'user') {
                    toast.success('Thành công', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        });
                        localStorage.setItem('isUser', true);
                        dispatch(SetIdTaiKhoan(response.idTaiKhoan))
                        navigate('../')
                } 
                else {
                    toast.error('Sai mật khẩu hoặc tài khoản', {
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
          } catch (error) {
            // Xử lý lỗi
            console.error("Error updating product:", error);
          }
    }

    const handlePressEnter = (e) => {
        if(e.key === 'Enter') {
            handleLogin()
        }
    }

    return (
        <div className="bg-white text-black">
            <div className='login col-11 col-sm-4'>
            <div className='title'>{register ? "Đăng kí" : "Đăng nhập"}</div>
            <input 
                type="text" 
                placeholder='Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <div className='wrap-password'>
                <input 
                    type={isShowPassword === true ? 'text' : 'password'} 
                    placeholder='Password'
                    value={password}
                    onKeyDown={(e) => handlePressEnter(e)}
                    onChange={(e) => setPassword(e.target.value)}                    
                />
                <i 
                    className={isShowPassword ? "fa-solid fa-eye" : 'fa-sharp fa-solid fa-eye-slash'}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
            </div>
            {register && 
            <>
                <input 
                type="text" 
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='SDT'
                value={SDT}
                onChange={(e) => setSDT(e.target.value)}
            />
            <input 
                type="text" 
                placeholder='Link Avatar'
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            </>
            }
            <span onClick={() => setRegister(!register)}>{register ? "Đăng nhập" : "Đăng kí"}</span>
            <button 
                id="sign-in-button"
                className={name && password ? 'active' : ''}
                disabled = {name && password ? false : true}
                onClick={() => handleLogin(name, password)}
            >
                &nbsp; {register ? 'Đăng kí' : 'Đăng nhập'}
            </button>
            {register && 
            <>
            <div className="mt-3">
                <input 
                    type="text" 
                    placeholder='OTP'
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                />
                <button onClick={() => handleVerifyOTP()} className="btn btn-primary" >Xác nhận OTP</button>
            </div>
            </>
            }
            <div className='goBack'>
                <span onClick={() => {handleBack()}}>
                    <i className="fa-solid fa-angle-left mx-1"></i>
                    Go back
                </span>
            </div>
        </div>
        </div>
    );
}

export default login;
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosCus } from "../axios/axios";
import { URLlogin } from "../URL/url";
import { useDispatch, useSelector } from 'react-redux'
import { SetAuth } from "../redux/authSlice";

function login() {
    const isAuth = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [isShowPassword, setIsShowPassword] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if(isAuth === true || isLoggedIn === true)
            navigate('../admin')
    }, []) 

    const handleBack = () => {
        navigate('/')
    }

    const handleLogin = async (name, password) => {
        try {
            const response = await axiosCus.post(`${URLlogin}`, {
                userName: name,
                password: password
            });
        
            // Xử lý dữ liệu trả về nếu cần thiết
            console.log(response);
            if(response) {
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
                dispatch(SetAuth(true))
                navigate('../admin')
            } else {
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
            <div className='title'>Log in</div>
            <input 
                type="text" 
                placeholder='Email or Username'
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
            <button 
                className={name && password ? 'active' : ''}
                disabled = {name && password ? false : true}
                onClick={() => handleLogin(name, password)}
            >
                &nbsp; Log in
            </button>
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
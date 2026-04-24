import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/AllAPI'
import { toast } from 'react-toastify'
import { loginResponseContext } from '../../ContextAPI/ContextAPI'










function Auth({ insideRegister }) {
    const navigate = useNavigate()

    const [userDetails, setUserDetails] = useState({ name: "", phoneNo: "", email: "", password: "" })
    console.log(userDetails);

    const { setLoginResponse } = useContext(loginResponseContext)

    const handleRegister = async () => {
        try {
            const result = await registerAPI(userDetails)
            if (result.status == 200) {
                toast.success("Registered Succesfully , Please Login to explore!")
                navigate('/login')
                setUserDetails({ name: "", phoneNo: "", email: "", password: "" })
            }
            else if (result.status == 403) {
                toast.warning(result.response.data)
            }
        } catch (err) {
            console.error(err);

        }

    }

    const handleLogin = async () => {
        try {
            const result = await loginAPI(userDetails)
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token)
                sessionStorage.setItem("user", JSON.stringify(result.data.user))
                setLoginResponse(result.data)
                const user = JSON.parse(sessionStorage.getItem("user"))
                if (user.userType == "admin") {
                    navigate('/admin')
                    window.location.reload();

                }
                else if (user.userType == "user") {
                    navigate('/home')
                    window.location.reload();

                }
                else {
                    navigate('/')
                    toast.error("Please login again !!!")
                }
            }
            else {
                if (result.status == 404) {
                    toast.error(result.response.data)
                }
            }

        }
        catch (err) {
            console.error(err);

        }

    }













    return (
        <>
            <div className='container'>
                <div className='text-center my-5'>
                    <h1>Sign {insideRegister ? "Up" : "In"}</h1>
                </div>
                <div className='row shadow m-5'>
                    <div className="col-lg-6">
                        <img className='p-5' width={"100%"} src="https://www.pngall.com/wp-content/uploads/15/Login-PNG-HD-Image.png" alt="" />
                    </div>
                    <div className="col-lg-6 mt-5 d-flex align-items-center justify-content-center flex-column">
                        {
                            insideRegister &&
                            <input value={userDetails.name} onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} placeholder='Name' className='form-control w-75 mt-4 ms-5' type="text" name="" id="" />

                        }
                        {
                            insideRegister &&
                            <input value={userDetails.phoneNo} onChange={(e) => setUserDetails({ ...userDetails, phoneNo: e.target.value })} placeholder='Phone Number' className='form-control w-75 mt-4 ms-5' type="text" name="" id="" />
                        }
                        <input value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} placeholder='Email' className='form-control mt-4 w-75 ms-5' type="text" name="" id="" />
                        {
                            insideRegister ?
                                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} placeholder='Password' className='form-control mt-4 w-75 ms-5' type="text" name="" id="" />
                                :
                                <input value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} placeholder='Password' className='form-control mt-4 w-75 ms-5' type="password" name="" id="" />

                        }
                        {
                            insideRegister ?
                                <div className='text-center'>
                                    <button onClick={handleRegister} className='btn btn-primary mt-5 '>Sign UP</button>
                                </div>
                                :
                                <div className='text-center'>
                                    <button onClick={handleLogin} className='btn btn-primary mt-5'>Sign In</button>
                                </div>
                        }

                        {
                            insideRegister ?
                                <div className='text-center mt-3'>
                                    <p>Already Registered ? <Link to={'/login'}>Login Here!</Link></p>
                                </div>
                                :
                                <div className='text-center mt-3'>
                                    <p>New Here? <Link to={'/register'}>Register Here!</Link></p>
                                </div>
                        }


                    </div>

                </div>

            </div>


        </>
    )
}

export default Auth
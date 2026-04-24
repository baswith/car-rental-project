import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ServerURL from '../Services/ServerURL';


function Car() {
    const navigate=useNavigate()


    const [carInfo, setCarInfo] = useState(JSON.parse(sessionStorage.getItem('CarInfo')))
    (carInfo);






    return (
        <>
            <div className='container'>
                <div className='row mt-5 p-5 shadow'>
                    <div className="col-lg-6 p-3 mt-4">
                        <img style={{ width: "100%" }} src={`${ServerURL}/carImages/${carInfo.CarImg}`} alt={carInfo.CarImg} />

                    </div>
                    <div className="col-lg-6 p-5">
                        <h2>{carInfo.CarName}</h2>
                        <h5 className='mt-4'>Registration Number : {carInfo.RegNo}</h5>
                        <h5>Year : {carInfo.Year} </h5>
                        <h5>Body Type : {carInfo.BodyType} </h5>
                        <h5>Transmission : {carInfo.Transmission} </h5>
                        <h5>Seating Capacity : {carInfo.Seat} </h5>
                        <h5>Availability : {carInfo.Availability}  </h5>
                        <h3 className='mt-5'> Rs {carInfo.Price} /Day</h3>

                    </div>
                </div>
                <div className='d-flex justify-content-center align-items-center flex-column mt-4'>
                    
                        {carInfo.Availability == 'Available' ?
                            <button onClick={()=>navigate('/checkout')} className='btn btn-primary'>Book Now</button>:
                            <button disabled className='btn btn-primary'>Unavailable</button>}


                   
                </div>







            </div>

        </>
    )
}

export default Car
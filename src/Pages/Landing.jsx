import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Category from './Category'
import { loginResponseContext } from '../../ContextAPI/ContextAPI'


function Landing() {
  const navigate = useNavigate()

  const { loginResponse } = useContext(loginResponseContext)

  useEffect(() => {
    navigate('/')
    

  }, [loginResponse])



  return (
    <>
      <div className='container'>
        <div className='row my-5'>
          <div className="col-lg-7">
            <h1 className='mt-5'>Rent the Perfect Car in Minutes</h1>
            <p className='mb-5'>Whether you're commuting across town, planning a scenic road trip, or simply need a reliable vehicle for the day, our car rental platform offers a seamless experience from search to steering wheel. With a wide range of vehicles, flexible booking options, and secure payments, we make every journey smooth, affordable, and stress-free</p>
            <div className='text-center'>

              {
                sessionStorage.getItem("token") ?
                  <>
                    <Link to='/home'> <button className='btn btn-primary me-5 mt-3'>Explore</button></Link>
                  </>
                  :
                  <>
                    <Link to='/register'><button className='btn btn-primary mt-1 me-4'>Register</button></Link>
                    <Link to='/login'><button className='btn btn-primary me-5'>Login</button></Link> <br />
                  </>





              }




            </div>

          </div>
          <div className="col-lg-5 p-5">
            <img className='' width={"100%"} src="https://unblast.com/wp-content/uploads/2020/09/Car-Rent-Vector-Illustration.jpg" alt="" />
          </div>

        </div>

        <div>
          <h2 className='text-center'>Why Choose Us</h2>
          <div className='row mt-3 mx-5 ' style={{ minHeight: "40vh", textAlign: 'justify' }}>
            <div className="col-lg-3 p-5 shadow">
              <h4>Diverse Fleet for Every Need</h4>
              <p className='fw-bolder'>From compact hatchbacks to spacious SUVs and luxury sedans, we’ve got the perfect car for every journey.</p>



            </div>

            <div className="col-lg-3 p-5 shadow">
              <h4>Flexible Booking Options</h4>
              <p className='fw-bolder'>Rent by the hour, day, or week. Modify or cancel anytime with ease.</p>


            </div>
            <div className="col-lg-3 p-5 shadow" >
              <h4>Transparent Pricing</h4>
              <p className='fw-bolder'>No hidden fees. What you see is exactly what you pay.</p>

            </div>
            <div className="col-lg-3 p-5 shadow" >
              <h4>Real-Time Availability</h4>
              <p className='fw-bolder'>Our live inventory ensures you get the car you want, when you want it.</p>

            </div>

          </div>

        </div>

        <div className='mt-5'>
          <Category />

        </div>

      </div>
    </>
  )
}

export default Landing
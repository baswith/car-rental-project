import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { viewHomeCarsAPI } from '../Services/AllAPI';
import ServerURL from '../Services/ServerURL';
import ManageProfile from '../Components/ManageProfile';



function Home() {

    const [carDetails, setCarDetails] = useState()
    console.log(carDetails);


    const getCarDetails = async () => {
        try {
            const result = await viewHomeCarsAPI()
            if (result) {
                setCarDetails(result.data)
            }


        }
        catch (err) {
            console.log(err);

        }
    }
    const carInfo = (info) => {
        const result = sessionStorage.setItem('CarInfo', JSON.stringify(info))
    }

    useEffect(() => {
        sessionStorage.removeItem('CarInfo')
    }, [])


    useEffect(() => {
        getCarDetails()
    }, [])




    return (
        <>
            <div className='p-5 m-5 shadow ' style={{ backgroundImage: `url("https://wallpapercave.com/wp/wp2260610.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

                <h1 className='text-light fw-bold display-3' style={{ textAlign: 'left' }}>Drive Your Dream <br /> Car Today!</h1>
                <p className='text-light lead'>Affordable. Reliable. Just a click away.</p>
                <Link to={'/category'}>
                    <button className='btn btn-light'>Book Now</button>

                </Link>
            </div>

            <div className=''>
                <h1 className='text-center ps-5'>Popular Rentals</h1>
                <div className='row ps-5 ms-4'>
                    {carDetails?.map(pro => (
                        <div className='card col-lg-4 mt-4 col-md-6 col-sm-12'>
                            <Card className='p-3 shadow' style={{ width: '18rem', height: '26rem', minHeight: "350px" }}>
                                <Card.Img style={{ minHeight: "165px", maxHeight: "165px" }} className='img-fluid' variant="top" src={`${ServerURL}/carImages/${pro.CarImg}`} />
                                <Card.Body>
                                    <Card.Title>{pro.CarName}</Card.Title>
                                    <Card.Text>
                                        Registration Number : <br /> {pro.RegNo} <br />
                                        Fuel Type : {pro.Fuel}  <br />
                                        Transmission : {pro.Transmission}
                                    </Card.Text>
                                    <Link to={'/car'}> <Button onClick={() => carInfo(pro)} variant="primary">Know More</Button></Link>
                                </Card.Body>
                            </Card>


                        </div>
                    ))}
                </div>
                <div className='text-center mt-5 d-flex justify-content-around'>
                    <Link to={'/all-cars'}><button className='btn btn-primary'>Show All Cars</button></Link>
                    <ManageProfile />
                </div>

            </div>
            <hr />

            <div className='my-5 container'>
                <h1 className='text-center mb-5'>Why Choose Us?</h1>
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



        </>
    )
}

export default Home
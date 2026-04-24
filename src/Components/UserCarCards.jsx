import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ServerURL from '../Services/ServerURL';
import { useEffect } from 'react';

function UserCarCards({ carDetails }) {
    (carDetails);


    const carInfo = (info) => {
        const result = sessionStorage.setItem('CarInfo', JSON.stringify(info))
    }

    useEffect(() => {
        sessionStorage.removeItem('CarInfo')
    }, [])


    return (
        <>


            <div className='row'>

                {carDetails.length > 0 ?
                    carDetails.map(pro => (
                        <div className='my-5 col-lg-4 col-sm-12 col-md-6'>
                            <Card className='p-3 shadow' style={{ width: '18rem', height: '26rem', minHeight: "350px" }}>
                                <Card.Img style={{ minHeight: "165px", maxHeight: "165px" }} className='img-fluid' variant="top" src={`${ServerURL}/carImages/${pro.CarImg}`} />
                                <Card.Body>
                                    <Card.Title>{pro.CarName}</Card.Title>
                                    <Card.Text>
                                        Registration Number : <br /> {pro.RegNo} <br />
                                        Fuel Type : {pro.Fuel} <br />
                                        Transmission : {pro.Transmission}
                                    </Card.Text>
                                    <Link to={'/car'}> <Button onClick={() => carInfo(pro)} variant="primary">Know More</Button></Link>
                                </Card.Body>
                            </Card>
                        </div>
                    )) :
                    <div className='d-flex justify-content-center align-items-center my-5'>
                        <h1 className='text-danger my-5'>No Cars Found</h1>
                    </div>}



            </div>
        </>
    )
}

export default UserCarCards
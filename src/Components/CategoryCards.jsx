import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import ServerURL from '../Services/ServerURL';
import { bodyTypeContext } from '../../ContextAPI/ContextAPI';




function CategoryCards() {



  const { bodyType } = useContext(bodyTypeContext)



  const [carDetails, setCarDetails] = useState(JSON.parse(sessionStorage.getItem('BodyType')))
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

        <h1 className='text-center'></h1>
        {
          carDetails.length>0?
            carDetails.map(pro => (
              <div className='p-5 col-lg-4 '>
                <Card className='p-3 shadow' style={{ width: '18rem', height: '26rem', minHeight: "350px" }}>
                  <Card.Img style={{ minHeight: "160px", maxHeight: "161px" }} variant="top" src={`${ServerURL}/carImages/${pro.CarImg}`} />
                  <Card.Body>
                    <Card.Title>{pro.CarName}</Card.Title>
                    <Card.Text>
                      Registration Number :{pro.RegNo} <br />
                      Fuel Type : {pro.Fuel}  <br />
                      Transmission : {pro.Transmission}
                    </Card.Text>
                    <Link to={'/car'}> <Button onClick={() => carInfo(pro)} variant="primary">Know More</Button></Link>
                  </Card.Body>
                </Card>
              </div>
            ))
            :
            <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "52vh" }}><h1 className='text-center text-danger my-5'>NO CARS AVAILABLE RIGHT NOW</h1></div>
        }
      </div>

    </>
  )
}

export default CategoryCards
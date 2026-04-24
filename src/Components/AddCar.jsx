import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addCarAPI } from '../Services/AllAPI';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useContext } from 'react';
import { addResponseContext } from '../../ContextAPI/ContextAPI';



function AddCar() {

    const [carDetails, setCarDetails] = useState({ CarName: "", Year: "", RegNo: "", BodyType: "", Fuel: "", Transmission: "", Seat: "", Price: "", CarImg: "" })


    const [preview,setPreview]=useState("https://www.svgrepo.com/show/447637/file-upload.svg")

    const [show, setShow] = useState(false);

    const {setAddResponse}=useContext(addResponseContext)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        if(carDetails.CarImg.type=="image/png" || carDetails.CarImg.type=="image/jpg" || carDetails.CarImg.type=="image/jpeg"){
            setPreview(URL.createObjectURL(carDetails.CarImg))
        }
        else{
            setPreview("https://www.svgrepo.com/show/447637/file-upload.svg")
        }


    }, [carDetails.CarImg])
    

    const handleUpload = async () => {
        const { CarName, Year, RegNo, BodyType, Fuel, Transmission, Seat, Price, CarImg } = carDetails
        if (CarName && Year && RegNo && BodyType && Fuel && Transmission && Seat && Price && CarImg) {

            const reqBody = new FormData()
            reqBody.append("CarName", CarName)
            reqBody.append("Year", Year)
            reqBody.append("RegNo", RegNo)
            reqBody.append("BodyType", BodyType)
            reqBody.append("Fuel", Fuel)
            reqBody.append("Transmission", Transmission)
            reqBody.append("Seat", Seat)
            reqBody.append("Price", Price)
            reqBody.append("CarImg", CarImg)



            const token = sessionStorage.getItem("token")
            if (token) {
                const reqHeader = {
                    "content-type": "multipart/form-data",
                    "authorization": `Bearer ${token}`
                }
                try {
                    const result = await addCarAPI(reqBody, reqHeader)


                    if (result.status == 200) {
                        handleClose()
                        toast.success("Car added succesfully")
                        setPreview("https://www.svgrepo.com/show/447637/file-upload.svg")
                        setAddResponse(result.data)
                    }
                    else if (result.status == 403) {
                        toast.error(result.response.data)
                    }


                }
                catch (err) {
                    console.error(err);

                }
            }



        }
        else {
            toast.warning("Please fill the form !!!")
        }
    }



    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add New Car
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className=''>
                            <label> <input onChange={(e) => setCarDetails({ ...carDetails, CarImg: e.target.files[0] })} type="file" name="" id="" hidden /> <img style={{ width: "20%", height: "20%" }} src={preview} alt="" /> <br /><h5>Upload Image</h5></label>
                        </div>
                        <div>
                            <input onChange={(e) => setCarDetails({ ...carDetails, CarName: e.target.value })} placeholder='Car Name' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, Year: e.target.value })} placeholder='Year' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, RegNo: e.target.value })} placeholder='Registration Number' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, BodyType: e.target.value })} placeholder='Body Type' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, Fuel: e.target.value })} placeholder='Fuel' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, Transmission: e.target.value })} placeholder='Transmission' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, Seat: e.target.value })} placeholder='Seating Capacity' className='form-control mt-2' type="text" name="" id="" />
                            <input onChange={(e) => setCarDetails({ ...carDetails, Price: e.target.value })} placeholder='Base Price' className='form-control mt-2' type="text" name="" id="" />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleUpload} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddCar
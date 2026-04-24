import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UpdateCar from './UpdateCar';
import { deleteCarAPI, viewAllCarAPI } from '../Services/AllAPI';
import { toast } from 'react-toastify';
import ServerURL from '../Services/ServerURL';
import { useContext } from 'react';
import { deleteResponseContext } from '../../ContextAPI/ContextAPI';






function AdminCarCard({ carDetails }) {

    const { setDeleteResponse } = useContext(deleteResponseContext)

    const handleDelete = async (id) => {
        try {
            const result = await deleteCarAPI(id)
            console.log(result);
            if (result.status == 200) {
                toast.success("Car Deleted Succesfully")
                setDeleteResponse(result.data)

            }
            else {
                toast.warning(result.response.data)
                setDeleteResponse(result.data)
            }


        } catch (err) {
            console.error(err);

        }

    }







    return (
        <>
            <div className='row ms-4' style={{minHeight:"20vh"}}>
                {
                    carDetails.length > 0 ?
                        carDetails?.map(pro => (
                            <div className='col-lg-4 col-sm-12 col-md-6 text-center '>
                                <Card className='p-3 mt-4 shadow' style={{ width: '19rem', height: "24rem" }}>
                                    <Card.Img className='img-fluid' style={{ minHeight: "160px", maxHeight: "161px" }} variant="top" src={`${ServerURL}/carImages/${pro.CarImg}`} />
                                    <Card.Body>
                                        <Card.Title>{pro.CarName}</Card.Title>
                                        <Card.Text>
                                            Registration No : <br /> {pro.RegNo} <br />
                                            Price : {pro.Price} /-

                                        </Card.Text>
                                        <UpdateCar pro={pro} />
                                        <Button onClick={() => handleDelete(pro.RegNo)} variant="danger">Delete</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        )) :
                        <h1 className='text-center text-danger'>NO CARS FOUND</h1>

                }

            </div>

        </>
    )
}

export default AdminCarCard
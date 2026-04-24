import React, { useEffect, useState } from 'react'
import { deleteHistoryAPI, viewAllBookingAPI } from '../Services/AllAPI'
import AdminHeader from '../Components/AdminHeader'


function AdminBookingHistory() {

    const [bookingDetails, setBookingDetails] = useState([])

    const viewAllBooking = async () => {
        const result = await viewAllBookingAPI()
        if (result.status == 200) {
            setBookingDetails(result.data)
            (result);
            
        }

    }



    const getBookingStatus = (startDate, endDate) => {
        const now = new Date()
        const start = new Date(startDate)
        const end = new Date(endDate)

        if (now < start) return 'Upcoming'
        else if (now >= start && now <= end) return 'Ongoing'
        else return 'Completed'
    }

    useEffect(() => {
        viewAllBooking()

    }, [])



    return (
        <>
            <AdminHeader />
            <div>
                <h1 className='text-center mt-4'>All Bookings And Details</h1>
                {
                    bookingDetails.length > 0 ?
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>SI NO</th>
                                    <th>Car Name</th>
                                    <th>Reg No</th>
                                    <th>User Name</th>
                                    <th>Address</th>
                                    <th>Phone No</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookingDetails.map((pro, ind) => {
                                        const status = getBookingStatus(pro.StartDate, pro.EndDate)
                                        return (
                                            <tr>
                                                <td>{ind + 1}</td>
                                                <td>{pro.CarName}</td>
                                                <td>{pro.RegNo}</td>
                                                <td>{pro.name}</td>
                                                <td>{pro.address}</td>
                                                <td>{pro.phoneNo}</td>
                                                <td>{pro.StartDate.split("T")[0]}</td>
                                                <td>{pro.EndDate.split("T")[0]}</td>
                                                <td>{status}</td>
                                                {/* <td><button className='btn btn-danger'>Delete</button></td> */}

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                        :
                        <div className='d-flex justify-content-center align-items-center' style={{ minHeight: "50vh" }}><h1 className='text-danger text-center my-5'>No Bookings Made !</h1></div>
                }
            </div>

        </>
    )
}

export default AdminBookingHistory
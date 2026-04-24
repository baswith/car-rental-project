import React, { useEffect, useState } from "react";
import { deleteHistoryAPI, viewBookingAPI } from "../Services/AllAPI";

function BookingHistory() {
  const [userId, setUserId] = useState(
    JSON.parse(sessionStorage.getItem("user")),
  );

  const [bookingHistory, setBookingHistory] = useState([]);

  const handleBooking = async () => {
    try {
      const result = await viewBookingAPI(userId._id);
      if (result.status == 200) {
        setBookingHistory(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };
  const getBookingStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "Upcoming";
    else if (now >= start && now <= end) return "Ongoing";
    else return "Completed";
  };

  const deleteHistory = async (RegNo) => {
    const result = await deleteHistoryAPI(RegNo);
    if (result.status == 200) {
      handleBooking();
    }
  };

  useEffect(() => {
    handleBooking();
  }, []);

  return (
    <>
      <div className="container" style={{ minHeight: "100vh" }}>
        <h1 className="text-center my-5 text-decoration-underline">
          Booking History
        </h1>
        {bookingHistory.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>SI No</th>
                <th>Reg No</th>
                <th>Car Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((pro, ind) => {
                const status = getBookingStatus(pro.StartDate, pro.EndDate);
                return (
                  <tr>
                    <td>{ind + 1}</td>
                    <td>{pro.CarName}</td>
                    <td>{pro.RegNo}</td>
                    <td>{pro.StartDate.split("T")[0]}</td>
                    <td>{pro.EndDate.split("T")[0]}</td>
                    <td>{pro.totalPrice}</td>
                    <td>{status} </td>
                    <td>
                      {status == "Upcoming" ? (
                        <button
                          onClick={() => deleteHistory(pro.RegNo)}
                          className="btn btn-danger"
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className="text-muted">Not Allowed</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center text-danger">No Bookings Made Yet!!</h1>
        )}
      </div>
    </>
  );
}

export default BookingHistory;

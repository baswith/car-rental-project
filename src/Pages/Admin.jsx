import React from "react";
import AddCar from "../Components/AddCar";
import AdminCarCard from "../Components/AdminCarCard";
import { useContext } from "react";
import {
  addResponseContext,
  deleteResponseContext,
  editResponseContext,
} from "../../ContextAPI/ContextAPI";
import { useEffect } from "react";
import { useState } from "react";
import { viewAllCarAPI } from "../Services/AllAPI";
import AdminHeader from "../Components/AdminHeader";

function Admin() {
  const { addResponse } = useContext(addResponseContext);
  const { deleteResponse } = useContext(deleteResponseContext);
  const { editResponse } = useContext(editResponseContext);

  const [carDetails, setCarDetails] = useState([]);

  const [search, setSearch] = useState("");

  const handleView = async () => {
    try {
      const result = await viewAllCarAPI(search);
      if (result.status == 200) {
        setCarDetails(result.data);
      } else if (result.status == 404) {
        toast.error(result.response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleView();
  }, [addResponse, deleteResponse, editResponse, search]);

  return (
    <>
      <AdminHeader />
      <div className="container">
        <div className="my-5">
          <div className="d-flex justify-content-around">
            <h1>Welcome Admin</h1>
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Car By Name"
              className="form-control w-50"
              type="search"
              name=""
              id=""
            />
          </div>

          <div className="d-flex justify-content-around">
            <div className="text-center mt-5">
              {" "}
              <AddCar />
            </div>
            <div>
              <a href="/view-all-booking">
                <button className="btn btn-primary mt-5">
                  View All Booking
                </button>
              </a>
            </div>
          </div>

          <div className="mt-4">
            {" "}
            <AdminCarCard carDetails={carDetails} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;

import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateCarAPI } from "../Services/AllAPI";
import { toast } from "react-toastify";
import ServerURL from "../Services/ServerURL";
import { editResponseContext } from "../../ContextAPI/ContextAPI";

function UpdateCar({ pro }) {
  const [carDetails, setCarDetails] = useState({
    CarName: pro.CarName,
    Year: pro.Year,
    RegNo: pro.RegNo,
    BodyType: pro.BodyType,
    Fuel: pro.Fuel,
    Transmission: pro.Transmission,
    Seat: pro.Seat,
    Price: pro.Price,
    Availability: pro.Availability,
    CarImg: pro.CarImg,
  });

  const [preview, setPreview] = useState("");
  const { CarImg } = carDetails;

  const { setEditResponse } = useContext(editResponseContext);

  const handleUpload = async (id) => {
    const {
      CarName,
      Year,
      RegNo,
      BodyType,
      Fuel,
      Transmission,
      Seat,
      Price,
      CarImg,
      Availability,
    } = carDetails;
    if (
      CarName &&
      Year &&
      RegNo &&
      BodyType &&
      Fuel &&
      Transmission &&
      Seat &&
      Price &&
      CarImg
    ) {
      const token = sessionStorage.getItem("token");
      if (token) {
        const reqHeader = {
          "content-type": preview ? "multipart/form-data" : "application/json",
          authorization: `Bearer ${token}`,
        };
        const reqBody = new FormData();
        reqBody.append("CarName", CarName);
        reqBody.append("Year", Year);
        reqBody.append("RegNo", RegNo);
        reqBody.append("BodyType", BodyType);
        reqBody.append("Fuel", Fuel);
        reqBody.append("Transmission", Transmission);
        reqBody.append("Seat", Seat);
        reqBody.append("Price", Price);
        reqBody.append("CarImg", CarImg);
        reqBody.append("Availability", Availability);

        try {
          const result = await updateCarAPI(id, reqBody, reqHeader);

          if (result.status == 200) {
            toast.success("Car Details updated successfully");
            setEditResponse(result);
            handleClose();
          }
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      toast.warning("Please fill the form !!!");
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (
      CarImg.type == "image/png" ||
      CarImg.type == "image/jpg" ||
      CarImg.type == "image/jpeg"
    )
      setPreview(URL.createObjectURL(carDetails.CarImg));
  }, [carDetails.CarImg]);

  return (
    <>
      <Button className="me-3" variant="warning" onClick={handleShow}>
        Update
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Car Status and Price</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="">
              <label>
                {" "}
                <input
                  onChange={(e) =>
                    setCarDetails({ ...carDetails, CarImg: e.target.files[0] })
                  }
                  type="file"
                  name=""
                  id=""
                  hidden
                />{" "}
                <img
                  style={{ width: "20%", height: "20%" }}
                  src={
                    preview
                      ? preview
                      : `${ServerURL}/carImages/${carDetails.CarImg}`
                  }
                  alt=""
                />{" "}
                <br />
                <h5>Edit Image</h5>
              </label>
            </div>
            <div>
              <select
                value={carDetails.Availability}
                onChange={(e) =>
                  setCarDetails({ ...carDetails, Availability: e.target.value })
                }
                className="form-control"
                name="dropdown"
              >
                <option value="Available">Available</option>
                <option value="Under Maintenance">Under Maintenance</option>
                <option value="Booked">Booked</option>
              </select>
              <input
                onChange={(e) =>
                  setCarDetails({ ...carDetails, Price: e.target.value })
                }
                value={carDetails.Price}
                placeholder="Base Price"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, CarName: e.target.value })
                }
                value={carDetails.CarName}
                placeholder="Car Name"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, Year: e.target.value })
                }
                value={carDetails.Year}
                placeholder="Year"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, RegNo: e.target.value })
                }
                value={carDetails.RegNo}
                placeholder="Registration Number"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, BodyType: e.target.value })
                }
                value={carDetails.BodyType}
                placeholder="Body Type"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, Fuel: e.target.value })
                }
                value={carDetails.Fuel}
                placeholder="Fuel"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, Transmission: e.target.value })
                }
                value={carDetails.Transmission}
                placeholder="Transmission"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
              <input
                disabled
                onChange={(e) =>
                  setCarDetails({ ...carDetails, Seat: e.target.value })
                }
                value={carDetails.Seat}
                placeholder="Seating Capacity"
                className="form-control mt-2"
                type="text"
                name=""
                id=""
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => handleUpload(carDetails.RegNo)}
            variant="warning"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateCar;

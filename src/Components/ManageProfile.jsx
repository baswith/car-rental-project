import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateProfileAPI } from "../Services/AllAPI";
import { toast } from "react-toastify";

function ManageProfile() {
  const oldUserDetails = JSON.parse(sessionStorage.getItem("user"));

  const [userDetails, setUserDetails] = useState({
    name: oldUserDetails.name,
    phoneNo: oldUserDetails.phoneNo,
    email: oldUserDetails.email,
    password: oldUserDetails.password,
    userType: oldUserDetails.userType,
  });

  const handleUpdate = async (id) => {
    try {
      const result = await updateProfileAPI(id, userDetails);
      if (result.status == 200) {
        toast.success("Profile Updated Successfully");
        sessionStorage.setItem("user", JSON.stringify(result.data));
        handleClose();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update Profile
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile Updation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={userDetails.name}
            onChange={(e) =>
              setUserDetails({ ...userDetails, name: e.target.value })
            }
            placeholder="Name"
            className="form-control mt-3"
            type="text"
            name=""
            id=""
          />
          <input
            value={userDetails.phoneNo}
            onChange={(e) =>
              setUserDetails({ ...userDetails, phoneNo: e.target.value })
            }
            placeholder="Phone Number"
            className="form-control mt-3"
            type="text"
            name=""
            id=""
          />
          <input
            value={userDetails.email}
            className="form-control mt-3"
            placeholder="Email"
            disabled
            type="text"
            name=""
            id=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={() => {
              handleUpdate(userDetails.email);
            }}
            variant="primary"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ManageProfile;

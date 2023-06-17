import { useState } from "react";
import "../styles/Modal.css";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
}) => {
  const [payload, setPayload] = useState({
    location: "",
    address: "",
    status: "Inactive",
  });

  const handleChange = (e) => {
    e.stopPropagation();

    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  console.log(payload);

  return (
    <div
      className="modal"
      style={{ display: isModalOpen ? "block" : "none" }}
      onClick={(e) => {
        e.stopPropagation();
        setIsModalOpen(false);
      }}
    >
      <div
        className="modal-content"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="fields">
          <h2>Add new Location</h2>
          <input
            name="location"
            type="text"
            placeholder="Enter location name"
            onChange={handleChange}
          />
          <input
            name="address"
            type="text"
            placeholder="Enter location name"
            onChange={handleChange}
          />
          <select
            name="status"
            placeholder="Select Status"
            value={payload?.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {/* <button onClick={()=>} >Create</button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;

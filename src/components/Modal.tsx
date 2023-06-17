import { useEffect, useState } from "react";
import "../styles/Modal.css";
import { useMutation } from "@apollo/client";
import { CREATE_LOCATION } from "../GraphQL/Mutations";

const Modal = ({
  isModalOpen,
  setIsModalOpen,
  refetchList,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  refetchList: () => void;
}) => {
  const [payload, setPayload] = useState({
    name: "",
    address: "",
    status: "Active",
  });

  const handleChange = (e) => {
    e.stopPropagation();

    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const [createLocation, { data, error, loading }] =
    useMutation(CREATE_LOCATION);

  useEffect(() => {
    if (data?.locationCreate) {
      setIsModalOpen(false);

      refetchList();
    }
  }, [data]);

  useEffect(() => {
    if (!isModalOpen) {
      setPayload({
        name: "",
        address: "",
        status: "Active",
      });
    }
  }, [isModalOpen]);

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
          {error?.message && <h5 style={{ color: "red" }}>Error!</h5>}
          <input
            name="name"
            type="text"
            placeholder="Enter location name"
            onChange={handleChange}
          />
          <input
            name="address"
            type="text"
            placeholder="Enter adress"
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
          <button
            onClick={() => {
              createLocation({
                variables: {
                  requestBody: payload,
                  tenant: import.meta.env.VITE_TENANT,
                },
              });
            }}
            disabled={loading}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

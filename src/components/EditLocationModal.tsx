import { useEffect, useState } from "react";
import "../styles/Modal.css";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_LOCATION } from "../GraphQL/Mutations";
import { GET_LOCATIONS } from "../GraphQL/Queries";

const EditLocationModal = ({
  data,
  isModalOpen,
  setIsModalOpen,
  refetch,
}: {
  data: any;
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  refetch: () => void;
}) => {
  const [payload, setPayload] = useState({
    name: "",
    address: "",
    status: "",
    npi: "",
    taxId: "",
  });

  const tenant = import.meta.env.VITE_TENANT;

  const { refetch: refetchLocations } = useQuery(GET_LOCATIONS, {
    variables: { tenant, page: 1 },
    notifyOnNetworkStatusChange: true,
  });

  const handleChange = (e) => {
    e.stopPropagation();

    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const [updateLocation, { data: updateData, error, loading }] =
    useMutation(UPDATE_LOCATION);

  useEffect(() => {
    if (updateData?.locationUpdate) {
      setIsModalOpen(false);
      refetchLocations();
      refetch();
    }
  }, [updateData]);

  useEffect(() => {
    if (data) {
      setPayload({
        name: data.name,
        address: data.address,
        status: data.status,
        npi: data.npi,
        taxId: data.taxId,
      });
    }
  }, [data]);

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
          <h2>Edit new Location</h2>
          {error?.message && <h5 style={{ color: "red" }}>Error!</h5>}
          <input
            name="name"
            type="text"
            placeholder="Enter location name"
            onChange={handleChange}
            value={payload?.name}
          />
          <input
            name="address"
            type="text"
            placeholder="Enter adress"
            onChange={handleChange}
            value={payload?.address}
          />

          <input
            name="npi"
            type="text"
            placeholder="Enter NPI"
            onChange={handleChange}
            value={payload?.npi}
          />
          <input
            name="taxId"
            type="text"
            placeholder="Enter Tax ID"
            onChange={handleChange}
            value={payload?.taxId}
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
              updateLocation({
                variables: {
                  locationUpdateId: data.id,
                  requestBody: payload,
                  tenant: import.meta.env.VITE_TENANT,
                },
              });
            }}
            disabled={loading}
            style={{ padding: "5px 60px" }}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditLocationModal;

import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_LOCATION } from "../GraphQL/Mutations";
import { GET_LOCATIONS } from "../GraphQL/Queries";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";

const EditLocationModal = ({
  data,
  isOpen,
  onClose,
  refetch,
}: {
  data: any;
  isOpen: boolean;
  onClose: () => void;
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
      onClose();
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Flex direction={"column"} p={"30px"} gap={"20px"}>
          <Text fontSize={"24px"} fontWeight={"bold"}>
            Edit Location
          </Text>
          {error?.message && <h5 style={{ color: "red" }}>Error!</h5>}
          <Input
            name="name"
            type="text"
            placeholder="Enter location name"
            onChange={handleChange}
            value={payload?.name}
          />
          <Input
            name="address"
            type="text"
            placeholder="Enter adress"
            onChange={handleChange}
            value={payload?.address}
          />

          <Input
            name="npi"
            type="text"
            placeholder="Enter NPI"
            onChange={handleChange}
            value={payload?.npi}
          />
          <Input
            name="taxId"
            type="text"
            placeholder="Enter Tax ID"
            onChange={handleChange}
            value={payload?.taxId}
          />

          <Select
            name="status"
            placeholder="Select Status"
            value={payload?.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Select>
          <Button
            onClick={() => {
              updateLocation({
                variables: {
                  locationUpdateId: data.id,
                  requestBody: payload,
                  tenant: import.meta.env.VITE_TENANT,
                },
              });
            }}
            isLoading={loading}
          >
            Update
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default EditLocationModal;

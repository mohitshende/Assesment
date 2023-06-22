import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_LOCATION } from "../GraphQL/Mutations";
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

const AddLocationModal = ({
  isOpen,
  onClose,
  refetchList,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetchList: () => void;
}) => {
  const [payload, setPayload] = useState({
    name: "",
    address: "",
    status: "Active",
    npi: "",
    taxId: "",
  });

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const [createLocation, { data, error, loading }] =
    useMutation(CREATE_LOCATION);

  useEffect(() => {
    if (data?.locationCreate) {
      refetchList();
    }
  }, [data]);

  useEffect(() => {
    setPayload({
      name: "",
      address: "",
      status: "Active",
      npi: "",
      taxId: "",
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Flex direction={"column"} p={"30px"} gap={"20px"}>
          <Text fontSize={"24px"} fontWeight={"bold"}>
            Add New Location
          </Text>
          {error?.message && <h5 style={{ color: "red" }}>Error!</h5>}
          <Input
            name="name"
            type="text"
            placeholder="Enter location name"
            onChange={handleChange}
          />
          <Input
            name="address"
            type="text"
            placeholder="Enter adress"
            onChange={handleChange}
          />

          <Input
            name="npi"
            type="text"
            placeholder="Enter NPI"
            onChange={handleChange}
          />
          <Input
            name="taxId"
            type="text"
            placeholder="Enter Tax ID"
            onChange={handleChange}
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
            variant={"solid"}
            colorScheme={"messenger"}
            onClick={() => {
              createLocation({
                variables: {
                  requestBody: payload,
                  tenant: import.meta.env.VITE_TENANT,
                },
              });
              onClose();
            }}
            isLoading={loading}
          >
            Create
          </Button>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default AddLocationModal;

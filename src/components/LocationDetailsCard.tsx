import { useEffect, useState } from "react";
import { GET_LOCATION, GET_LOCATIONS } from "../GraphQL/Queries";
import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { DELETE_LOCATION } from "../GraphQL/Mutations";
import InlineEditInput from "./InlineEditInput";
import EditLocationModal from "./EditLocationModal";
import {
  Button,
  Flex,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, RepeatIcon } from "@chakra-ui/icons";

interface Resource {
  address: string;
  description: string;
  id: string;
  name: string;
  npi: string;
  status: string;
  taxId: string;
  tenant: string;
}

interface ILocationData {
  id: string;
  resource: Resource;
}
interface IShowEditData {
  fieldName: string;
  show: boolean;
}

const LocationDetailsCard = ({
  locationId,
  setLocationId,
}: {
  locationId: string;
  setLocationId: (id: string) => void;
}) => {
  const tenant = import.meta.env.VITE_TENANT;
  const [locationData, setLocationData] = useState<ILocationData>(null);
  const [showEditInput, setShowEditInput] = useState<IShowEditData>({
    fieldName: "",
    show: false,
  });

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATION, {
    variables: { locationReadId: locationId, tenant },
    notifyOnNetworkStatusChange: true,
  });

  const { refetch: refetchLocations } = useQuery(GET_LOCATIONS, {
    variables: { tenant },
  });

  const [deleteLocation, { data: deletedLocationData, loading: isDeleting }] =
    useMutation(DELETE_LOCATION);

  useEffect(() => {
    if (data) {
      setLocationData(data.locationRead);
      setShowEditInput({
        fieldName: "",
        show: false,
      });
    }
  }, [data]);

  useEffect(() => {
    if (deletedLocationData) {
      refetchLocations();
      setLocationId("");
    }
  }, [deletedLocationData]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  if (!locationId) {
    return (
      <Flex
        boxShadow={"2xl"}
        borderRadius={"4px"}
        width={"40vw"}
        padding={"10px"}
        justifyContent={"center"}
        pt={"50px"}
        fontWeight={"bold"}
        fontSize={"20px"}
      >
        Select location from the location list to view its details
      </Flex>
    );
  }

  return (
    <Flex
      boxShadow={"2xl"}
      borderRadius={"4px"}
      width={"40vw"}
      padding={"10px"}
    >
      {networkStatus === NetworkStatus.refetch || loading ? (
        <Flex h={"100%"} w={"100%"} p={"20px"}>
          <SkeletonText
            width={"100%"}
            mt="4"
            noOfLines={8}
            spacing="20px"
            skeletonHeight="20px"
          />
        </Flex>
      ) : (
        <Flex w={"100%"} direction={"column"} padding={"20px"} gap={"20px"}>
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            pt={"20px"}
            gap={"10px"}
          >
            <Button onClick={() => refetch()} isLoading={loading}>
              <RepeatIcon />
            </Button>
            <Text fontWeight={"bold"} fontSize={"25px"}>
              {locationData?.resource?.name}
            </Text>

            <Button
              isLoading={isDeleting}
              onClick={() =>
                deleteLocation({
                  variables: {
                    locationRemoveId: locationData?.id,
                    tenant: import.meta.env.VITE_TENANT,
                  },
                })
              }
              colorScheme="red"
              variant={"solid"}
            >
              <DeleteIcon />
            </Button>
          </Flex>
          <Flex
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            pt={"20px"}
            gap={"10px"}
          >
            <Flex justifyContent={"space-between"} w={"100%"}>
              <Text fontWeight={"bold"}>
                Address: {locationData?.resource?.address}
              </Text>
              {showEditInput.fieldName == "address" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
                  id={locationId}
                />
              ) : (
                <Button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "address",
                      show: true,
                    })
                  }
                >
                  <EditIcon />
                </Button>
              )}
            </Flex>

            <Flex justifyContent={"space-between"} w={"100%"}>
              <Text fontWeight={"bold"}>
                NPI: {locationData?.resource?.npi}
              </Text>
              {showEditInput.fieldName == "npi" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
                  id={locationId}
                />
              ) : (
                <Button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "npi",
                      show: true,
                    })
                  }
                >
                  <EditIcon />
                </Button>
              )}
            </Flex>

            <Flex justifyContent={"space-between"} w={"100%"}>
              <Text fontWeight={"bold"}>
                Status: {locationData?.resource?.status}
              </Text>
              {showEditInput.fieldName == "status" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
                  id={locationId}
                  value={locationData?.resource?.status}
                />
              ) : (
                <Button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "status",
                      show: true,
                    })
                  }
                >
                  <EditIcon />
                </Button>
              )}
            </Flex>

            <Flex justifyContent={"space-between"} w={"100%"}>
              <Text fontWeight={"bold"}>
                TaxId: {locationData?.resource?.taxId}
              </Text>
              {showEditInput.fieldName == "taxId" ? (
                <InlineEditInput
                  refetch={refetch}
                  field={showEditInput.fieldName}
                  id={locationId}
                />
              ) : (
                <Button
                  onClick={() =>
                    setShowEditInput({
                      ...showEditInput,
                      fieldName: "taxId",
                      show: true,
                    })
                  }
                >
                  <EditIcon />
                </Button>
              )}
            </Flex>
          </Flex>
          <Button
            leftIcon={<EditIcon />}
            colorScheme="messenger"
            onClick={onOpen}
          >
            Edit Location
          </Button>
        </Flex>
      )}
      <EditLocationModal
        data={locationData?.resource}
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
      />
    </Flex>
  );
};

export default LocationDetailsCard;

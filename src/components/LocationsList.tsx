import { useEffect, useState } from "react";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_LOCATIONS } from "../GraphQL/Queries";
import PaginateComponent from "./PaginateComponent";
import {
  Badge,
  Button,
  Flex,
  Input,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon, RepeatIcon } from "@chakra-ui/icons";
import AddLocationModal from "./AddLocationModal";

export interface location {
  name: string;
  address: string;
  status: string;
  tenant: string;
  updatedAt: number;
  id: string;
}

const LocationsList = ({
  setLocationId,
}: {
  setLocationId: (id: string) => void;
}) => {
  const tenant = import.meta.env.VITE_TENANT;
  const [locations, setLocations] = useState<location[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { loading, data, refetch, networkStatus } = useQuery(GET_LOCATIONS, {
    variables: { tenant, page: pageNumber, limit: 5 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setLocations(data.locationList.resources);
    }
  }, [data, pageNumber]);

  const filterOptions = () => {
    if (searchText.length > 0) {
      return locations.filter((location) => location.name.includes(searchText));
    }
    return locations;
  };

  return (
    <Flex
      padding={"20px"}
      boxShadow={"2xl"}
      borderRadius={"4px"}
      h={"100%"}
      w={"30vw"}
      position={"relative"}
    >
      <Flex direction={"column"} w={"100%"} gap={"20px"}>
        <Flex direction={"column"} gap={"20px"}>
          <Flex justifyContent={"space-between"}>
            <Button onClick={() => refetch()} isLoading={loading}>
              <RepeatIcon />
            </Button>
            <Text fontSize={"25px"} fontWeight={"extrabold"}>
              Locations
            </Text>
            <Button onClick={onOpen}>
              <AddIcon />
            </Button>
          </Flex>
          <Input
            type="text"
            width={"100%"}
            placeholder="Search location by name"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Flex>

        {networkStatus === NetworkStatus.refetch || loading ? (
          <Flex direction={"column"} justifyContent={"center"} gap={"20px"}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <Skeleton key={idx} h={"78px"} w={"100%"} borderRadius={"4px"} />
            ))}
          </Flex>
        ) : (
          <Flex
            w={"100%"}
            direction={"column"}
            gap={"20px"}
            justifyContent={"center"}
          >
            {filterOptions()?.map((location) => {
              const date = new Date(location.updatedAt);
              return (
                <Flex
                  display={"flex"}
                  key={location.id}
                  onClick={() => {
                    setLocationId(location.id);
                  }}
                  padding={"10px"}
                  borderRadius={"4px"}
                  justifyContent={"space-between"}
                  cursor={"pointer"}
                  boxShadow={
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1),0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  }
                  _hover={{
                    boxShadow:
                      " 0 20px 25px -5px rgba(0, 0, 0, 0.1),0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <Flex direction={"column"} gap={"10px"}>
                    <Text fontWeight={"bold"}>{location.name}</Text>
                    <Text>{location.address}</Text>
                  </Flex>
                  <Flex direction={"column"} gap={"10px"}>
                    {location?.status?.toLowerCase() == "active" ? (
                      <Badge variant="solid" colorScheme="green">
                        {location.status}
                      </Badge>
                    ) : (
                      <Badge variant="solid" colorScheme="red">
                        {location.status}
                      </Badge>
                    )}
                    <Text>
                      {date.toLocaleString("en-IN", {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </Text>
                  </Flex>
                </Flex>
              );
            })}

            <PaginateComponent
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPages={data?.locationList.pages}
            />
          </Flex>
        )}
      </Flex>
      <AddLocationModal
        isOpen={isOpen}
        onClose={onClose}
        refetchList={refetch}
      />
    </Flex>
  );
};

export default LocationsList;

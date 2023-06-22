import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { Button, Flex, Text } from "@chakra-ui/react";

const PaginateComponent = ({
  pageNumber,
  setPageNumber,
  totalPages,
}: {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  totalPages: number;
}) => {
  const handlePreviousPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <Flex
      w={"100%"}
      justifyContent={"space-around"}
      alignItems={"center"}
      position={"absolute"}
      bottom={"0px"}
      left={"0"}
      mb={"20px"}
    >
      <Button onClick={handlePreviousPage} isDisabled={pageNumber === 1}>
        <ArrowLeftIcon />
      </Button>
      <Text>Current Page: {pageNumber}</Text>
      <Button onClick={handleNextPage} isDisabled={pageNumber === totalPages}>
        <ArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default PaginateComponent;

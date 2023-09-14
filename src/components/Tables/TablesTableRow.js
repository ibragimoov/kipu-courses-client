import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

import moment from 'moment';
import { Link } from "react-router-dom";

function TablesTableRow(props) {
  // Styles
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  // Props
  const { id, fullName, email, status, createdAt, subjects, index, isFilter } = props;

  return (
    <Tr _hover={{ backgroundColor: 'gray.100' }}>
      <Td pl="10px">
        <Flex align="center" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
            >
              {index}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {fullName}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>

      {!isFilter && subjects &&
        <Td>
          <Flex direction="column">
            {subjects.map((subject) => (
            <Text key={subject._id} fontSize="md" color={textColor} fontWeight="bold">
              { subject.title }
            </Text>
            ))}
          </Flex>
        </Td>
      }
      {status && 
        <Td>
        <Badge
          bg={status === "Online" ? "green.400" : bgStatus}
          color={status === "Online" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
      }
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          { moment(createdAt).format('DD:MM:YYYY HH:mm') }
        </Text>
      </Td>
      <Td>
        <Button p="0px" bg="transparent" variant="no-hover">
          <Link to={`/admin/student/${id}`}>
            <Text
              fontSize="md"
              color="gray.400"
              fontWeight="bold"
              cursor="pointer"
            >
              Подробнее
            </Text>
          </Link>
        </Button>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;

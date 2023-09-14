// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Spinner } from '@chakra-ui/react'

// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";
import React from "react";

const Authors = ({ title, captions, data }) => {
  const textColor = useColorModeValue("teal.300", "white");

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p='6px 0px 22px 0px'>
        <Text fontSize='xl' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant='simple' color={textColor}>
          <Thead>
            <Tr my='.8rem' pl='0px' color='gray.400'>
              {captions.map((caption, idx) => {
                return (
                  <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : null}>
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data ? data.map((row, i) => {
              return (
                <TablesTableRow
                  index={i + 1}
                  key={`${row.email}-${row.name}`}
                  fullName={`${row.last_name} ${row.first_name} ${row.patronimic}`}
                  subjects={row.subjects}
                  email={row.email}
                  createdAt={row.createdAt}
                  status={row.status}
                  id={row._id}
                />
              );
            }) :
            <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Authors;

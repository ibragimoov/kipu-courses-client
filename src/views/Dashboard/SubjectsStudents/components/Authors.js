import React from "react";

// Chakra imports
import {
  Button,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TablesTableRow from "components/Tables/TablesTableRow";

const Authors = ({ title, captions, data }) => {
  // Styles
  const textColor = useColorModeValue("teal.300", "white");

  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }} marginBottom={'20px'}>
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
            {data.map((row, i) => {
              if (row.status !== 'Исключен' && row.status !== 'Новая заявка')
              return (
                <TablesTableRow
                  index={i + 1}
                  key={`${row.email}-${row.name}`}
                  fullName={`${row.last_name} ${row.first_name} ${row.patronimic}`}
                  email={row.email}
                  createdAt={row.createdAt}
                  isFilter={captions.length === 5 ? true : false}
                  id={row._id}
                />
              );
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Authors;

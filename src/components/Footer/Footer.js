/*eslint-disable*/
import React from "react";
import { Flex, Link, List, ListItem, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function Footer(props) {
  // const linkTeal = useColorModeValue("teal.400", "red.200");=
  return (
    <Flex
      flexDirection={{
        base: "column",
        xl: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
      px="30px"
      pb="20px"
    >
      <Text
        marginLeft={'auto'}
        marginRight={'auto'}
        color="gray.400"
        textAlign={{
          base: "center",
          xl: "start",
        }}
        mb={{ base: "20px", xl: "0px" }}
      >
        &copy; {1900 + new Date().getYear()},{" "}
        <Link
          // color={linkTeal}
          color="teal.400"
          href="https://www.simmmple.com"
          target="_blank"
        >
          {document.documentElement.dir === "rtl" ? "سيممبل " : " КИПУ имени Февзи Якубова"}
        </Link>
      </Text>
    </Flex>
  );
}

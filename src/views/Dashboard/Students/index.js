// Chakra imports
import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

import axios from '../../../axios'

function Students() {

  const [allStudents, setAllStudents] = React.useState([])

  useEffect(() => {
    axios.get('student').then((res) => {
      const { data } = res
      setAllStudents(data)
    })
  }, [])

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {allStudents ?
      <Authors
        title={"Все студенты"}
        captions={["№", "ФИО", "Предметы", "Status", "Дата", ""]}
        data={allStudents}
      /> : 
      <Heading
      p={'20px'}
      as={'h4'}
      fontWeight="bold"
    >
      Загрузка студентов. . .
    </Heading>
      }
    </Flex>
  );
}

export default Students;

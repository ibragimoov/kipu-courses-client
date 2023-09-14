// Chakra imports
import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
import { Spinner } from '@chakra-ui/react'

import axios from '../../../axios'

function Students() {

  const [allStudents, setAllStudents] = React.useState([])

  useEffect(() => {
    axios.get('student').then((res) => {
      const { data } = res
      setAllStudents(data)
    })
  }, [])

  const filteredStudents = allStudents.filter(student => student.status === 'Новая заявка')

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      {filteredStudents ?
      <Authors
        title={"Все студенты"}
        captions={["№", "ФИО", "Предметы", "Status", "Дата", ""]}
        data={filteredStudents}
      /> : 
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
      }
    </Flex>
  );
}

export default Students;

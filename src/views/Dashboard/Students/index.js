// Chakra imports
import { Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";
import { Spinner, Text } from '@chakra-ui/react'

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
      {filteredStudents.length !== 0 ?
      <Authors
        title={"Все заявки"}
        captions={["№", "ФИО", "Предметы", "Status", "Дата", ""]}
        data={filteredStudents}
      /> : 
      <Text marginLeft={'20px'} marginTop={'20px'} fontSize={'3xl'}>В настоящее время заявок нет</Text>
      }
    </Flex>
  );
}

export default Students;

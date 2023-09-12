// Chakra imports
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Authors from "./components/Authors";
import Projects from "./components/Projects";
import { tablesTableData, dashboardTableData } from "variables/general";

import axios from '../../../axios'

function SubjectsStudents() {

  const [math, setMath] = React.useState([])
  const [rus, setRus] = React.useState([])
  const [bio, setBio] = React.useState([])
  const [soc, setSoc] = React.useState([])
  const [eng, setEng] = React.useState([])
  const [inf, setInf] = React.useState([])

  useEffect(() => {
    axios.get('student/filter', { params: { subject: 'Математика (профильная)'} }).then((res) => {
      const { data } = res
      setMath(data)
    })
    axios.get('student/filter', { params: { subject: 'Русский язык'} }).then((res) => {
      const { data } = res
      setRus(data)
    })
    axios.get('student/filter', { params: { subject: 'Биология'} }).then((res) => {
      const { data } = res
      setBio(data)
    })
    axios.get('student/filter', { params: { subject: 'Обществознание'} }).then((res) => {
      const { data } = res
      setSoc(data)
    })
    axios.get('student/filter', { params: { subject: 'Английский язык'} }).then((res) => {
      const { data } = res
      setEng(data)
    }),
    axios.get('student/filter', { params: { subject: 'Информатика'} }).then((res) => {
      const { data } = res
      setInf(data)
    })
  }, [])

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      <Authors
        title={"Математика (профильная)"}
        captions={["№", "ФИО", "Статус", "Дата", ""]}
        data={math}
      />
      <Authors
        title={"Русский язык"}
        captions={["№", "ФИО", "Статус", "Дата", ""]}
        data={rus}
      />
      <Authors
        title={"Информатика"}
        captions={["№", "ФИО", "Статус", "Дата", ""]}
        data={inf}
      />
      <Authors
        title={"Биология"}
        captions={["№", "ФИО", "Статус", "Дата", ""]}
        data={bio}
      />
      <Authors
        title={"Обществознание"}
        captions={["№", "ФИО", "Статус", "Дата", ""]}
        data={soc}
      />
      <Authors
        title={"Английский язык"}
        captions={["№", "ФИО", "Статус", "Дата", ""]}
        data={eng}
      />
      {/* <Projects
        title={"Projects Table"}
        captions={["Companies", "Budget", "Status", "Completion", ""]}
        data={dashboardTableData}
      /> */}
    </Flex>
  );
}

export default SubjectsStudents;

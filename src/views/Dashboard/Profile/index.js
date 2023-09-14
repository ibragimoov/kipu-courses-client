import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

// Chakra imports
import { Flex, Grid, useColorModeValue } from "@chakra-ui/react";
import avatar4 from "assets/img/avatars/avatar4.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import React from "react";
import { FaCube, FaPenFancy } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import Conversations from "./components/Conversations";
import Header from "./components/Header";
import PlatformSettings from "./components/PlatformSettings";
import ProfileInformation from "./components/ProfileInformation";
import Projects from "./components/Projects";

import { useToast } from '@chakra-ui/react'

import axios from '../../../axios'
function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const toast = useToast()
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );


  // State
  const [studentDetails, setStudentDetails] = useState({})
  const [redirectToStudents, setRedirectToStudents] = useState(false);

  // Params
  const id = location.pathname.split('/')[3]

  if (!id) {
    return <Redirect to="/admin/students" />;
  }
  
  const handleSuccessUpdate = (updatedUserData) => {
    axios.patch(`student/${id}`, updatedUserData)
    .then((res) => {
      const data = res.data
      setStudentDetails(data)
      toast({
        title: 'Данные студента успешно обновлены.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      })
    })
    .catch(() => {
      toast({
        title: 'Произошла ошибка :(',
        status: 'error',
        isClosable: true,
        position: 'bottom-right',
      })
    })
  }

  useEffect(() => {
    axios.get(`student/${id}`)
    .then((res) => {
      const { data } = res
      setStudentDetails(data)
    })
    .catch((e) => {
      setRedirectToStudents(true)
    })
  }, [])

  if (redirectToStudents) {
    return <Redirect to="/admin/students" />;
  }
  
  let fullName
  if (studentDetails) {
    fullName = `${studentDetails.last_name} ${studentDetails.first_name} ${studentDetails.patronimic}`
  }

  return (
    <Flex direction='column'>
      <Header
        backgroundHeader={ProfileBgImage}
        backgroundProfile={bgProfile}
        avatarImage={avatar4}
        name={fullName}
        email={studentDetails.email}
        tabs={[
          {
            name: "OVERVIEW",
            icon: <FaCube w='100%' h='100%' />,
          },
          {
            name: "TEAMS",
            icon: <IoDocumentsSharp w='100%' h='100%' />,
          },
          {
            name: "PROJECTS",
            icon: <FaPenFancy w='100%' h='100%' />,
          },
        ]}
      />
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px'>
        {/* <PlatformSettings
          title={"Platform Settings"}
          subtitle1={"ACCOUNT"}
          subtitle2={"APPLICATION"}
        /> */}
        {studentDetails ?
          <ProfileInformation
          title={"Информация о студенте"}
          name={`${studentDetails.last_name} ${studentDetails.first_name} ${studentDetails.patronimic}`}
          first_name={studentDetails.first_name}
          last_name={studentDetails.last_name}
          patronimicProps={studentDetails.patronimic}
          phoneProps={studentDetails.phone}
          emailProps={studentDetails.email}
          subjectsProps={studentDetails.subjects}
          study_from={studentDetails.study_from}
          id={studentDetails._id}
          handleSuccessUpdate={handleSuccessUpdate}
          />
          :
          <h1>Загрузка данных. . .</h1>
        }
        {/* <Conversations title={"Conversations"} /> */}
      </Grid>
      {/* <Projects title={"Projects"} description={"Architects design houses"} /> */}
    </Flex>
  );
}

export default Profile;

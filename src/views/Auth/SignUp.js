// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  useColorModeValue,
  Checkbox
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState, Fragment } from "react";

import axios from '../../axios'

function SignUp() {
  // Styles
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const toast = useToast()

  // State
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronimic, setPatronimic] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [studyFrom, setStudyFrom] = useState('')
  const [subjects, setSubjects] = useState([])

  const actualSubjects = [
    'Математика (профильная)',
    'Русский язык',
    'Обществознание',
    'Биология',
    'Английский язык',
    'Информатика'
  ]
  
  const handleCheckboxEvent = (event) => {
    const value = event.target.value;

    if (event.target.checked) {
      setSubjects([...subjects, value])
    } else {
      const excludedSubject = subjects.filter((subject => subject !== value))
      setSubjects(excludedSubject)
    }
  };

  const validateForm = () => {
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      patronimic.trim() === '' ||
      email.trim() === '' ||
      phone.trim() === '' ||
      studyFrom.trim() === '' ||
      subjects.length === 0
    ) {
      toast({
        title: 'Ошибка отправки формы',
        description: 'Заполните все поля формы',
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true,
      });
      return false
    } else {
      return true
    }
  };

  const onSubmit = () => {
    if (validateForm()) {
      const newStudent = { 
        first_name: firstName,
        last_name: lastName,
        patronimic,
        email,
        phone,
        study_from: studyFrom,
        subjects
      }
  
      axios.post('student', newStudent)
      .then(() => {
        toast({
          title: 'Заявка успешно отправлена, ждите звонка в ближайшие часы :)',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-right',
        })
      })
      .catch((e) => {
        const { message } = e.response.data
        toast({
          title: `Ошибка: ${message}`,
          status: 'error',
          isClosable: true,
          position: 'bottom-right',
        })
      })
    }
  }

  return (
    <Flex
      direction='column'
      alignSelf='center'
      justifySelf='center'
      overflow='hidden'>
      <Box
        position='absolute'
        marginTop={'-40px'}
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left='0'
        right='0'
        bgRepeat='no-repeat'
        overflow='hidden'
        zIndex='-1'
        top='0'
        bgImage={BgSignUp}
        bgSize='cover'
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}></Box>
      <Flex
        direction='column'
        textAlign='center'
        justifyContent='center'
        align='center'
        mt='6.5rem'
        mb='30px'>
        <Text fontSize='4xl' color='white' fontWeight='bold'>
          Подготовительные курсы КИПУ<br/> имени Февзи Якубова
        </Text>
        <Text
          fontSize='md'
          color='white'
          fontWeight='normal'
          mt='10px'
          mb='26px'
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}>
          Отправь заявку для зачисления на выбранный курс для подготовке к ЕГЭ
        </Text>
      </Flex>
      <Flex alignItems='center' w={'100%'} justifyContent='center' mb='60px' mt='20px'>
        <Flex
          marginTop={'-40px'}
          direction='column'
          w='445px'
          background='transparent'
          borderRadius='15px'
          p='40px'
          mx={{ md: "100px", sm: '30px' }}
          bg={bgColor}
          boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
          <Text
            fontSize='xl'
            color={textColor}
            fontWeight='bold'
            textAlign='center'
            mb='22px'>
            Заполни форму
          </Text>
          <FormControl>
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Фамилия {" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Иванов'
              mb='24px'
              size='lg'
              value={lastName}  
              required
              onChange={(e) =>{ setLastName(e.target.value)}}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Имя{" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Иван'
              mb='24px'
              size='lg'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Отчество{" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Иванович'
              mb='24px'
              size='lg'
              value={patronimic}
              onChange={(e) => setPatronimic(e.target.value)}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Эл. почта{" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='email'
              placeholder='ivan@mail.ru'
              mb='24px'
              size='lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Телефон{" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='+79781234567'
              mb='24px'
              size='lg'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
              Что закончил{" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            <Input
              fontSize='sm'
              ms='4px'
              borderRadius='15px'
              type='text'
              placeholder='Школа: МБОУ СОШ №44'
              mb='24px'
              size='lg'
              value={studyFrom}
              onChange={(e) => setStudyFrom(e.target.value)}
            />
            <FormLabel>
              Предметы {" "}
              <Text as='span' color='red.500' fontWeight='bold'>
              *
              </Text>
            </FormLabel>
            {actualSubjects.map((actualSubject, i) => (
              <Fragment key={i}>
                <Checkbox value={actualSubject} onChange={(e) => handleCheckboxEvent(e)}>
                  {actualSubject}
                </Checkbox>
                <br />
              </Fragment>
            ))}

            </FormControl>          
            <Button
              marginTop={'20px'}
              onClick={() => onSubmit()}
              bg='teal.300'
              fontSize='18px'
              color='white'
              fontWeight='bold'
              w='100%'
              h='45'
              mb='24px'
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}>
              Отправить
            </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;

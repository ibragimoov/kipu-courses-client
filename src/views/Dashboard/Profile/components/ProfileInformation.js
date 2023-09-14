// Chakra imports
import { Flex, Text, useColorModeValue, UnorderedList, ListItem } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React, { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Select
} from '@chakra-ui/react'

const ProfileInformation = ({
  title,
  description,
  name,
  phoneProps,
  emailProps,
  subjectsProps,
  first_name,
  last_name,
  patronimicProps,
  study_from,
  id,
  handleSuccessUpdate,
  ...props
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  // Modal
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronimic, setPatronimic] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [studyFrom, setStudyFrom] = useState('')
  const [subjects, setSubjects] = useState([])

  // get studentDetails
  useEffect(() => {

    setFirstName(first_name)
    setLastName(last_name)
    setPatronimic(patronimicProps)

    setEmail(emailProps)
    setPhone(phoneProps)
    setStudyFrom(study_from)

    // map subject objects
    const initialSubjects = subjectsProps?.map(subjectProp => subjectProp.title)
    setSubjects(initialSubjects)
  }, [first_name])

  const onSubmit = () => {
    const updatedStudent = { 
      firstName,
      lastName,
      patronimic,
      email,
      phone,
      studyFrom,
      subjects
    }

    handleSuccessUpdate(updatedStudent)
    onClose()
  }

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

  const handleStatusSelect = (event) => {
    const { value } = event.target
    handleSuccessUpdate({ status: value })
  }

  return (
    <Card p='16px' my={{ sm: "24px", xl: "0px" }}>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column'>
          <Text fontSize='md' color='gray.500' fontWeight='400' mb='30px'>
            {description}
          </Text>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              ФИО:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {name}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Телефон:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {phoneProps}
            </Text>
          </Flex>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Эл. почта:{" "}
            </Text>
            <Text fontSize='md' color='gray.500' fontWeight='400'>
              {emailProps}
            </Text>
          </Flex>
          <br/>
          <Flex align='center' mb='18px'>
            <Text fontSize='md' color={textColor} fontWeight='bold' me='10px'>
              Предметы:{" "}
            </Text>
          </Flex>
            <UnorderedList>
            {subjectsProps && subjectsProps.map((subject) => (
            <ListItem key={subject} fontSize='md' color='gray.500' fontWeight='400'>
              {subject.title}{"   "}
            </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      </CardBody>

      <Button marginTop={'20px'} marginBottom={'20px'} onClick={onOpen}>Изменить</Button>
      <Select onChange={(e) => handleStatusSelect(e)} placeholder='Изменить статус'>
        <option value='Принят'>Принят</option>
        <option value='Новая заявка'>Новая заявка</option>
        <option value='Исключен'>Исключен</option>
      </Select>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Изменение студента: { first_name }</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Фамилия</FormLabel>
              <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Имя</FormLabel>
              <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Отчество</FormLabel>
              <Input value={patronimic} onChange={(e) => setPatronimic(e.target.value)} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Эл. почта</FormLabel>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Телефон</FormLabel>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Что закончил</FormLabel>
              <Input value={studyFrom} onChange={(e) => setStudyFrom(e.target.value)} placeholder='Last name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Предметы</FormLabel>
              {actualSubjects.map((actualSubject, i) => (
                <Checkbox key={i} value={actualSubject} onChange={(e) => handleCheckboxEvent(e)} defaultChecked={subjects?.includes(actualSubject) ? true : false}>{ actualSubject }</Checkbox>
              ))}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => onSubmit()} colorScheme='blue' mr={3}>
              Сохранить
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default ProfileInformation;

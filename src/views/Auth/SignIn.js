import React from "react";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
// Chakra imports
import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Switch,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
// Assets
import signInImage from "assets/img/signInImage.jpg";

import { signIn } from "store/slices/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import { parseCookies } from "nookies";

function SignIn() {
    // Chakra color mode
    const titleColor = useColorModeValue("teal.300", "teal.200");
    const textColor = useColorModeValue("gray.400", "white");

    // Admin state
    const [login, setLogin] = React.useState("");
    const [password, setPassword] = React.useState("");

    // Store
    const dispatch = useDispatch();
    const token = useSelector((state) => state.admin.token);

    if (token) {
        return <Redirect to="/admin/dashboard" />;
    }

    const handleLoginChange = (e) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        dispatch(
            signIn({
                login,
                password,
            })
        );
    };

    return (
        <Flex position="relative" mb="40px">
            <Flex
                h={{ sm: "initial", md: "75vh", lg: "85vh" }}
                w="100%"
                maxW="1044px"
                mx="auto"
                justifyContent="space-between"
                mb="30px"
                pt={{ sm: "100px", md: "0px" }}
            >
                <Flex
                    alignItems="center"
                    justifyContent="start"
                    style={{ userSelect: "none" }}
                    w={{ base: "100%", md: "50%", lg: "42%" }}
                >
                    <Flex
                        direction="column"
                        w="100%"
                        background="transparent"
                        p="48px"
                        mt={{ md: "150px", lg: "80px" }}
                    >
                        <Heading color={titleColor} fontSize="32px" mb="10px">
                            Welcome Back
                        </Heading>
                        <Text
                            mb="36px"
                            ms="4px"
                            color={textColor}
                            fontWeight="bold"
                            fontSize="14px"
                        >
                            Enter your email and password to sign in
                        </Text>
                        <FormControl>
                            <FormLabel
                                ms="4px"
                                fontSize="sm"
                                fontWeight="normal"
                            >
                                Email
                            </FormLabel>
                            <Input
                                value={login}
                                onChange={(e) => handleLoginChange(e)}
                                borderRadius="15px"
                                mb="24px"
                                fontSize="sm"
                                type="text"
                                placeholder="Your login"
                                size="lg"
                            />
                            <FormLabel
                                ms="4px"
                                fontSize="sm"
                                fontWeight="normal"
                            >
                                Password
                            </FormLabel>
                            <Input
                                value={password}
                                onChange={(e) => handlePasswordChange(e)}
                                borderRadius="15px"
                                mb="36px"
                                fontSize="sm"
                                type="password"
                                placeholder="Your password"
                                size="lg"
                            />
                            <Button
                                onClick={handleSubmit}
                                fontSize="10px"
                                type="submit"
                                bg="teal.300"
                                w="100%"
                                h="45"
                                mb="20px"
                                color="white"
                                mt="20px"
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}
                            >
                                SIGN IN
                            </Button>
                        </FormControl>
                        <Flex
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            maxW="100%"
                            mt="0px"
                        >
                            <Text color={textColor} fontWeight="medium">
                                Don't have an account?
                                <Link
                                    color={titleColor}
                                    as="span"
                                    ms="5px"
                                    fontWeight="bold"
                                >
                                    Sign Up
                                </Link>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box
                    display={{ base: "none", md: "block" }}
                    overflowX="hidden"
                    h="100%"
                    w="40vw"
                    position="absolute"
                    right="0px"
                >
                    <Box
                        bgImage={signInImage}
                        w="100%"
                        h="100%"
                        bgSize="cover"
                        bgPosition="50%"
                        position="absolute"
                        borderBottomLeftRadius="20px"
                    ></Box>
                </Box>
            </Flex>
        </Flex>
    );
}

export default SignIn;

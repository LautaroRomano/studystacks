import { Flex, Input, Link, Button, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import axios from "axios";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function Search({ session, userLoggin, setUserLogin, setViewUserSettings }) {

    const [registerData, setRegisterData] = useState({});

    const handleRegister = () => {
        if (session.status !== "authenticated") return;
        const data = {
            username: registerData.username,
            email: session.data.user.email,
            password: registerData.username,
            last_login_date: null,
            image: session.data.user.image,
        };

        axios.post(`/api/users`, data).then(({ data }) => {
            if (data.length > 0) setUserLogin(data[0]);
        });
    };
    const handleChangeData = ({ target }) => {
        setRegisterData((data) => ({
            ...data,
            [target.name]: target.value,
        }));
    };

    return (
        <Flex
            position={"fixed"}
            top={0}
            left={0}
            w={"100vw"}
            h={"100vh"}
            zIndex={10}
            justifyContent={"center"}
            alignItems={"center"}
            bg="#0005"
        >
            <Flex
                w={"600px"}
                h={"80vh"}
                bg={"#fff"}
                flexDir={"column"}
                p={"50px"}
                zIndex={11}
                position={"relative"}
            >
                <Flex
                    position={"absolute"}
                    right={2}
                    top={2}
                    bg={"primaryGray.700"}
                    border={"5px"}
                    p={"5px"}
                    justifyContent={'center'}
                    alignItems={'center'}
                    onClick={() => setViewUserSettings(false)}
                >
                    <CloseIcon />
                </Flex>
                <Flex
                    w={"100%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    mt={"15px"}
                    flexDir={"column"}
                >
                    <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>
                    <Flex my={"8px"}>
                        <Text ms={"10px"}>Termina de completar tus datos</Text>
                    </Flex>
                    <Flex my={"8px"} flexDir={"column"}>
                        <Text ms={"10px"}>Como quieres que te llamemos?</Text>
                        <Input
                            placeholder={"@"}
                            name="username"
                            value={registerData.username}
                            onChange={handleChangeData}
                        ></Input>
                    </Flex>
                    <Flex my={"8px"} flexDir={"column"}>
                        <Text ms={"10px"}>Crea una contrasena</Text>
                        <Input
                            placeholder={"******"}
                            name="password"
                            type="password"
                            value={registerData.password}
                            onChange={handleChangeData}
                        ></Input>
                    </Flex>
                    <Button
                        colorScheme="blue"
                        size="sm"
                        mb={"10px"}
                        onClick={handleRegister}
                    >
                        Guardar
                    </Button>
                    <Flex h={"1px"} w={"90%"} bg={"gray.300"}></Flex>

                    <Flex
                        w={"100%"}
                        h={"50px"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        mt={"15px"}
                        flexDir={"column"}
                        _hover={{
                            bg: "gray.200",
                        }}
                        cursor={"pointer"}
                        onClick={() => signOut("google")}
                    >
                        <Flex my={"8px"}
                        >
                            <Text>
                                <GoogleIcon />
                            </Text>
                            <Text ms={"10px"}>Cerrar sesion de google</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

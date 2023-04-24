import {
    Flex,
    Image,
    Text,
    Input,
    Button,
    Link,
    Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";


export default function Navbar({ userLoggin }) {
    const [viewUserSettings, setViewUserSettings] = useState(false);
    const [search, setSearch] = useState(false);
    const router = useRouter();

    // const handleLoginClick = () => {
    //     localStorage.setItem("callbackUrl", router.asPath)
    //     signIn("google")
    // }


    return (
        <Flex
            w={["100vw", "80vw", "700px", "700px", "700px"]}
            bg="#FFF"
            paddingBottom="14px"
            paddingX="14px"
            position="fixed"
            bottom="0"
            left={0}
            color={"primaryGray.500"}
            alignItems={"center"}
            p={"15px"}
            h={"65px"}
            boxShadow={"0px 6px 9px -1px rgba(161,161,161,1)"}
            borderBottom={"1px solid #ababab"}
            justifyContent={"space-between"}
            zIndex="10"
        >

            <Flex alignItems={"center"}>
                <Flex
                    height="40px"
                    width="40px"
                    position={"relative"}
                    cursor={"pointer"}
                    _hover={{ opacity: ".8" }}
                    me={"25px"}
                >
                    <Link href="/">
                        <Image
                            height="40px"
                            width="40px"
                            borderRadius="50%"
                            objectFit="cover"
                            src={"/images/logo.png"}
                            alt=""
                        />
                    </Link>
                </Flex>
                <Flex
                    position={"relative"}
                    display={["none", "none", "flex", "flex", "flex"]}
                >

                    <Input
                        placeholder="Buscar..."
                        value=""
                        readOnly
                    ></Input>

                    <Flex position={"absolute"} right={1} top={"2"}>
                        <SearchIcon />
                    </Flex>
                </Flex>
                <Flex
                    position={"relative"}
                    display={["flex", "flex", "none", "none", "none"]}
                >
                    <Flex
                        bg={"primaryGray.700"}
                        p={"6px"}
                        borderRadius={"10%"}
                        onClick={() => setSearch(true)}
                    >
                        <SearchIcon />
                    </Flex>
                </Flex>
            </Flex>

            <Spacer></Spacer>

            <Flex
                height="40px"
                width="40px"
                position={"relative"}
                onClick={() => setViewUserSettings((state) => !state)}
                cursor={"pointer"}
                _hover={{ opacity: ".8" }}
            >
                <Image
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    objectFit="cover"
                    src={userLoggin.image}
                    alt=""
                />
            </Flex>
        </Flex>
    );
}
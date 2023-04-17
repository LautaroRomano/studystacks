import { Flex, Input, Link } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function Search({ session, userLoggin, closedModal }) {
  const [search, setSearch] = useState("");
  const [allCommunities, setAllCommunities] = useState([]);

  useEffect(() => {
    if (!userLoggin) return;
    axios.get(`/api/communities`).then(({ data }) => {
      setAllCommunities(data);
    });
  }, [userLoggin]);
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
          justifyContent={"center"}
          alignItems={"center"}
          onClick={() => closedModal()}
        >
          <CloseIcon />
        </Flex>
        <Flex position={"relative"}>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            mb={"25px"}
          ></Input>
          <Flex position={"absolute"} right={1} top={"2"}>
            <SearchIcon />
          </Flex>
        </Flex>
        <Flex flexDir={"column"} overflowY={'scroll'} h={'100%'}>
          {allCommunities
            .filter(
              (f) =>
                search.length < 4 || equalsStrings(f.community_name, search)
            )
            .map((com) => {
              const ref = `/communities/${com.community_id}`;
              return (
                <Link href={ref} w={"100%"} key={com.community_id} mt={'5px'}>
                  <Flex
                    bg={"primaryGray.800"}
                    p={"5px"}
                    w={"100%"}
                    _hover={{ bg: "primaryGray.700" }}
                  >
                    {com.community_name}
                  </Flex>
                </Link>
              );
            })}
        </Flex>
      </Flex>
    </Flex>
  );
}

const equalsStrings = (cad1, cad2) => {
  if (!cad1) return false;
  if (!cad2) return false;
  return cad1.toLowerCase().includes(cad2.toLowerCase());
};

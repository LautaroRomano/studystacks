import { Flex, Input, Link, Text, Select, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

export default function Search({ session, userLoggin, closedModal }) {
  const [search, setSearch] = useState("");
  const [allCommunities, setAllCommunities] = useState([]);
  const [universities, setUniversities] = useState({});
  const [filter, setFilter] = useState({});
  const [filterOn, setFilterOn] = useState(false);

  useEffect(() => {
    if (!userLoggin) return;
    axios.get(`/api/communities`).then(({ data }) => {
      setAllCommunities(data);
    });
  }, [userLoggin]);

  useEffect(() => {
    axios.get("/api/universities").then(({ data }) => {
      setUniversities(data);
    });
  }, []);

  const handleChangeData = ({ target }) => {
    setFilter((data) => ({
      ...data,
      [target.name]: target.value === "0" ? 0 : target.value,
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
        py={"50px"}
        px={["10px", "10px", "25px", "50px", "50px"]}
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
        <Flex position={"relative"} alignItems={"center"}>
          <Input
            placeholder="Buscar..."
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            mb={"25px"}
            w={"87%"}
          ></Input>
          <Flex position={"absolute"} right={75} top={"2"}>
            <SearchIcon />
          </Flex>
          <Flex
            position={"absolute"}
            right={0}
            top={"1"}
            onClick={() => setFilterOn((state) => !state)}
          >
            <Button size="sm">Filtrar</Button>
          </Flex>
        </Flex>
        {filterOn && (
          <Flex mt={"-20px"} flexDir={"column"} mb={"10px"}>
            <Select
              value={filter.university_id}
              name="university_id"
              onChange={handleChangeData}
              color={"primaryGray.500"}
              mt={"1.5px"}
              size="sm"
            >
              <option value={0}>{"Selecciona una universidad"}</option>
              {universities.universities &&
                universities.universities.map((uni) => (
                  <option value={uni.university_id} key={uni.university_id}>
                    {uni.university_name}
                  </option>
                ))}
            </Select>
            <Select
              color={"primaryGray.500"}
              value={filter.career_id}
              name="career_id"
              onChange={handleChangeData}
              mt={"1.5px"}
              size="sm"
            >
              <option value={0}>{"Selecciona una carrera"}</option>
              {universities.careers &&
                universities.careers
                  .filter((c) => c.university_id == filter.university_id)
                  .map((career) => (
                    <option value={career.career_id} key={career.career_id}>
                      {career.career_name}
                    </option>
                  ))}
            </Select>

            <Select
              color={"primaryGray.500"}
              value={filter.commission_id}
              name="commission_id"
              onChange={handleChangeData}
              mt={"1.5px"}
              size="sm"
            >
              <option value={0}>{"Selecciona una comision/curso"}</option>
              {universities.commissions &&
                universities.commissions
                  .filter((c) => c.career_id == filter.career_id)
                  .map((com) => (
                    <option value={com.commission_id} key={com.commission_id}>
                      {com.commission_name}
                    </option>
                  ))}
            </Select>
          </Flex>
        )}
        <Flex flexDir={"column"} overflowY={"scroll"} h={"100%"}>
          {allCommunities
            .filter(
              (f) =>
                search.length < 4 || equalsStrings(f.community_name, search)
            )
            .map((com) => {
              const ref = `/communities/${com.community_id}`;
              if (
                !(
                  !filter.university_id ||
                  filter.university_id == com.university_id
                )
              )
                return;
              if (!(!filter.career_id || filter.career_id == com.career_id))
                return;
              if (
                !(
                  !filter.commission_id ||
                  filter.commission_id == com.commission_id
                )
              )
                return;
              return (
                <Link href={ref} w={"100%"} key={com.community_id} mt={"5px"}>
                  <Flex
                    bg={"primaryGray.800"}
                    p={"5px"}
                    w={"100%"}
                    _hover={{ bg: "primaryGray.700" }}
                    flexDir={"column"}
                  >
                    <Text
                      color={"primaryGray.500"}
                      fontWeight={"bold"}
                      fontSize={"15px"}
                    >
                      {com.community_name}
                    </Text>
                    <Text color={"primaryGray.600"} fontSize={"13px"}>
                      {com.community_description}
                    </Text>
                    <Flex
                      h={"1px"}
                      w={"100%"}
                      bg={"primaryGray.600"}
                      mt={"5px"}
                    ></Flex>
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

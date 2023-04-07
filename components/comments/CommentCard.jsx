import { Flex, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function commentCard({ data, userLoggin }) {
  const [votes, setVotes] = useState([]);

  const sendLike = (type) => {
    if (!userLoggin) return;
    axios
      .post(`/api/votes`, {
        vote_value: type,
        creator_user_id: userLoggin.user_id,
        post_id: null,
        comment_id: data.comment_id,
      })
      .then(() => getLikes());
  };
  const deleteLike = (vote_id) => {
    if (!userLoggin) return;
    axios.delete(`/api/votes/${vote_id}`).then(() => getLikes());
  };

  useEffect(() => {
    getLikes();
  }, []);

  const getLikes = () => {
    axios.get(`/api/votes/comments/${data.comment_id}`).then(({ data }) => {
      setVotes(data);
    });
  };

  return (
    <Flex
      w={["100vw", "80vw", "700px", "700px", "700px"]}
      bg="#fff"
      paddingBottom="14px"
      paddingX="14px"
      position="relative"
      flexDir={"column"}
    >
      <Flex h={"1.5px"} w={"90%"} bg={"primaryGray.700"} margin={"auto"}></Flex>
      <Flex gap="12px" mt="14px">
        <Image
          height="30px"
          width="30px"
          borderRadius="50%"
          objectFit="cover"
          src={data.image}
          alt=""
        />
        <Flex alignItems={"end"}>
          <Text
            letterSpacing=".4px"
            fontSize="14px"
            fontWeight="700"
            color="primaryGray.500"
            textAlign={"start"}
          >
            @{data.username}{" "}
            <Text
              fontSize="12px"
              color="primaryGray.600"
              ms={"45px"}
              display={"contents"}
            >
              {getDate(data.creation_date)}
            </Text>
            <Text
              letterSpacing=".4px"
              fontSize="13px"
              fontWeight="500"
              lineHeight="1.7"
              ms={"5px"}
            >
              {data.comment_text}
            </Text>
          </Text>
        </Flex>
        <Flex marginLeft="auto" me={"25px"} flexDir={"column"} w={"50px"} alignItems={'center'} justifyContent={'center'}>
          <Flex
            marginRight="21px"
            alignItems="center"
            position={"relative"}
            ms={"15px"}
            w={"50px"}
          >
            {userLoggin &&
            votes.find(
              (vote) => vote.creator_user_id === userLoggin.user_id
            ) ? (
              <Text
                bg={"blue.100"}
                fontSize={"14px"}
                onClick={() =>
                  deleteLike(
                    votes.find(
                      (vote) => vote.creator_user_id === userLoggin.user_id
                    ).vote_id
                  )
                }
                cursor={"pointer"}
                borderRadius={"10px"}
                p={"5px"}
                ms="5px"
                color={"primaryGray.500"}
              >
                ❤️ {votes.length}
              </Text>
            ) : (
              <Flex
                key={1}
                padding={"5px"}
                bg={"primaryGray.700"}
                borderRadius={"10px"}
                ms="5px"
                color={"primaryGray.500"}
                fontSize={"14px"}
                cursor={"pointer"}
                _hover={{
                  bg: "blue.100",
                }}
                onClick={() => sendLike(1)}
              >
                ❤️{votes.length}
              </Flex>
            )}
          </Flex>
        </Flex>
        <Text fontSize={"25px"} position={"absolute"} right={"25px"} top="25px">
          ...
        </Text>
      </Flex>
    </Flex>
  );
}

const getDate = (creationDate) => {
  const dateObj = new Date(creationDate);

  const now = new Date();

  const diffMs = now.getTime() - dateObj.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  return diffYears > 0
    ? `hace ${diffYears} años`
    : diffMonths > 0
    ? `hace ${diffMonths} meses`
    : diffDays > 0
    ? `hace ${diffDays} dias`
    : diffHours > 0
    ? `hace ${diffHours} horas`
    : diffMinutes > 0
    ? `hace ${diffMinutes} minutos`
    : diffSeconds > 0
    ? `hace ${diffSeconds} segundos`
    : "hace 0 segundos";
};

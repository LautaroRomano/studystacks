import { Flex, Image, Text, Link } from "@chakra-ui/react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { useEffect, useState } from "react";

const likesTypesArr = [
  { type: 1, data: "❤️" },
  { type: 2, data: "👍" },
];

export default function Post({ data, userLoggin }) {
  const [likesTypes, setLikesTypes] = useState(false);
  const [votes, setVotes] = useState([]);
  const [countComments, setCountComments] = useState(0);
  const [commentsRoute] = useState(`/comments/${data.post_id}`);
  const [communityRef] = useState(`/communities/${data.community_id}`);
  const [sectionRef] = useState(
    `/communities/${data.community_id}/${data.section_id}`
  );

  const sendLike = (type) => {
    if (!userLoggin) return;
    axios
      .post(`/api/votes`, {
        vote_value: type,
        creator_user_id: userLoggin.user_id,
        post_id: data.post_id,
        comment_id: null,
      })
      .then(() => getLikes());
    setLikesTypes(false);
  };
  const deleteLike = (vote_id) => {
    if (!userLoggin) return;
    axios.delete(`/api/votes/${vote_id}`).then(() => getLikes());
    setLikesTypes(false);
  };

  useEffect(() => {
    getLikes();
    axios.get(`/api/comments/post/count/${data.post_id}`).then(({ data }) => {
      setCountComments(data[0].total_comments);
    });
  }, []);

  const getLikes = () => {
    axios.get(`/api/votes/post/${data.post_id}`).then(({ data }) => {
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
          height="40px"
          width="40px"
          borderRadius="50%"
          objectFit="cover"
          src={data.image}
          alt=""
        />
        <Flex alignItems={"center"}>
          <Text
            letterSpacing=".4px"
            fontSize="14px"
            fontWeight="500"
            color="primaryGray.500"
          >
            @{data.username}
          </Text>
          <Text
            fontSize="14px"
            color="primaryGray.500"
            ms={"15px"}
            bg={"primaryGray.700"}
            p={"5px"}
            borderRadius={"5px"}
          >
            /<Link href={communityRef}>{data.community_name}</Link>/
            <Link href={sectionRef}>{data.section_name}</Link>
          </Text>
          <Text
            fontSize="12px"
            color="primaryGray.600"
            ms={"15px"}
            display={["none", "none", "flex", "flex", "flex"]}
          >
            {getDate(data.creation_date)}
          </Text>
        </Flex>
        <Text fontSize={"25px"} position={"absolute"} right={"25px"} top="25px">
          ...
        </Text>
      </Flex>
      <Text
        fontSize="12px"
        color="primaryGray.600"
        ms={"55px"}
        mt={"-10px"}
        display={["flex", "flex", "none", "none", "none"]}
      >
        {getDate(data.creation_date)}
      </Text>
      <Flex flexDir={"column"}>
        <Text
          fontSize="14px"
          color="primaryGray.300"
          fontWeight={"500"}
          marginTop="16px"
          lineHeight="1.7"
        >
          {data.post_title}
        </Text>
        <Text
          fontSize="14px"
          color="primaryGray.500"
          marginTop="5px"
          lineHeight="1.7"
        >
          {data.post_body}
        </Text>
        <Flex
          border={"1px solid #ababab"}
          position={"relative"}
          borderRadius={"0 15px 15px 15px"}
          mt={"10px"}
          flexDir={"column"}
        >
          <Flex my={"5px"}></Flex>
          <Text
            fontSize="15px"
            color="primaryGray.500"
            marginTop="16px"
            lineHeight="1.7"
            position={"absolute"}
            top="-7"
            left={"7"}
            bg={"#fff"}
            px="3px"
          >
            Archivos adjuntos
          </Text>
          <Flex
            w={"100%"}
            color="primaryGray.500"
            p={"10px"}
            alignItems={"center"}
          >
            <Text color="warning.500">
              <PictureAsPdfIcon />
            </Text>
            <Text
              fontSize="14px"
              color="primaryGray.500"
              marginTop="5px"
              lineHeight="1.7"
              ms={"10px"}
              mt={"-5px"}
            >
              Enanos albinos link.pdf
            </Text>
          </Flex>
          <Flex
            w={"100%"}
            color="primaryGray.500"
            p={"10px"}
            alignItems={"center"}
          >
            <Text color="warning.500">
              <PictureAsPdfIcon />
            </Text>
            <Text
              fontSize="14px"
              color="primaryGray.500"
              marginTop="5px"
              lineHeight="1.7"
              ms={"10px"}
              mt={"-5px"}
            >
              Parcial 1 Fisica 2.pdf
            </Text>
          </Flex>
          <Flex
            w={"100%"}
            color="primaryGray.500"
            p={"10px"}
            alignItems={"center"}
          >
            <Text color="warning.500">
              <PictureAsPdfIcon />
            </Text>
            <Text
              fontSize="14px"
              color="primaryGray.500"
              marginTop="5px"
              lineHeight="1.7"
              ms={"10px"}
              mt={"-5px"}
            >
              Parcial 2 Fisica 2.pdf
            </Text>
          </Flex>
          <Flex
            w={"100%"}
            color="primaryGray.500"
            p={"10px"}
            alignItems={"center"}
          >
            <Text color="warning.500">
              <PictureAsPdfIcon />
            </Text>
            <Text
              fontSize="14px"
              color="primaryGray.500"
              marginTop="5px"
              lineHeight="1.7"
              ms={"10px"}
              mt={"-5px"}
            >
              Parcial 3 Fisica 2.pdf
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="20px" alignItems="center">
        <Flex marginRight="21px" alignItems="center" position={"relative"}>
          {likesTypes && (
            <Flex
              position={"absolute"}
              top={"-10"}
              bg={"primaryGray.700"}
              borderRadius={"5px"}
            >
              {likesTypesArr.map((like) => (
                <Flex
                  key={like.type}
                  padding={"5px"}
                  bg={"#FFF"}
                  borderRadius={"10px"}
                  ms="5px"
                  color={"primaryGray.500"}
                  fontSize={"14px"}
                  cursor={"pointer"}
                  _hover={{
                    bg: "blue.100",
                  }}
                  onClick={() => sendLike(like.type)}
                >
                  {like.data}
                </Flex>
              ))}
            </Flex>
          )}
          {userLoggin &&
          votes.find((vote) => vote.creator_user_id === userLoggin.user_id) ? (
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
            >
              {
                likesTypesArr.find(
                  (f) =>
                    f.type ==
                    votes.find(
                      (vote) => vote.creator_user_id === userLoggin.user_id
                    ).vote_value
                ).data
              }
            </Text>
          ) : (
            <Text
              color={likesTypes ? "blue.500" : "primaryGray.500"}
              fontSize={"14px"}
              onClick={() => setLikesTypes((state) => !state)}
              cursor={"pointer"}
            >
              <InsertEmoticonIcon></InsertEmoticonIcon>
            </Text>
          )}
          {votes.filter((f) => f.vote_value === 1).length > 0 && (
            <Flex
              padding={"5px"}
              bg={"primaryGray.700"}
              borderRadius={"10px"}
              ms="5px"
              color={"primaryGray.500"}
              fontSize={"14px"}
            >
              ❤️ {votes.filter((f) => f.vote_value === 1).length}
            </Flex>
          )}
          {votes.filter((f) => f.vote_value === 2).length > 0 && (
            <Flex
              padding={"5px"}
              bg={"primaryGray.700"}
              borderRadius={"10px"}
              mx="2px"
              color={"primaryGray.500"}
              fontSize={"14px"}
            >
              👍 {votes.filter((f) => f.vote_value === 2).length}
            </Flex>
          )}
        </Flex>
        <Text color="primaryGray.600" fontSize="12px" marginLeft="10px">
          {votes.length} likes
        </Text>
        <Text
          color="primaryGray.600"
          fontSize="12px"
          marginLeft="auto"
          me="10px"
        >
          <Link href={commentsRoute}>{countComments} comentarios</Link>
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

import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Flex, Input, Button } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Post from "../../components/Post";
import CommentCard from "../../components/comments/CommentCard";

export default function Home() {
  const router = useRouter();
  const { post_id } = router.query;
  const { status, data } = useSession();
  const [userLoggin, setUserLogin] = useState(false);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleChangeNewComment = ({ target }) => {
    const { value } = target;
    setNewComment(value);
  };
  const sendComment = ({ target }) => {
    if (newComment.length > 2)
      axios
        .post("/api/comments", {
          comment_text: newComment,
          creator_user_id: userLoggin.user_id,
          post_id: post_id,
        })
        .then(() => {
          setNewComment("");
          getComments();
        });
  };

  useEffect(() => {
    if ((!userLoggin, !post_id)) return;
    getPost();
    getComments();
  }, [userLoggin, post_id]);

  const getPost = () => {
    axios.get(`/api/post/${post_id}`).then(({ data }) => setPost(data[0]));
  };
  const getComments = () => {
    axios
      .get(`/api/comments/post/${post_id}`)
      .then(({ data }) => setComments(data));
  };

  return (
    <Flex
      bg="primaryWhite.500"
      w="100vw"
      h="100vh"
      flexDir={"column"}
      alignItems={"center"}
      overflowY={"scroll"}
    >
      <Navbar
        session={{ status, data }}
        userLoggin={userLoggin}
        setUserLogin={setUserLogin}
      />
      <Flex mt="75px"></Flex>
      {post && <Post data={post} key={post.post_id} userLoggin={userLoggin} />}

      <Flex
        w={["100vw", "80vw", "700px", "700px", "700px"]}
        bg="#fff"
        paddingBottom="14px"
        paddingX="14px"
        position="relative"
        flexDir={"column"}
      >
        <Input
          placeholder="Añade un comentario"
          w={"100%"}
          color="primaryGray.500"
          value={newComment}
          onChange={handleChangeNewComment}
        ></Input>
        <Button
          position={"absolute"}
          zIndex={50}
          colorScheme="blue"
          size="sm"
          right={5}
          top={1}
          onClick={sendComment}
        >
          Publicar
        </Button>
      </Flex>

      {comments.map((com) => (
        <CommentCard data={com} userLoggin={userLoggin} />
      ))}
    </Flex>
  );
}

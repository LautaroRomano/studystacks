import Navbar from "../../components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Flex, Input, Button, Text, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from '../../styles/Chat.module.scss';
import CommunityDashboard from '../../components/communities/CommunityDashboard'

export default function Home() {
    const router = useRouter();
    const [community_id, section_id, chat_id] = router.query.community_id || [null, null, null];
    const { status, data } = useSession();
    const [userLoggin, setUserLogin] = useState(false);
    const [sectionSelected, setSectionSelected] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [newMessage, setNewMessage] = useState('')
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if(!userLoggin || ws) return
        try {
            const sessionId = Math.random().toString(36).substring(2);
            const newWs = new WebSocket(`wss://studystacks.netlify.app:402?sessionId=${sessionId}`);

            newWs.onopen = function () {
                console.log('Connected to WebSocket server');
            };
            newWs.onmessage = function (event) {
                    const data = event.data
                    const nData = JSON.parse(data);
                    if (nData.newMessage) {
                        if (nData.newMessage.chat_id !== chat_id ) return
                        setMessagesList(prevList => [...prevList, nData.newMessage]);
                    }
            };
            newWs.onclose = function () {
                console.log('Disconnected from WebSocket server');
            };
            setWs(newWs);
        } catch (error) {
            console.log(error)
        }
    }, [userLoggin]);

    useEffect(() => {
        if (!section_id) return;
        setSectionSelected(section_id);
    }, [section_id]);

    useEffect(() => {
        if (!sectionSelected) return;
        getMessages();
    }, [sectionSelected]);

    const getMessages = () => {
        axios.get(`/api/messages/section/${sectionSelected}`).then(({ data }) => {
            setMessagesList(data);
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          handleSendMessage();
        }
      }      

    const handleSendMessage = () => {
        if (userLoggin.user_id && newMessage.length > 0 && section_id && ws) {
            const messageData = {
                message: newMessage,
                section_id: section_id,
                user_id: userLoggin.user_id
            };
            setNewMessage('');
            axios.post(`/api/messages/user/${userLoggin.user_id}`, messageData)
                .then(({ data }) => {
                    ws.send(JSON.stringify({
                        newMessage: {
                            ...messageData,
                            date: new Date(),
                            chat_id: chat_id,
                            username: userLoggin.username,
                            image: userLoggin.image,
                        }
                    }));
                });
        }
    }

    return (
        <Flex
            bg="primaryWhite.500"
            w="100vw"
            h="100vh"
            flexDir={"column"}
            alignItems={"center"}
            overflowY={"scroll"}
        >
            <CommunityDashboard community_id={community_id} section_id={section_id} userLoggin={userLoggin} >
                <Navbar
                    session={{ status, data }}
                    userLoggin={userLoggin}
                    setUserLogin={setUserLogin}
                />

                <Flex
                    className={styles.chatThread}
                    flexDirection={'column'}
                    w={["100vw", "80vw", "700px", "700px", "700px"]}
                    bg="#fff"
                    paddingBottom="14px"
                    paddingX="14px"
                    color={"primaryGray.500"}
                    justifyContent={"end"}
                    p={"15px"}
                    mt={"65px"}
                    h={'100%'}
                >
                    {
                        messagesList.map(mes => {
                            return <Flex w={'100%'} flexDir={mes.user_id === userLoggin.user_id ? 'row-reverse' : 'row'}>
                                <Image
                                    height="35px"
                                    width="35px"
                                    borderRadius="50%"
                                    objectFit="cover"
                                    src={mes.image}
                                    alt=""
                                    mx={'5px'}
                                />
                                <Text className={styles.li}>{mes.message}</Text>
                            </Flex>
                        })
                    }
                    <Flex alignItems={'center'}>
                        <Input placeholder="Mensaje..." value={newMessage} onChange={({ target }) => setNewMessage(target.value)} onKeyDown={handleKeyDown}></Input>
                        <Button size="sm" colorScheme="blue" ms={'5px'} onClick={handleSendMessage}>Enviar</Button>
                    </Flex>
                </Flex>
            </CommunityDashboard >
        </Flex >
    );
}

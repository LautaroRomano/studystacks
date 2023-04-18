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
    const [community_id, section_id] = router.query.community_id || [null, null];
    const { status, data } = useSession();
    const [userLoggin, setUserLogin] = useState(false);
    const [sectionSelected, setSectionSelected] = useState(null);
    const [messagesList, setMessagesList] = useState([]);
    const [newMessage, setNewMessage] = useState('')

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

    const handleSendMessage = () => {
        if (userLoggin.user_id && newMessage.length > 0 && section_id)
            axios.post(`/api/messages/user/${userLoggin.user_id}`, {
                message: newMessage,
                section_id: section_id
            })
                .then(({ data }) => {
                    getMessages();
                    setNewMessage('')
                });
        else console.log('no se pudo enviar el mensaje', { userLoggin: userLoggin.user_id, newMessageLength: newMessage.length > 0, section_id: section_id })
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
                        <Input placeholder="Mensaje..." value={newMessage} onChange={({ target }) => setNewMessage(target.value)}></Input>
                        <Button size="sm" colorScheme="blue" ms={'5px'} onClick={handleSendMessage}>Enviar</Button>
                    </Flex>
                </Flex>
            </CommunityDashboard >
        </Flex >
    );
}

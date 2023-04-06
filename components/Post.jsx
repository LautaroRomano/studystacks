import { Flex, Image, Text } from '@chakra-ui/react'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
export default function Post() {
    return (
        <Flex
            w={['100vw', '80vw', '700px', '700px', '700px']}
            bg='#fff'
            paddingBottom='14px'
            paddingX='14px'
            position='relative'
            flexDir={'column'}
        >
            <Flex h={'1.5px'} w={'90%'} bg={'primaryGray.700'} margin={'auto'} ></Flex>
            <Flex
                gap='12px'
                mt='14px'
            >
                <Image
                    height='40px'
                    width='40px'
                    borderRadius='50%'
                    objectFit='cover'
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                    alt=""
                />
                <Flex alignItems={'center'}>
                    <Text
                        letterSpacing='.4px'
                        fontSize='14px'
                        fontWeight='500'
                        color='primaryGray.500'
                    >
                        @exe_romano
                    </Text>
                    <Text
                        fontSize='12px'
                        color='primaryGray.600'
                        ms={'15px'}
                    >
                        hace 4 min
                    </Text>
                </Flex>
                <Text fontSize={'25px'} position={'absolute'} right={'25px'} top='25px'>...</Text>
            </Flex>
            <Flex flexDir={'column'}>
                <Text
                    fontSize='14px'
                    color='primaryGray.300'
                    fontWeight={'500'}
                    marginTop='16px'
                    lineHeight='1.7'
                >
                    Titulo de ejemplo...
                </Text>
                <Text
                    fontSize='14px'
                    color='primaryGray.500'
                    marginTop='5px'
                    lineHeight='1.7'
                >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, est iusto esse corrupti molestias facilis? Reprehenderit enim culpa laborum! Accusamus corrupti in omnis alias obcaecati labore dolores adipisci iusto voluptatem?
                </Text>
                <Flex border={'1px solid #ababab'} position={'relative'} borderRadius={'0 15px 15px 15px'} mt={'10px'} flexDir={'column'}>
                    <Flex my={'5px'}></Flex>
                    <Text
                        fontSize='15px'
                        color='primaryGray.500'
                        marginTop='16px'
                        lineHeight='1.7'
                        position={'absolute'}
                        top='-7'
                        left={'7'}
                        bg={'#fff'}
                        px='3px'
                    >
                        Archivos adjuntos
                    </Text>
                    <Flex
                        w={'100%'}
                        color='primaryGray.500'
                        p={'10px'}
                        alignItems={'center'}
                    >
                        <Text color='warning.500'>
                            <PictureAsPdfIcon />
                        </Text>
                        <Text
                            fontSize='14px'
                            color='primaryGray.500'
                            marginTop='5px'
                            lineHeight='1.7'
                            ms={'10px'}
                            mt={'-5px'}
                        >
                            Enanos albinos link.pdf
                        </Text>
                    </Flex>
                    <Flex
                        w={'100%'}
                        color='primaryGray.500'
                        p={'10px'}
                        alignItems={'center'}
                    >
                        <Text color='warning.500'>
                            <PictureAsPdfIcon />
                        </Text>
                        <Text
                            fontSize='14px'
                            color='primaryGray.500'
                            marginTop='5px'
                            lineHeight='1.7'
                            ms={'10px'}
                            mt={'-5px'}
                        >
                            Parcial 1 Fisica 2.pdf
                        </Text>
                    </Flex>
                    <Flex
                        w={'100%'}
                        color='primaryGray.500'
                        p={'10px'}
                        alignItems={'center'}
                    >
                        <Text color='warning.500'>
                            <PictureAsPdfIcon />
                        </Text>
                        <Text
                            fontSize='14px'
                            color='primaryGray.500'
                            marginTop='5px'
                            lineHeight='1.7'
                            ms={'10px'}
                            mt={'-5px'}
                        >
                            Parcial 2 Fisica 2.pdf
                        </Text>
                    </Flex>
                    <Flex
                        w={'100%'}
                        color='primaryGray.500'
                        p={'10px'}
                        alignItems={'center'}
                    >
                        <Text color='warning.500'>
                            <PictureAsPdfIcon />
                        </Text>
                        <Text
                            fontSize='14px'
                            color='primaryGray.500'
                            marginTop='5px'
                            lineHeight='1.7'
                            ms={'10px'}
                            mt={'-5px'}
                        >
                            Parcial 3 Fisica 2.pdf
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                mt='20px'
                alignItems='center'
            >
                <Flex
                    marginRight='21px'
                    alignItems='center'
                >
                    <Text color={'primaryGray.500'} fontSize={'14px'}>
                        <InsertEmoticonIcon></InsertEmoticonIcon>
                    </Text>
                    <Flex padding={'5px'} bg={'primaryGray.700'} borderRadius={'10px'} ms='5px' color={'primaryGray.500'} fontSize={'14px'}>
                        ❤️
                        34
                    </Flex>
                    <Flex padding={'5px'} bg={'primaryGray.700'} borderRadius={'10px'} mx='2px' color={'primaryGray.500'} fontSize={'14px'}>
                        👍
                        6
                    </Flex>
                    {/* <Image
                        height='32px'
                        width='32px'
                        objectFit='cover'
                        borderRadius='50%'
                        border='3px solid #FFF'
                        marginRight='-15px'
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        alt=""
                    />
                    <Image
                        height='32px'
                        width='32px'
                        objectFit='cover'
                        borderRadius='50%'
                        border='3px solid #FFF'
                        marginRight='-15px'
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        alt=""
                    />
                    <Image
                        height='32px'
                        width='32px'
                        objectFit='cover'
                        borderRadius='50%'
                        border='3px solid #FFF'
                        marginRight='-15px'
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        alt=""
                    /> */}
                </Flex>
                <Text
                    color='primaryGray.600'
                    fontSize='12px'
                    marginLeft='10px'
                >
                    40 Likes
                </Text>
                <Text
                    color='primaryGray.600'
                    fontSize='12px'
                    marginLeft='auto'
                >
                    10 comentarios
                </Text>
                <Text
                    color='primaryGray.600'
                    fontSize='12px'
                    marginLeft='10px'
                >
                    5 compartidos
                </Text>
            </Flex>
        </Flex>
    )
}

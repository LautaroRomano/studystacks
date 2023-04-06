import { Flex, Image, Text } from '@chakra-ui/react'

export default function Home() {
    return (
        <Flex w={['100vw', '80vw', '700px', '700px', '700px']} bg='#fff' h='400px'>
            <Flex
                w='320px'
                borderRadius='20px'
                bg='#191A1D'
                overflow='hidden'
                padding='14px'
                position='relative'
                flexDir={'column'}
            >
                <Flex class="user"
                    gap='12px'
                >
                    <Image
                        height='40px'
                        width='40px'
                        borderRadius='50%'
                        objectFit='cover'
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                        alt=""
                    />
                    <Flex>
                        <Text
                            letterSpacing='.4px'
                            fontSize='14px'
                            fontWeight='500'
                            color='#fff'
                        >
                            Dadda Hicham
                        </Text>
                        <Text fontSize='12px'
                            color='rgba(255, 255, 255, 0.588)'
                        >
                            4 min ago
                        </Text>
                    </Flex>
                </Flex>
                <main>
                    <Text
                        fontSize='14px'
                        color='#fff'
                        marginTop='16px'
                        lineHeight='1.7'
                    >
                        We are facing a serious business dilemma, with Facebook taking away a good chunk of traffic to news and
                        content sites, and ad blockers .
                    </Text>
                </main>
                <Flex
                    mt='20px'
                    alignItems='center'
                >
                    <Flex
                        marginRight='21px'
                        alignItems='center'
                    >
                        <Image
                            height='32px'
                            width='32px'
                            objectFit='cover'
                            borderRadius='50%'
                            border='3px solid #191A1D'
                            marginRight='-15px'
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            alt=""
                        />
                        <Image
                            height='32px'
                            width='32px'
                            objectFit='cover'
                            borderRadius='50%'
                            border='3px solid #191A1D'
                            marginRight='-15px'
                            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            alt=""
                        />
                        <Image
                            height='32px'
                            width='32px'
                            objectFit='cover'
                            borderRadius='50%'
                            border='3px solid #191A1D'
                            marginRight='-15px'
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                            alt=""
                        />
                    </Flex>
                    <Text
                        color='rgba(255, 255, 255, 0.508)'
                        fontSize='12px'
                        marginLeft='10px'
                    >
                        40 Likes
                    </Text>
                    <Text
                        color='rgba(255, 255, 255, 0.508)'
                        fontSize='12px'
                        marginLeft='auto'
                    >
                        10 comment
                    </Text>
                    <Text
                        color='rgba(255, 255, 255, 0.508)'
                        fontSize='12px'
                        marginLeft='10px'
                    >
                        5 shared
                    </Text>
                </Flex>
            </Flex>
        </Flex >
    )
}

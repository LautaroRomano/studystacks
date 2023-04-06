import { Flex, Image, Text, Input } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit';
export default function Navbar() {
    return (
        <Flex
            w={['100vw', '80vw', '700px', '700px', '700px']}
            bg='#FFF'
            paddingBottom='14px'
            paddingX='14px'
            position='fixed'
            color={'primaryGray.500'}
            alignItems={'center'}
            p={'15px'}
            h={'65px'}
            boxShadow={'2xl'}
            borderBottom={'1px solid #ababab'}
            justifyContent={'space-between'}
        >

            <Flex alignItems={'center'}>
                <Text
                    letterSpacing='.4px'
                    fontSize='14px'
                    fontWeight='500'
                    color='primaryGray.500'
                >
                    @exe_romano
                </Text>
            </Flex>
            <Image
                height='40px'
                width='40px'
                borderRadius='50%'
                objectFit='cover'
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                alt=""
            />
        </Flex>
    )
}

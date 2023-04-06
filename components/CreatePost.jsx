import { Flex, Image, Text, Input } from '@chakra-ui/react'
import EditIcon from '@mui/icons-material/Edit';
export default function CreatePost() {
    return (
        <Flex
            w={['100vw', '80vw', '700px', '700px', '700px']}
            bg='#fff'
            paddingBottom='14px'
            paddingX='14px'
            position='relative'
            color={'primaryGray.500'}
            alignItems={'center'}
            p={'15px'}
            mt={'65px'}
        >
            <Flex mx={'5px'}>
                <EditIcon />
            </Flex>
            <Input placeholder='Crear post'></Input>
        </Flex>
    )
}

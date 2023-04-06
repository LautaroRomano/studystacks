import { Flex } from '@chakra-ui/react'
import Post from '../components/Post'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Flex bg='primaryWhite.500' w='100vw' h='100vh' flexDir={'column'} alignItems={'center'}> 
      <Post />
    </Flex>
  )
}

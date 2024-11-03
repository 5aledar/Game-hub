import { Outlet } from 'react-router-dom'
import './Index.css'
import { Box } from '@chakra-ui/react'
const Index = () => {

  return (
    <Box className={`index`} color={{ base: 'black', _dark: 'white' }} bg={{ base: 'white', _dark: '#1A202C' }}>
      <Outlet />
    </Box>
  )
}

export default Index
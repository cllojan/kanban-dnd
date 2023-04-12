
import { Container, Heading } from '@chakra-ui/react'
function App() {

  return (
      <>
      <Heading
        fontSize={{base:'4xl',sm:'5xl', md:'6xl'}}
        fontWeight="bold"
        textAlign="center"
        bgGradient="linear(to-1,#7928CA,#FF0080)"
        bgClip="text"
        mt={4}
      >
        DnD kanban
      </Heading>
      <Container maxWidth="container.lg" px={4} pt={10}>

      </Container>
      </>
  )
}

export default App

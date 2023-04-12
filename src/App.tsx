import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Column from './components/Column';
import { ColumnType } from './utils/enums';

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
        <SimpleGrid columns={{base:1,md:4}} spacing={{base:16,md:4}}>
          <Column column={ColumnType.TO_DO}/>
          <Column column={ColumnType.IN_PROGRESS}/>
          <Column column={ColumnType.BLOCKED}/>
          <Column column={ColumnType.COMPLETED}/>
          
        </SimpleGrid>
      </Container>
      </>
  )
}

export default App

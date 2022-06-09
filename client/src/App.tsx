import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'

import { List } from './components/list'

export const App = () => (
  <Box my={5}>
    <Container maxWidth="sm" component="main">
      <Paper>
        <List />
      </Paper>
    </Container>
  </Box>
)
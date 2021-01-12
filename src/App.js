import { Box, Container } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Router>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </Box>
    </Container>
  );
}

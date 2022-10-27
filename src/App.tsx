import { ChakraProvider, Box, theme } from "@chakra-ui/react"; 
import TodoList from "./components/TodoList";
import TodoAdd from "./components/TodoAdd";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          <ChakraProvider theme={theme}>
            <Box maxWidth="8xl" margin="auto" p={5}> 
              <TodoList /> 
              <TodoAdd />
            </Box>
          </ChakraProvider> 
      </header>
    </div>
  );
}

export default App;

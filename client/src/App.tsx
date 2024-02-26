import { Box } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ColorModeContext,  useMode} from "./theme";
import Navbar from "./scenes/navbar";


function App() {
  const {theme, toggleColorMode} = useMode(); // Destructure theme and toggleColorMode
  return (
    <ColorModeContext.Provider value={{ toggleColorMode: toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <BrowserRouter>
            <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
              <Navbar/>
              <Routes>
                <Route path="/" element={<div>dashboard page</div>} />
                <Route path="/predictions" element={<div>prediction page</div>} />
              </Routes>
            </Box>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
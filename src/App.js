import "./App.css";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Analysis from "./Pages/Analysis";
import Labs from "./Pages/Labs";
import Resources from "./Pages/Resources";
import Sandbox from "./Pages/Sandbox";
import Users from "./Pages/Users";
import VirtualMachines from "./Pages/VirtualMachines";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./Components/Navbar";
import { QueryClientProvider, QueryClient } from "react-query";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App bg-slate-800">
            <QueryClientProvider client={queryClient}> 
        <Router>          
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/analysis/reports" element={<Analysis />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/users" element={<Users />} />
            <Route path="/virtual_machines" element={<VirtualMachines />} />
            {/* <Route path='/users/reports' element={<Reports/>} /> */}
          </Routes>
        </Router>
            </QueryClientProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;

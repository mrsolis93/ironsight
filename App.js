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

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <div className="App bg-slate-800">
      <Router>
        <Navbar />
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
    </div>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<div className="fill-window bg-slate-800">{<App />}</div>, rootElement);

export default App;

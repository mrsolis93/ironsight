import "./App.css";
import Sidebar from "./Components/Sidebar";
import NavBar from "./Components/NavBar";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Analysis from "./Pages/Analysis";
import Labs from "./Pages/Labs";
import Resources from "./Pages/Resources";
import Sandbox from "./Pages/Sandbox";
import Users from "./Pages/Users";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Router>
          <NavBar />
          {/* <Sidebar /> */}
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/analysis/analysis2" element={<Analysis />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/users" element={<Users />} />
            {/* <Route path='/users/reports' element={<Reports/>} /> */}
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<div className="fill-window">{<App />}</div>, rootElement);

export default App;

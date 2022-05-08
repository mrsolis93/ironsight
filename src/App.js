import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Network from "./Pages/Network";
import Courses from "./Pages/Courses";
import Resources from "./Pages/Resources";
import Sandbox from "./Pages/Sandbox";
import Users from "./Pages/Users";
import Testing from "./Pages/Testing";
import VirtualMachines from "./Pages/VirtualMachines";
import Login from "./Pages/Login";
import SignOut from "./Pages/SignOut";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "react-query";
import LabOverview from "./Pages/DetailPages/LabOverview";
import StudentLabDetails from "./Pages/DetailPages/StudentLabDetails";
import UserDetails from "./Pages/DetailPages/UserDetails";
import VMDetails from "./Pages/DetailPages/VMDetails";
import CourseDetails from "./Pages/DetailPages/CourseDetails";
import StudentCourseDetails from "./Pages/DetailPages/StudentCourseDetails";
import Settings from "./Pages/Settings";
import Security from "./Pages/Security";

// import { Web3AuthProvider } from "./services/web3auth";
// import { WEB3AUTH_NETWORK_TYPE } from "./config/web3AuthNetwork";
// import { CHAIN_CONFIG_TYPE } from "./config/chainConfig";
// import Main from "./components/Main";
// import Setting from "./components/Setting";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const queryClient = new QueryClient();

// const [web3AuthNetwork, setWeb3AuthNetwork] = useState<WEB3AUTH_NETWORK_TYPE>("mainnet");
// const [chain, setChain] = useState<CHAIN_CONFIG_TYPE>("etherium_mainnet");


function App() {
  // Check if localStorage.theme is set
  if (localStorage.getItem("theme") === null) {
    // If not, set it to "ironsight_dark"
    localStorage.setItem("theme", "ironsight_dark");
  }

  // Check if localStorage.ironsight_token is set, if not, redirect to login
  if (
    localStorage.getItem("ironsight_token") === null &&
    window.location.pathname !== "/login"
  ) {
    window.location.href = "/login";
  }



  return (
    // Only return the theme provider if the page is not the login page and the token is set
    <div className="App bg-slate-800">
      <meta property="og:title" content="Ironsight" />
      <meta
        property="og:description"
        content="Web based platform that will assist in the visualization of user activity inside a cyber-range"
      />
      
      <meta
        property="og:image"
        content="https://ironsight.rellis.dev/assets/Ironsight1080.jpg"
      />

      <meta
        property="og:url"
        content="https://ironsight.rellis.dev/"
      />

      <ThemeProvider theme={darkTheme}>
          {/* <Web3AuthProvider chain={chain} web3AuthNetwork={web3AuthNetwork}> */}
            <QueryClientProvider client={queryClient}>
              <Router>
                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/home" exact element={<Home />} />
                  <Route path="/network" element={<Network />} />
                  <Route path="/network/reports" element={<Network />} />
                  <Route path="/courses" element={<Courses />} />
                  <Route path="lab_details/:lab_num" element={<LabOverview />} />
                  <Route
                    path="lab_details/:lab_num/:student_name"
                    element={<StudentLabDetails />}
                  />
                  <Route
                    path="course_details/:course_id"
                    element={<CourseDetails />}
                  />
                  <Route
                    path="course_details/:course_id/:student_name"
                    element={<StudentCourseDetails />}
                  />
                  <Route path="vm_details/:vm_name" element={<VMDetails />} />
                  <Route path="user_details/:user_name" element={<UserDetails />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/sandbox" element={<Sandbox />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/virtual_machines" element={<VirtualMachines />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signout" element={<SignOut />} />
                  <Route path="/testing" element={<Testing />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/security" element={<Security />} />
                </Routes>
              </Router>
            </QueryClientProvider>
          {/* </Web3AuthProvider> */}
      </ThemeProvider>
    </div>
  );
}

export default App;

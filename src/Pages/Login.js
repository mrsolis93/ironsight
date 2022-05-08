import React from "react";
import "../App.css";
import ThemeButton from "../Components/ThemeButton";
import { authenticate, postActivityLog } from "../IronsightAPI";
import CircularProgress from "@mui/material/CircularProgress";
import {ReactComponent as Logo } from "../IronsightLogo.svg";

import OpenLogin from "@toruslabs/openlogin";




//   Get clients remote IP address and log to console
const get_client_ip = () => {
  var client_ip = "";
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://ip.jsontest.com/", false);
  xhr.send();
  if (xhr.status === 200) {
    client_ip = xhr.responseText;
  }
  return client_ip;
};



// Submit login function, console.log the username and password
// function submitLogin() {
//   var username = document.getElementById("ironsight_username").value;
//   var password = document.getElementById("ironsight_password").value;

//   //   Try catch block to handle errors
//   try {
//     var status = authenticate(username, password);
//     // Handle pending promise
//     status.then(function (data) {
//       console.log(data);
//       if (data === "success") {
//         console.log("Login successful!");
//         try {
//           const client_ip = get_client_ip();
//           // Parse JSON string to object from client_ip
//           const client_ip_obj = JSON.parse(client_ip);
//           // Log client IP address to activity log
//           postActivityLog(
//             username,
//             "[Ironsight] Logged in from " + client_ip_obj.ip
//           );
//         } catch (error) {
//           console.log(error);
//         }
//         localStorage.setItem("ironsight_token", "test");
//         localStorage.setItem("ironsight_username", username);
//         // Wait until the promise is resolved
//         setTimeout(function () {
//           window.location.href = "/";
//         }, 1000);
//       }
//       if (data === "wrong_password") {
//         console.log("Wrong password!");
//         try {
//           const client_ip = get_client_ip();
//           // Parse JSON string to object from client_ip
//           const client_ip_obj = JSON.parse(client_ip);
//           // Log client IP address to activity log
//           postActivityLog(
//             username,
//             "[Ironsight] Failed login from " +
//               client_ip_obj.ip +
//               ", Reason: Wrong Password"
//           );
//         } catch (error) {
//           console.log(error);
//         }
//         alert("Wrong password!");
//       }
//       if (data === "user_not_found") {
//         console.log("User not found!");
//         try {
//           const client_ip = get_client_ip();
//           // Parse JSON string to object from client_ip
//           const client_ip_obj = JSON.parse(client_ip);
//           // Log client IP address to activity log
//           postActivityLog(
//             username,
//             "[Ironsight] Failed login from " +
//               client_ip_obj.ip +
//               ", Reason: User not found"
//           );
//         } catch (error) {
//           console.log(error);
//         }
//         alert("User not found!");
//       }
//     });
//   } catch (error) {
//     // Catch any errors
//     console.log(error);
//     alert("Error: " + error);
//   }
// }



const Login = () => {


  // State for isLoggingIn
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isLoggingInWeb3, setIsLoggingInWeb3] = React.useState(false);
  const [openlogin, setOpenLogin] = React.useState();
  const [privKey, setPrivKey] = React.useState();


  // Check if localStorage.theme is set
  if (localStorage.getItem("theme") === null) { 
  // If not, set it to "ironsight_dark"
  localStorage.setItem("theme", "ironsight_dark");
  
  }

  const onMount = async () => {
    setIsLoggingInWeb3(true);
    try {
      const sdk = new OpenLogin({
        clientId:
          "BCKqsKrxuL8pnXP4eZ2IPz0Fa8codbrHEfW1cCd8ZW6xl32qCxXcG8OzMAGYSfJ783TkKQd_rKwxMXRG5sc7tEg",
        network: "mainnet",
      });
      setOpenLogin(sdk);

      await sdk.init();
      setPrivKey(sdk.privKey);
    } finally {
      setIsLoggingInWeb3(false);
    }
  };

  const onLogin = async () => {
    if (isLoggingInWeb3 || privKey || !openlogin) return;

    setIsLoggingInWeb3(true);


    try {
      console.log("Logging in...");
      var username = document.getElementById("ironsight_username").value;
      var password = document.getElementById("ironsight_password").value;
      localStorage.setItem("ironsight_token", "test");
      localStorage.setItem("ironsight_username", username);

      await openlogin.login({
        loginProvider: "google",
        redirectUrl: "http://localhost:3000/",
      });


      
    } catch {
      setIsLoggingInWeb3(false);
    }
  };

  // Logout function Test on this page
  const onLogout = async () => {
    if (isLoggingInWeb3 || !openlogin) return;

    setIsLoggingInWeb3(true);
    try {
      await openlogin.logout({});
      setPrivKey(undefined);
    } finally {
      setIsLoggingInWeb3(false);
    }
  };

  React.useEffect(() => {
    onMount();
  }, []);


  return (
    <div className="login min-w-max fill-window h-screen bg-slate-800">
      <div className="flex justify-end m-4">
        <ThemeButton />
      </div>
      <div className="flex md:m-0 min-h-[80%]">
        <div className="flex w-full mx-4 md:mx-0 min-h-full justify-center m-auto">
          <div className="card w-full md:w-[48rem] bg-base-100 shadow-xl">
          
            <Logo
              // className="block h-12 mx-auto mt-4"

              className="block h-14 mx-auto mt-4 light:fill-slate-900 fill-gray-100 "  

              src={"./IronsightLogo.svg"}
              alt="Ironsight Banner"
              
            />

            <div className="form-control card-body p-4 md:p-8">
              <label className="input-group input-group-vertical">
                <span>Username</span>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered"
                  id="ironsight_username"
                />
              </label>

              <label className="input-group input-group-vertical mt-4">
                <span>Password</span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered input-password"
                  id="ironsight_password"
                />
              </label>

              <div className="card-actions justify-end mt-4">
                <button className="btn btn-ghost">Forgot Password</button>

                {/* If isLoading, load a MUI spinner, otherwise do login button */}
                {/* {isLoggingIn ? (
                  <CircularProgress />
                ) : (
                  <button
                    onClick={() => {
                      setIsLoggingIn(true);
                      submitLogin();
                    }
                    }
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                )} */}

                {/* If isLoading, load a MUI spinner, otherwise do login button */}
                {isLoggingInWeb3 ? (
                  <CircularProgress />
                ) : (
                  <button
                    onClick={() => {
                      setIsLoggingInWeb3(true);
                      console.log("Web3 login button clicked");
                      onLogin();
                    }
                    }
                    className="btn btn-primary"
                  >
                    Web3Auth Login
                  </button>
                )}

                   {/* If isLoading, load a MUI spinner, otherwise do logout button */}
                   {isLoggingInWeb3 ? (
                  <CircularProgress />
                ) : (
                  <button
                    onClick={() => {
                      setIsLoggingInWeb3(true);
                      console.log("Web3 logout button clicked");
                      onLogout();
                    }
                    }
                    className="btn btn-primary"
                  >
                    Web3Auth Logout Test
                  </button>
                )}

              </div>

            

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React from "react";
import "../App.css";
import ThemeButton from "../Components/ThemeButton";
import { authenticate } from "../IronsightAPI";

// Submit login function, console.log the username and password
function submitLogin() {
  var username = document.getElementById("ironsight_username").value;
  var password = document.getElementById("ironsight_password").value;
  console.log("Username: " + username);
  console.log("Password: " + password);
  var status = authenticate(username, password);
  // Handle pending promise
  status.then(function (data) {
    console.log(data);
    if (data === "success") {
      console.log("Login successful!");
      window.location.href = "/";
      localStorage.setItem("ironsight_token", "test");
    }
    if (data === "wrong_password") {
      console.log("Wrong password!");
      alert("Wrong password!");
    }
    if (data === "user_not_found") {
      console.log("User not found!");
      alert("User not found!");
    }
  });
}

const Login = () => {
  return (
    <div className="login min-w-max fill-window h-screen bg-slate-800">
      <div className="flex justify-end m-4">
        <ThemeButton />
      </div>
      <div className="flex md:m-0 min-h-[80%]">
        <div className="flex w-full mx-4 md:mx-0 min-h-full justify-center m-auto">
          <div className="card w-full md:w-[48rem] bg-base-100 shadow-xl">
            <img
              className="block h-8 mx-auto mt-4"
              src={process.env.PUBLIC_URL + "/logo_horizontal.png"}
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
                <button
                  onClick={() => submitLogin()}
                  className="btn btn-primary"
                >
                  {" "}
                  Login{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import "./loginStyle.css";
import { Canvas, useFrame } from "@react-three/fiber";
import BackEffects from "../utils/BackEffects";
import { OrbitControls } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../services/Auth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showing, setShowing] = useState(false);

  const handleLogin = async () => {
    // const form = new FormData();
    // form.append("username", username);
    // form.append("password", password);
    // Simulated login logic (replace with your actual authentication logic)
    // const isAuthenticated =
    //   email === "user@example.com" && password === "password";

    const token = await getAuthToken(JSON.stringify({ username, password }));
    if (token) {
      console.log(token.token);
      // Store authentication token or user data in local storage or state
      // localStorage.setItem("token", token);
      navigate("/dashboard"); // Redirect to dashboard or any other protected route
    } else {
      alert("Invalid username or password. Please try again.");
    }
  };
  const handleRegister = async () => {};
  return (
    <div className="loginPage">
      <h2>
        <a style={{ cursor: "pointer" }} onClick={() => setShowing(false)}>
          Register{" "}
        </a>{" "}
        /{" "}
        <a style={{ cursor: "pointer" }} onClick={() => setShowing(true)}>
          {" "}
          login
        </a>
      </h2>
      {showing ? (
        <div className="login-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="login-container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re Password"
            // value={password}
            onChange={(e) => {
              password == e.target.value
                ? e.target.classList.remove("error")
                : e.target.classList.add("error");
            }}
          />

          <button onClick={handleRegister}>Register</button>
        </div>
      )}
      {/* <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div
                      data-mdb-input-init
                      className="form-outline form-white mb-4"
                    >
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" for="typePasswordX">
                        Password
                      </label>
                    </div>

                    <p className="small mb-5 pb-lg-2">
                      <a className="text-white-50" href="#!">
                        Forgot password?
                      </a>
                    </p>

                    <button
                      data-mdb-button-init
                      data-mdb-ripple-init
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a href="#!" className="text-white-50 fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* <Canvas style={{ position: "absolute", top: 0, left: 0 }}>
        <BackEffects numSqrs={3} width={10} height={10} />
        <OrbitControls />
      </Canvas> */}
    </div>
  );
}

export default Login;

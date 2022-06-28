// Libraries
import React, { useEffect, useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { update } from "../app/slice/userSlice";
import { Navigate } from "react-router-dom";

// Functional Components
import Header from "../Components/Welcome/Header";

// Styled Components
import { InputContainer, PrimaryBtn } from "./Styles/FormPageStyled.js";
import { LinkBtn, GoogleBtn, Divider } from "./Styles/RegisterStyled";

// ENV
import { API } from "../env";

const Login = () => {
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.user);
  // shows error msg for this form
  const [err, setErr] = useState("");
  // hide and show - confirm-pass
  const [passInputType, setPassInputType] = useState("password");
  const [userLogged, setUserLogged] = useState(user.token);


  useEffect(() => {
    // All Input Fields
    const userInput = document.getElementById("username");
    const passInput = document.getElementById("password");

    // Removing Red fields if any
    [userInput, passInput].forEach((field) => {
      field.addEventListener("click", (e) => {
        e.currentTarget.classList.remove("wrong");
      });
    });
  }, []);

  // change password input type
  const toggleInputType = (e) => {
    if (passInputType === "password") {
      e.currentTarget.innerText = "hide";
      setPassInputType("text");
    } else {
      e.currentTarget.innerText = "show";
      setPassInputType("password");
    }
  };


  // When Login form is submited
  const login = async () => {
    const userInput = document.getElementById("username");
    const passInput = document.getElementById("password");
    const userName = userInput.value;
    const password = passInput.value;

    // preventing bad requests
    if (!userName || !password) return;

    // Login API call
    const response = await fetch(
      `${API}/api/login?user=${userName}&pass=${password}`
    );

    // getting Api responce
    const data = await response.json();

    // if error occured
    if (!data.success) {
      setErr(data.error.msg);
      if (data.error.code === 2) {
        userInput.classList.add("wrong");
      } else if (data.error.code === 3) {
        passInput.classList.add("wrong");
      }
      return;
    }

    // set recieved user token
    localStorage.setItem("token", data.token);
    // set user id
    setUserLogged(true);
    dispatch(update({ id: data.userId }));
  };

  return (
    <div>
      {userLogged && <Navigate to="/feed" />}
      <Header hidden={true} />
      <InputContainer onSubmit={(e) => e.preventDefault()}>
        <div className="holder">
          <label htmlFor="username">Login</label>
          <p>Enter to your professional community</p>
          <input
            required
            type="text"
            id="username"
            placeholder="Username or Email"
          />
          <div className="pass-container">
            <input
              required
              placeholder="Password"
              type={passInputType}
              id="password"
            />
            <strong onClick={toggleInputType}>show</strong>
          </div>
          <Link to="/forget-pass">Forgot password?</Link>
          {err && <p className="error">{err}</p>}
          <PrimaryBtn onClick={login}>Login</PrimaryBtn>
          <Divider className="button-divider">or</Divider>
          <GoogleBtn onClick={login}>
            <img src="/images/google.svg" alt="" />
            <span>Login with Google</span>
          </GoogleBtn>
          <p>
            New To LinkedIn?{" "}
            <LinkBtn to="/join-now" className="link">
              Register
            </LinkBtn>
          </p>
        </div>
      </InputContainer>
    </div>
  );
};

export default Login;

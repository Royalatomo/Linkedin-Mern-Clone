// Libraries
import React, { useEffect, useState } from "react";

// Redux
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../../app/slice/userSlice"; // redux

// Styled Components
import {
  SectionHeading,
  InputDiv,
  SingUp,
  SignInGoogle,
  Container,
  LeftSide,
  RightSide
} from "./Styles/MainImgStyled";

// ENV
import { API } from "../../env";

function MainImg() {
  const dispatch = useDispatch();

  // shows error msg for this form
  const [err, setErr] = useState("");
  // stores value of password input type
  const [passInputType, setPassInputType] = useState("password");


  useEffect(() => {
    // All Input Fields
    const userInput = document.getElementById("username");
    const passInput =  document.getElementById("password");

    // Removing Red fields if any
    [userInput, passInput].forEach((field) => {
      field.addEventListener("click", (e) => {
        e.currentTarget.classList.remove("wrong");
        setErr("");
      });
    });
  }, [])


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

  // When form is submited
  const login = async () => {
    const userInput = document.getElementById("username");
    const passInput =  document.getElementById("password");
    const userName = userInput.value;
    const password = passInput.value;

    // preventing bad requests
    if(!userName || !password) return;

    // Login API call
    const response = await fetch(
      `${API}/api/login?user=${userName}&pass=${password}`
    );

    // getting Api responce
    const data = await response.json();

    // if error occured
    if (!data.success) {
      setErr(data.error.msg);
      if (data.error.code === 2 || data.error.code === 0) {
        userInput.classList.add("wrong");
      } else if (data.error.code === 3) {
        passInput.classList.add("wrong");
      }
      return;
    }

    // set recieved user token
    localStorage.setItem("token", data.token);;
    // set user id
    dispatch(update({ id: data.userId, token: data.token }));
  };

  return (
    <Container>
      <LeftSide onSubmit={(e) => e.preventDefault()}>
        <SectionHeading>Welcome to your professional community</SectionHeading>

        <InputDiv>
          <input
            required
            placeholder="Email or username"
            type="text"
            id="username"
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
          <Link to="/forget-pass">
            <p>Forgot password?</p>
          </Link>
          {err && <p className="error">{err}</p>}
        </InputDiv>

        <SingUp type="submit" onClick={login}>
          Login
        </SingUp>
        <div className="button-divider">or</div>
        <SignInGoogle type="submit" onClick={login}>
          <img src="/images/google.svg" alt="" />
          <span>Login with Google</span>
        </SignInGoogle>
      </LeftSide>

      <RightSide>
        <img loading="lazy" src="/images/welcome-hero.svg" alt="" />
      </RightSide>
    </Container>
  );
}

export default MainImg;

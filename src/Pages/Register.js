// Libraries
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../app/slice/userSlice"; // Redux
import { Navigate } from "react-router-dom";

// Functional Components
import Header from "../Components/Welcome/Header";

// Styled Components
import { InputContainer, PrimaryBtn } from "./Styles/FormPageStyled.js";
import { LinkBtn, GoogleBtn, Divider } from "./Styles/RegisterStyled";

// ENV
import { API } from "../env";

const Register = () => {
  const dispatch = useDispatch();

  // user-info - for checking if the user not logged in
  const user = useSelector((state) => state.user);
  // shows error msg for this form
  const [err, setErr] = useState("");
  // if registeration process completes (before code varified)
  const [correctInfo, setCorrectInfo] = useState(false);
  // hide and show - confirm-pass
  const [passInputType, setPassInputType] = useState("password");
  // stores form data - for resending code if needed
  const [userInfo, setUserInfo] = useState({ name: "", email: "", pass: "" });
  const [userLogged, setUserLogged] = useState(user.token);


  useEffect(() => {
    // All Input Fields
    const userName = document.getElementById("username");
    const email = document.getElementById("email");
    const pass = document.getElementById("password");
    const confirmPass = document.getElementById("confirm-password");

    // Removing Red fields if any
    [userName, email, pass].forEach((field) => {
      if (!field) return;
      field.addEventListener("click", (e) => {
        e.currentTarget.classList.remove("wrong");
        setErr("");
      });
    });

    const registerBtn = document.getElementById("register-btn");

    // Pass & Confim-Pass matching
    [pass, confirmPass].forEach((field) => {
      field.addEventListener("input", (e) => {
        if (confirmPass.value !== pass.value && confirmPass.value !== "") {
          setErr("Confrim Password does not match");
          confirmPass.classList.add("wrong");
          registerBtn.style.backgroundColor = "#36404a";
          registerBtn.disabled = true;
        } else {
          setErr("");
          confirmPass.classList.remove("wrong");
          registerBtn.style.backgroundColor = "var(--primary-color)";
          registerBtn.disabled = false;
        }
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


  // When Registered form is submited
  const singup = async (e) => {
    e.preventDefault();

    const userName = document.getElementById("username");
    const email = document.getElementById("email");
    const pass = document.getElementById("password");

    // preventing bad requests
    if (!userName.value || !email.value || !pass.value) {
      return;
    }

    // Register API call
    const request = await fetch(`${API}/api/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: userName.value,
        email: email.value,
        pass: pass.value,
      }),
    });

    // getting Api responce
    const data = await request.json();

    // if error occured
    if (!data.success) {
      setErr(data.error.msg);
      if (data.error.code === 4 || data.error.code === 0) {
        userName.classList.toggle("wrong");
      } else if (data.error.code === 5 || data.error.code === 1) {
        email.classList.toggle("wrong");
      }
      return;
    }

    // saving data - if needed for resending code
    setUserInfo({ name: userName.value, email: email.value, pass: pass.value });
    console.log("CODE:", data.code);

    setErr("");
    setCorrectInfo(true);
  };


  // Checking Verification Code
  const checkCode = async (e) => {
    e.preventDefault();

    // user typed code
    const code = document.getElementById("code");

    // preventing bad requests
    if (!code.value) return;

    code.addEventListener('click', () => {
      code.classList.remove("wrong")
      code.value = "";
      setErr("");
    });

    // Verification Api call
    const request = await fetch(`${API}/api/register/verify`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: userInfo.email, code: code.value }),
    });

    // Api responce
    const data = await request.json();

    // If error occured and exit
    if (!data.success) {
      setErr(data.error.msg);
      if (data.error.code === 7) {
        code.classList.add("wrong");
      }
      return;
    }

    // set recieved user token
    localStorage.setItem("token", data.token);
    setUserLogged(true);
    // set user id
    dispatch(update({ id: data.userId }));
  };


  // For resending Code
  const resendCode = async () => {
    setErr("");

    // Register Api call
    const request = await fetch(`${API}/api/register/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uname: userInfo.name,
        email: userInfo.email,
        pass: userInfo.pass,
      }),
    });

    // Api responce
    const data = await request.json();

    // If error occured
    if (!data.success) {
      setErr(data.error.msg);
      return;
    }

    console.log("NEW CODE:", data.code);
  };

  return (
    <div>
      { userLogged && <Navigate to="/feed" />}
      <Header hidden={true} />
      <InputContainer>

        {/* Register Form */}
        {!correctInfo && (
          <form className="holder" onSubmit={singup}>
            <label htmlFor="username">Register</label>
            <p>Join your professional community</p>
            <input type="text" id="username" placeholder="Username" />
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Password" />
            <div className="pass-container">
              <input
                required
                placeholder="Confirm Password"
                type={passInputType}
                id="confirm-password"
              />
              <strong onClick={toggleInputType}>show</strong>
            </div>
            {err && <p className="error">{err}</p>}
            <PrimaryBtn type="submit" id="register-btn">
              Register
            </PrimaryBtn>
            <Divider className="button-divider">or</Divider>
            <GoogleBtn type="submit" onClick={singup}>
              <img src="/images/google.svg" alt="" />
              <span>Sing in with Google</span>
            </GoogleBtn>
            <p>
              Already a member?{" "}
              <LinkBtn to="/login" className="link">
                Login
              </LinkBtn>
            </p>
          </form>
        )}

        {/* Verification Form */}
        {correctInfo && (
          <form className="holder code-holder" onSubmit={checkCode}>
            <label htmlFor="code">Code</label>
            <p>Open Your Email Inbox</p>
            <input
              maxLength={4}
              required
              type="text"
              id="code"
              placeholder="XXXX"
            />
            <strong onClick={resendCode}>Didn't Received? Resent Code</strong>
            {err && <p className="error">{err}</p>}
            <PrimaryBtn type="submit">Let's Go</PrimaryBtn>
          </form>
        )}
      </InputContainer>
    </div>
  );
};

export default Register;

// Libraries
import React, { useEffect, useState } from "react";

// Styled Components
import { Container, Form, InputDiv } from "./Styles/UserUpdateStyled";
import { ImgDiv, Profile, TxtDiv, Save } from "./Styles/UserUpdateStyled";

// ENV
import { API, BACKGROUND_IMG, HEADLINE, LOADING_GIF, PROFILE_IMG } from "../../env";

const UserUpdate = ({ token, userInfo, getUserInfo }) => {
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);
  let exit = true;
  const uploadImg = async (elem, option) => {
    const Request = await fetch(
      `${API}/api/user/image?token=${localStorage.getItem("token")}`,
      {
        method: "POST",
        headers: { Accepts: "application/json", "Content-Type": "application/json"},
        body: JSON.stringify({
          extension: elem.dataset["ext"],
          data: elem.src,
          upload: option === 0 ? "pf" : "bg",
        }),
      }
    );

    const res = await Request.json();
    if (!res.success) {
      alert("something went wrong");
      console.log(res.error);
      return;
    }

    return res.link;
  };

  const saveInfo = async () => {
    if (!exit) return;
    const userName = document.querySelector("#userinfo-update #uname").value;
    const headline = document.querySelector("#userinfo-update #headline").value;
    const profileImg = document.querySelector("#userinfo-update input#pImg");
    const bgImg = document.querySelector("#userinfo-update input#bgImg");

    const userInfoUpdater = document.getElementById("userinfo-update");
    if (!userName && !headline && !profileImg.value && !bgImg.value) {
      userInfoUpdater.classList.remove("visible");
      return;
    }

    exit = false;
    setLoad(true);
    let profileImgLink = "";
    let bgImgLink = "";

    if (profileImg.value) {
      const img = document.querySelector("#userinfo-update img.pImg");
      profileImgLink = await uploadImg(img, 0);
    }

    if (bgImg.value) {
      const img = document.querySelector("#userinfo-update img.bgImg");
      bgImgLink = await uploadImg(img, 1);
    }

    const responce = await fetch(`${API}/api/user/update/info?token=${token}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        uname: userName || undefined,
        headline: headline || undefined,
        bgImg: bgImgLink || undefined,
        profileImg: profileImgLink || undefined,
      }),
    });

    const userUpdateData = await responce.json();
    setLoad(false);
    if (!userUpdateData.success) {
      const username = document.getElementById("uname");
      if (userUpdateData.error.code === 0) {
        username.classList.add("wrong");
        setErr(`No special character other than _ in username`);
      } else {
        username.classList.add("wrong");
        setErr(`${userUpdateData.error.msg}`);
      }
      return;
    }

    setErr("");
    exit = true;
    userInfoUpdater.classList.remove("visible");
    getUserInfo();
  };

  const inputReset = (e) => {
    e.currentTarget.classList.remove("wrong");
    e.currentTarget.value = "";
    setErr("");
  };

  useEffect(() => {
    const userChangeHolder = document.querySelector("#userinfo-update");
    userChangeHolder.addEventListener("click", (e) => {
      const btn = document.querySelector("#userinfo-update .save-btn");
      if (btn.innerText.toLowerCase() !== "save") return;
      if (e.target.classList.contains("holder")) {
        setErr("");
        userChangeHolder.classList.remove("visible");
        document.getElementById("uname").classList.remove("wrong");
      }
    });

    const profileInput = document.querySelector(`#userinfo-update input#pImg`);
    const bgInput = document.querySelector(`#userinfo-update input#bgImg`);

    profileInput.addEventListener("change", (e) => {
      previewProfile(e.currentTarget, 0);
    });
    bgInput.addEventListener("change", (e) => {
      previewProfile(e.currentTarget, 1);
    });

    // eslint-disable-next-line
  }, []);

  const previewProfile = (fileInput, option) => {
    setErr("");
    const validExtension = ["png", "jpg", "jpeg", "webp"];
    const split = fileInput.files[0].name.split(".");
    const fileExtenstion = split[split.length - 1];

    if (fileInput.files[0].size / 1000000 > 5) {
      setErr("Maximum file size: 5mb");
      return;
    }

    for (let i = 0; i < validExtension.length; i++) {
      if (validExtension[i] === fileExtenstion) {
        break;
      }

      if (i + 1 === validExtension.length) {
        setErr("Valid Extension: png, jpg, jpeg, webp");
        return;
      }
    }

    const ImgElem = document.querySelector(`#userinfo-update img.${option === 0 ? "pImg" : "bgImg"}`);
    ImgElem.src = "/gif/loading.gif";
    ImgElem.setAttribute("data-ext", fileExtenstion);

    exit = false;
    const fR_Display = new FileReader();
    fR_Display.readAsDataURL(fileInput.files[0]);
    fR_Display.onloadend = (e) => {
      ImgElem.src = e.target.result;
      exit = true;
    };
  };

  const openInput = (option) => {
    if (option === 0) {
      document.querySelector(`#userinfo-update input#pImg`).click();
      return;
    }
    document.querySelector(`#userinfo-update input#bgImg`).click();
  };

  return (
    <Container className="holder" id="userinfo-update">
      <Form className="form">
        <ImgDiv className="images-container">
          <img
            src={(userInfo.bg || BACKGROUND_IMG)+"?tr=w-800,h-300,cm-extract,fo-center,q-90"}
            alt=""
            className="bgImg"
          />
          <i className="fa-solid fa-pencil edit" onClick={() => openInput(1)} />
          <Profile className="profile">
            <img
              src={(userInfo.profile || PROFILE_IMG)+"?tr=w-100,w-100"}
              className="pImg"
              alt=""
            />
            <i
              className="fa-solid fa-pencil edit"
              onClick={() => openInput(0)}
            />
          </Profile>
        </ImgDiv>

        <TxtDiv className="text-container">
          <InputDiv className="input-container">
            <label htmlFor="uname">Username</label>
            <input
              type="text"
              id="uname"
              placeholder={userInfo.uname}
              onClick={inputReset}
            />
          </InputDiv>

          <InputDiv className="input-container">
            <label htmlFor="headline">Headline</label>
            <input
              type="text"
              id="headline"
              placeholder={userInfo.headline || HEADLINE}
              onClick={() => setErr("")}
            />
            {err && <p className="error">{err}</p>}
          </InputDiv>

          <input
            type="file"
            accept="image/*"
            id="pImg"
            hidden={true}
            className="profile"
          />

          <input
            type="file"
            id="bgImg"
            accept="image/*"
            hidden={true}
            className="bg"
          />

          <Save className="save-btn" onClick={saveInfo}>
            {load ? <img src={LOADING_GIF+"?tr=h-15,w-15"} alt="" /> : <span>Save</span>}
          </Save>
        </TxtDiv>
      </Form>
    </Container>
  );
};

export default UserUpdate;

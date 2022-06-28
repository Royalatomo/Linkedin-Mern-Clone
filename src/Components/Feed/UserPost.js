// Libraries
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

// Redux
import { posting as changeView } from "../../app/slice/postingSlice";
import { useDispatch, useSelector } from "react-redux";

// Styled Components
import { Container, Form, Head, Body } from "./Styles/UserPostStyled";
import { Foot, Profile, Dropbox } from "./Styles/UserPostStyled";

// ENV
import { API, PROFILE_IMG } from "../../env";

const UserPost = () => {
  const userInfo = useSelector((state) => state.user)?.info;
  const [postBtn, setPostBtn] = useState(false);
  const [err, setErr] = useState("");
  const posting = useSelector((state) => state.posting);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!posting) return;
    setErr("");
    const holder = document.getElementById("user-post");
    const textArea = holder.querySelector(".text-area");
    const tagBtn = holder.querySelector(".add-tag");
    const fileInput = document.getElementById("file-input");

    textArea.focus();
    holder.addEventListener("click", (e) => {
      const btn = document.querySelector("#user-post button.post");
      if (btn.innerHTML.toLowerCase() !== "post") return;
      const classList = e.target.classList;
      if (classList.contains("holder") || classList.contains("close")) {
        dispatch(changeView({ show: false }));
      }
    });

    // while sticking key typing
    textArea.addEventListener("keydown", (e) => {
      textArea.style.height = `45px`;
      textArea.style.height = `${textArea.scrollHeight}px`;
      setPostBtn(textArea.value);
    });

    // select all clear
    textArea.addEventListener("keyup", (e) => {
      textArea.style.height = `45px`;
      textArea.style.height = `${textArea.scrollHeight}px`;
      setPostBtn(textArea.value);
    });

    tagBtn.addEventListener("click", () => {
      const val = textArea.value;
      if (val !== "" && val[val.length - 1] !== " ") {
        textArea.value += " ";
      }
      textArea.value += "#";
      textArea.focus();
    });

    fileInput.addEventListener("change", (e) => {
      previewImg(e.currentTarget);
    });

    // eslint-disable-next-line
  }, [posting]);

  const clearImg = (id) => {
    const Div = document.getElementById(id);
    const fileInput = document.getElementById("file-input");
    const allImgsInPrev = document.querySelectorAll("div.prev").length;
    if (allImgsInPrev - 1 <= 0) setPostBtn(false);
    fileInput.value = "";
    Div.remove();
  };

  const Request = async (text, images) => {
    dispatch(changeView({ show: false }));
    const Request = await fetch(
      `${API}/api/post?token=${localStorage.getItem("token")}`,
      {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ text, postImgs: images }),
      }
    );

    const data = await Request.json();
    if (!data.success) {
      alert("something went wrong");
      console.log(data.error);
      return;
    }
  };

  const postIt = async () => {
    if (!postBtn) return;
    setPostBtn(false);
    const allFiles = document.querySelectorAll("img.prev");
    const text = document.querySelector(".text-area").value.trim().split("\n");
    const allImages = [];

    document.querySelector("#user-post .post").innerHTML =
      "<img src='/gif/loading.gif' />";
    for (let file of allFiles) {
      const data = file.src;
      const Request = await fetch(
        `${API}/api/post/image?token=${localStorage.getItem("token")}`,
        {
          method: "POST",
          headers: { Accepts: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ extension: file.dataset["ext"], data }),
        }
      );

      const res = await Request.json();
      if (!res.success) {
        alert("something went wrong");
        console.log(res.error);
        return;
      }

      allImages.push(res.link);
    }

    await Request(text, allImages);
  };

  const previewImg = (fileInput) => {
    setErr("");
    const validExtension = ["gif", "png", "jpg", "jpeg", "webp"];
    const split = fileInput.files[0].name.split(".");
    const fileExtenstion = split[split.length - 1];
    const allPrevs = document.querySelectorAll("div.prev").length;
    if (allPrevs >= 6) {
      setErr("Maximum 6 files");
      return;
    }

    if (fileInput.files[0].size / 1000000 > 5) {
      setErr("Maximum file size: 5mb");
      return;
    }

    for (let i = 0; i < validExtension.length; i++) {
      if (validExtension[i] === fileExtenstion) {
        break;
      }

      if (i + 1 === validExtension.length) {
        setErr("Valid Extension: gif, png, jpg, jpeg, webp");
        return;
      }
    }
    const ID = "img-" + uuid();
    const imgPreviewer = document.querySelector("#user-post .img-previewer");

    const DivElem = document.createElement("div");
    DivElem.setAttribute("id", ID);
    DivElem.setAttribute("class", "prev");

    const ImgElem = document.createElement("img");
    ImgElem.setAttribute("class", "prev");
    ImgElem.setAttribute("data-ext", fileExtenstion);
    ImgElem.src = "/gif/loading.gif";

    const CloseBtn = document.createElement("button");
    CloseBtn.addEventListener("click", () => clearImg(ID));
    CloseBtn.innerHTML = '<i class="fa-solid fa-xmark remove"></i>';

    DivElem.appendChild(ImgElem);
    DivElem.appendChild(CloseBtn);
    imgPreviewer.appendChild(DivElem);

    const fR_Display = new FileReader();
    fR_Display.readAsDataURL(fileInput.files[0]);
    fR_Display.onloadend = (e) => {
      const img = document.querySelector(`#${ID} img`);
      img.src = e.target.result;
      const scrollHeight = imgPreviewer.scrollHeight;
      imgPreviewer.scrollTo(0, scrollHeight);
      setPostBtn(true);
    };
  };

  const getFile = () => {
    const fileInput = document.getElementById("file-input");
    fileInput.click();
  };

  return (
    <>
      {posting && (
        <Container className="holder" id="user-post">
          <Form className="form">
            <Head className="head">
              <h2 className="heading">Create a post</h2>
              <button className="close">
                <i className="fa-solid fa-xmark close" />
              </button>
            </Head>
            <hr />

            <Body className="body">
              <Profile className="profile">
                <img
                  src={(userInfo.profile || PROFILE_IMG)+"?tr=w-100,h-100"}
                  alt=""
                />
                <div className="info">
                  <div className="name">{userInfo.uname}</div>
                  <Dropbox className="dropbox">
                    <i className="fa-solid fa-earth-asia" />
                    <span>Anyone</span>
                    <i className="fa-solid fa-caret-down down" />
                  </Dropbox>
                </div>
              </Profile>

              <textarea
                className="text-area"
                placeholder="What do you want to talk about?"
              />
              <button className="add-tag">Add hashtag</button>
            </Body>

            <div className="img-previewer"></div>
            {err && <p className="error">{err}</p>}
            <Foot className="foot">
              <input type="file" id="file-input" accept="image/*" hidden={true}/>
              <i className="fa-solid fa-image icon" onClick={getFile} />
              <i className="fa-brands fa-youtube icon" />
              <div className="divider" />

              <button className="visibility">
                <i className="fa-regular fa-comment-dots" />
                <span>Anyone</span>
              </button>

              <button className={`post ${postBtn?"active":""}`} onClick={postIt}>Post</button>
            </Foot>
          </Form>
        </Container>
      )}
    </>
  );
};

export default UserPost;

// Libraries
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateWidth } from "./app/slice/widthSlice"; // redux

// Functional Components
import Welcome from "./Pages/Welcome";
import Feed from "./Pages/Feed";
import ForgetPass from "./Pages/ForgetPass";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Post from "./Pages/Post";


function App() {
  const dispatch = useDispatch();

  // update application with change in screen-width
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWidth());
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/forget-pass" element={<ForgetPass />} />
          <Route path="/join-now" element={<Register />}/>
          <Route path="/post" element={<Post />}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

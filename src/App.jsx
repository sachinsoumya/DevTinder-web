// import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <h1 className="text-red-400 text-2xl">Hello World {count}</h1>

      <button onClick={() => setCount(count + 1)}>Click here</button> */}
    </>
  );
}

export default App;

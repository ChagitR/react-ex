import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from "./Posts.js";
import Home from "./Home.js";

const App = () => (
  
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/posts" element={<Posts/>}></Route>
    </Routes>
  </BrowserRouter>
);

export default App;

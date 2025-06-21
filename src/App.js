import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import ShowRoleID1 from "./pages/1"
import ShowRoleID2 from "./pages/2"
import ShowRoleID3 from "./pages/3"
// import Update from "./pages/Update"


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Hospital Name</h1>
        <Link to="/">Home</Link>
        <Link to="/SignIn">Sign In</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/1" element={<ShowRoleID1 />} />
        <Route path="/2" element={<ShowRoleID2 />} />
        <Route path="/3" element={<ShowRoleID3 />} />
        {/* <Route path="/:id" element={<Update />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

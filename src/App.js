import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
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
        {/* <Route path="/:id" element={<Update />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

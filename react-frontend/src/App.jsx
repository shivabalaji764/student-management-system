import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Add from "../components/Add.jsx";
import View from "../components/View.jsx";
import Edit from "../components/Edit.jsx";
import Register from "../components/Register.jsx";
import Index from "../components/Index.jsx";
import Logout from "../components/Logout.jsx";

function App() {
  return(
      <BrowserRouter>
          <Routes>
              <Route path={"/"} element={<Index />} />
              <Route path={"/login"} element={<Login />} />
              <Route path={"/register"} element={<Register />} />
              <Route path={"/dashboard"} element={<Dashboard />} />
              <Route path={"/add"} element={<Add />} />
              <Route path={"/view"} element={<View />} />
              <Route path={"/edit"} element={<Edit />} />
              <Route path={"/logout"} element={<Logout />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App

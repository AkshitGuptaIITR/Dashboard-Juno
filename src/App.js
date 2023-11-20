import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Monitoring from "./Components/Monitoring/Monitoring";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/")
      navigate("/monitoring");
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route element={<Monitoring />} path="/monitoring" />
        </Route>
      </Routes>
    </>
  );
}

export default App;

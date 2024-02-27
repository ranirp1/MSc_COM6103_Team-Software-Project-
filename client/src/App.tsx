import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/about/AboutPage";
import LandingPage from "./pages/landing/LandingPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/about/AboutPage";
import LandingPage from "./pages/landing/LandingPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import DeviceListPage from "./pages/User/DeviceListPage";
import DeviceCreationForm from "./pages/User/DeviceCreationForm";


function App() {
  return (
    <html data-theme="mytheme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/user" element={<DeviceListPage />} />
       
        </Routes>
      </BrowserRouter>
    </html>
  );
}

export default App;

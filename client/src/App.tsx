import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AboutPage from "./pages/about/AboutPage";
import LandingPage from "./pages/landing/LandingPage";
import RegistrationPage from "./pages/registration/RegistrationPage";
import LoginPage from "./pages/login/LoginPage";
import AdminPage from "./pages/admin/AdminPage";
import StaffPage from "./pages/staff/StaffPage";
import PaymentSuccess from "./pages/payment/PaymentSuccess";
import PaymentFailure from "./pages/payment/PaymentFailure";


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
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/staff" element={<StaffPage />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/failure" element={<PaymentFailure/>} />
        </Routes>
      </BrowserRouter>
    </html>
  );
}

export default App;

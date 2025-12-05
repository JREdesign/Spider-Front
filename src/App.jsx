import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useState } from 'react';
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import HeroPage from "./pages/HeroPage";
import LoginLanding from "./pages/LoginLanding";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/homepage";
import Profile from "./pages/Profile";
import EditData from "./pages/EditData";
import CreateData from "./pages/CreateData";
import Register from "./pages/Register";
import Chatbot from "./components/Chatbot";
import { ChatProvider } from "./context/ChatContext";
import "./App.css";
import InmersiveMap from "./components/inmersivemap/InmersiveMap";
import Alert from "./components/Alert";

function App() {
  return (
    <ChatProvider>
      <Router>
        <MainContent />
      </Router>
    </ChatProvider>
  );
}

function MainContent() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Oculta la alerta después de 3 segundos
  };

  return (
    <>
      <ConditionalHeader />
      {alert && <Alert type={alert.type} message={alert.message} />}
      <Chatbot />
      <Routes>
        <Route path="/welcome" element={<HeroPage />} />
        <Route path="/login" element={<LoginLanding />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute roleRequired="admin" />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/EditData/:jobId" element={<EditData />} />
          <Route path="/CreateData" element={<CreateData />} />
        </Route>
        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </>
  );
}

function ConditionalHeader() {
  const location = useLocation();
  if (
    location.pathname === "/login" ||
    location.pathname === "/welcome" ||
    location.pathname === "/register" ||
    location.pathname === "/prueba"
  ) {
    return null;
  }
  return <Header />;
}

export default App;

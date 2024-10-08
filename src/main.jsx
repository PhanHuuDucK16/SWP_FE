import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StudentManagement from "./StudentManagement.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <App />
  // <>
  // <StudentManagement />
  // <ToastContainer />
  // </>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./examples/fishCamera/App";
// import App from "./components/51-portal";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

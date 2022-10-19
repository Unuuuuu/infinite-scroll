import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { worker } from "./mocks/browser";
import "./index.css";

worker.start({
  serviceWorker: {
    url: "/infinite-scroll/mockServiceWorker.js",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  // <React.StrictMode>
  // </React.StrictMode>
  <App />
);

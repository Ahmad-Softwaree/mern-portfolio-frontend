import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { MainContext } from "./context/Index.jsx";
import ChakraUIProvider from "./providers/chakra/ChakraUIProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MainContext>
    <ChakraUIProvider>
      <App />
    </ChakraUIProvider>
  </MainContext>

  /* </React.StrictMode> */
);

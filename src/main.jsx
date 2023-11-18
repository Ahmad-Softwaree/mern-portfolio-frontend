import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "../src/styles/css/style.css";
import { MainContext } from "./context/Index";
import "driver.js/dist/driver.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MainContext>
    <ChakraProvider resetCSS={false}>
      <App />
    </ChakraProvider>
  </MainContext>

  //  </React.StrictMode>
);

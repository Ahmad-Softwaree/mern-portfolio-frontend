import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";
import { MainContext } from "./context/Index.jsx";
import ChakraUIProvider from "./providers/chakra/ChakraUIProvider.jsx";
import QueryProvider from "./providers/react-query/QueryProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <MainContext>
    <ChakraUIProvider>
      <QueryProvider>
        <App />
      </QueryProvider>
    </ChakraUIProvider>
  </MainContext>

  /* </React.StrictMode> */
);

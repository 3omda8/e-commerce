import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
import App from "./App.jsx";
import { TokenContextProvider } from "./context/TokenContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <CartContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartContextProvider>
  </TokenContextProvider>
);

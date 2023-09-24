import React from "react";
import{BrowserRouter, Routes, Route} from "react-router-dom";
import { Cart } from "./Cart";
import Consults from "./Consults";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Cart />} />
        <Route exact path="/consults" element={<Consults/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
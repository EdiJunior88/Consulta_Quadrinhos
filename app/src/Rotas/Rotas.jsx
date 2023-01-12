import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Paginas/Home/Home";
import Herois from "../Paginas/Herois/Herois";

const Rotas = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/herois" element={<Herois />}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Rotas;

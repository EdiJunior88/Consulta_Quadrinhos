import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaHerois from "../Componentes/Paginas/Herois/PaginaHerois";
import Home from "../Componentes/Paginas/Home/Home";

const Rotas = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/herois" element={<PaginaHerois />}/>
        </Routes>
    </BrowserRouter>
  );
};

export default Rotas;

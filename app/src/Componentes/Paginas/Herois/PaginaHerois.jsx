import React from "react";
import { Link } from "react-router-dom";

const PaginaHerois = () => {
  return (
    <>
      <h1>Heróis</h1>
      <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>

    </>
  );
};

export default PaginaHerois;

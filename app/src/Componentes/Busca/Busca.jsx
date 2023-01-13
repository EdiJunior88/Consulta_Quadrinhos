import React, { useState } from "react";
import styles from "./Busca.module.css";

const Busca = ({ busca }) => {
  const [texto, setTexto] = useState("");

  const pesquisa = (evento) => {
    setTexto(evento);
    busca(evento);
  };

  function inputTeclado(evento) {
    if (evento.key === "Enter") {
      evento.preventDefault();
    }
  }

  return (
    <div className={styles.containerCampoBusca}>
      <form>
        <input
          type='text'
          className={styles.campoBusca}
          placeholder="Digite um nome: Thor, Hulk, Spider-Man..."
          autoFocus
          onChange={(evento) => pesquisa(evento.target.value)}
          value={texto}
          onKeyDown={inputTeclado}
        />
      </form>
    </div>
  );
};

export default Busca;

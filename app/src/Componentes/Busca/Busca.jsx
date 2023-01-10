import React, { useState } from "react";
import styles from "./Busca.module.css";

const Busca = ({ busca, props }) => {
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
          placeholder="Digite o nome da comic"
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

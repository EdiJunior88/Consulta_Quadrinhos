import React from "react";
import styles from "./Botao.module.css";

const Botao = (props) => {
  return (
    <div className={styles.containerBotaoCarregarComics}>
      <div className={styles.botaoCarregarComics}>
        <button className={styles.botaoCarregarComics} onClick={props.onClick}>
          {props.nome}
        </button>
      </div>
    </div>
  );
};

export default Botao;

import React from "react";
import styles from "./Carregando.module.css";
import carregando from "../../Imagens/carregando.svg";

function Carregando() {
  return (
    <div className={styles.carregandoContainer}>
      <img className={styles.carregar} src={carregando} alt='Carregando' />
    </div>
  );
};

export default Carregando;

import React from "react";
import styles from "./Carregando.module.css";
import carregando from "../../Imagens/carregando.svg";

const Carregando = () => {
  return (
    <div className={styles.carregando_container}>
      <img className={styles.carregar} src={carregando} alt='Carregando' />
    </div>
  );
};

export default Carregando;

import React from "react";
import styles from "./Rodape.module.css";

const Rodape = () => {
  return (
    <div className={styles.containerRodape}>
      <div className={styles.rodape}>
        <div className={styles.containerRodapeTexto}>
          <span className={styles.rodapeTexto}>© Todos os direitos reservados à MARVEL </span>
          <span className={styles.rodapeTexto}>Site feito por Edivaldo Junior</span>
        </div>
      </div>
    </div>
  );
};

export default Rodape;

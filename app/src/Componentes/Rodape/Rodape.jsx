import React from "react";
import BotaoSubirPagina from "../BotaoSubirPagina/BotaoSubirPagina";
import styles from "./Rodape.module.css";

const Rodape = (props) => {

  function topoPagina () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div className={styles.containerRodape}>
      <div className={styles.rodape} id={props.id}>
        <div className={styles.containerRodapeTexto}>
          <span className={styles.rodapeTexto}>
            © Todos os direitos reservados à MARVEL{" "}
          </span>
          <div>
            <BotaoSubirPagina desenho={"🔺"} onClick={topoPagina}/>
          </div>
          <span className={styles.rodapeTexto}>
            Site feito por Edivaldo Junior
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rodape;

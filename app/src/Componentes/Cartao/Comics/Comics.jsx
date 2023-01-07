import React from "react";
import styles from "../../../CSS/Global.module.css"

const Comics = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerCartao}>
        <p className={styles.cartaoTitulo}>{props.nome}</p>
        <img className={styles.cartaoImagem} src={props.imagem.path + ".jpg"} alt={props.nome} />
      </div>
    </div>
  );
};

export default Comics;

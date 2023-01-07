import React, { useState } from "react";
import styles from "../../../CSS/Global.module.css";
import Modal from "react-modal";
import styles2 from "./Comics.module.css";

Modal.setAppElement("#root");

const Comics = (props) => {
  const [modal, setModal] = useState(false);

  function modalAberto() {
    setModal(true);
  }

  function modalFechado() {
    setModal(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerCartao}>
        <p className={styles.cartaoTitulo}>{props.nome}</p>
        <button className={styles2.botaoCartao} onClick={modalAberto}>
          <img
            className={styles.cartaoImagem}
            src={props.imagem.path + ".jpg"}
            alt={props.nome}
          />
        </button>
        <Modal isOpen={modal} onRequestClose={modalFechado}>
          {props.descricao}
        </Modal>
      </div>
    </div>
  );
};

export default Comics;

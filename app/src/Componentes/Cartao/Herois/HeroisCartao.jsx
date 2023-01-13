import React, { useState } from "react";
import styles from "../../../CSS/Global.module.css";
import Modal from "react-modal";
import styles2 from "./HeroisCartao.module.css";

Modal.setAppElement("#root");

const HeroisCartao = (props) => {
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

        <Modal
          isOpen={modal}
          onRequestClose={modalFechado}
          className={styles2.modal}
          overlayClassName={styles2.overlayModal}>
          <div className={styles2.containerModalBotaoFechar}>
            <button onClick={modalFechado} className={styles2.modalBotaoFechar}>
              X
            </button>
          </div>

          <div className={styles2.modalTextoDescricao}>
            {props.descricao ? (
              props.descricao
            ) : (
              <div className={styles2.modalTextoSemDescricao}>
                🚫 Sem descrição
              </div>
            )}

            <div className={styles2.containerTextoModal}>
              Quadrinhos
              <span className={styles2.textoModal}>{props.quadrinhos}</span>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default HeroisCartao;

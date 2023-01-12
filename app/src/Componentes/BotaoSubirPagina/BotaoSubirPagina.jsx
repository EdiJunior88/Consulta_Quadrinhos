import React from 'react'
import styles from "./BotaoSubirPagina.module.css"

const BotaoSubirPagina = (props) => {
  return (
    <div className={styles.containerBotaoSubirPagina}>
      <div className={styles.botaoSubirPagina}>
        <button className={styles.botaoSubirPagina} onClick={props.onClick}>
          <div className={styles.botaoSubirPaginaDesenho}>{props.desenho}</div>
        </button>
      </div>
    </div>
  )
}

export default BotaoSubirPagina
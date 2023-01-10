import React from "react";
import { Link } from "react-router-dom";
import styles from "./Cabecalho.module.css";
import logo from "../../Imagens/marvel-comics-logo.png";

const Cabecalho = () => {
  return (
    <div className={styles.containerCabecalho}>
      <div className={styles.cabecalho}>
        <div className={styles.cabecalhoTitulo}>
          <img className={styles.cabecalhoImagem} src={logo} alt='Marvel logo' />
        </div>

        {/* Menu Horizontal */}
        <div className={styles.cabecalhoMenu}>
          <ul>
            <li>
              <Link className={styles.cabecalhoMenuLink} to='/herois'>Heróis</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cabecalho;

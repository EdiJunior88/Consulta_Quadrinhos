import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Busca from "../../Busca/Busca";
import Carregando from "../../Carregando/Carregando";
import Comics from "../../Cartao/Comics/Comics";
import styles from "../../../CSS/Global.module.css";
import { Link } from "react-router-dom";

const urlPrincipal = "http://gateway.marvel.com/v1/public/";
const chavePublica = "1ca3e633852222c3b29a64774a0f63f3";
const chavePrivada = "1bfd13d742e0f5986887a831719eb52fef411820";
const data = Number(new Date());
const hash = md5(data + chavePrivada + chavePublica);

const Home = () => {
  const [comics, setComics] = useState([]);
  const [resultadoPesquisa, setResultadoPesquisa] = useState("");
  const [removerCarregando, setRemoverCarregando] = useState(false);
  const [erroAPI, setErroAPI] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      if (resultadoPesquisa === "") {
        axios
          .get(
            `${urlPrincipal}comics?ts=${data}&apikey=${chavePublica}&hash=${hash}`
          )
          .then((resposta) => {
            setRemoverCarregando(true);
            setComics(resposta.data.data.results);
            console.log(resposta);
          })
          .catch((erroAPI) => {
            setErroAPI(erroAPI);
            console.log(erroAPI);
          });
      } else {
        axios
          .get(
            `${urlPrincipal}comics?titleStartsWith=${resultadoPesquisa}&ts=${data}&apikey=${chavePublica}&hash=${hash}`
          )
          .then((resposta) => {
            setRemoverCarregando(true);
            setComics(resposta.data.data.results);
            console.log(resposta);
          })
          .catch((erroAPI) => {
            setErroAPI(erroAPI);
            console.log(erroAPI);
          });
      }
    }, 2000);
  }, [resultadoPesquisa]);

  function atualizarPagina() {
    window.location.reload(false);
  }

  if (erroAPI) {
    return (
      <div>
        <h1>Serviço indisponível</h1>
        <p>Tente novamente mais tarde!</p>
        <button onClick={atualizarPagina}>Clique para atualizar</button>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.containerCabecalho}>
        <div className={styles.cabecalho}>
          <h1 className={styles.cabecalhoTitulo}>Marvel</h1>

          <div className={styles.cabecalhoMenu}>
            <ul>
              <li>
                <Link to='/herois'>Heróis</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Busca busca={(buscas) => setResultadoPesquisa(buscas)} />

      <div className={styles.Cartao}>
        {comics.map((comic, index) => {
          return (
            <Comics
              key={index}
              nome={comic.title}
              imagem={comic.thumbnail}
              alt={comic.title}
            />
          );
        })}
        {!removerCarregando && <Carregando />}
      </div>
    </div>
  );
};

export default Home;

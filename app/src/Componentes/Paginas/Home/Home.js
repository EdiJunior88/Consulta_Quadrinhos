import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Busca from "../../Busca/Busca";
import Carregando from "../../Carregando/Carregando";
import Comics from "../../Cartao/Comics/Comics";
import styles from "../../../CSS/Global.module.css";
import styles2 from "./Home.module.css";
import { Link } from "react-router-dom";

const urlPrincipal = "http://gateway.marvel.com/v1/public/";
const chavePublica = "1ca3e633852222c3b29a64774a0f63f3";
const chavePrivada = "1bfd13d742e0f5986887a831719eb52fef411820";
const data = Number(new Date());
const hash = md5(data + chavePrivada + chavePublica);

const Home = () => {
  const [comics, setComics] = useState([]);
  const [resultadoPesquisa, setResultadoPesquisa] = useState("");
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const [erroAPI, setErroAPI] = useState(null);

  const [limite, setLimite] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (resultadoPesquisa === "") {
        apiComics();
      } else {
        apiComicsBusca();
      }
    }, 2000);
  }, [resultadoPesquisa]);

  function apiComics() {
    axios
      .get(
        `${urlPrincipal}comics?ts=${data}&apikey=${chavePublica}&hash=${hash}&limit=${limite}&offset=${offset}&orderBy=title`
      )
      .then((resposta) => {
        setCarregandoPagina(true);
        setComics(resposta.data.data.results);
        console.log(resposta);
      })
      .catch((erroAPI) => {
        setErroAPI(erroAPI);
        console.log(erroAPI);
      });
  }

  function apiComicsBusca() {
    axios
      .get(
        `${urlPrincipal}comics?titleStartsWith=${resultadoPesquisa}&ts=${data}&apikey=${chavePublica}&hash=${hash}&limit=${limite}&orderBy=focDate`
      )
      .then((resposta) => {
        setCarregandoPagina(true);
        setComics(resposta.data.data.results);
        console.log(resposta);
      })
      .catch((erroAPI) => {
        setErroAPI(erroAPI);
        console.log(erroAPI);
      });
  }

  function maisComics() {
    setLimite((limiteAtual) => limiteAtual + 30);
    apiComics();
  }

  function atualizarPagina() {
    window.location.reload(false);
  }

  return (
    <div>
      <div className={styles.containerCabecalho}>
        <div className={styles.cabecalho}>
          <h1 className={styles.cabecalhoTitulo}>Marvel</h1>

          {/* Menu Horizontal */}
          <div className={styles.cabecalhoMenu}>
            <ul>
              <li>
                <Link to='/herois'>Heróis</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {limite > 0 ? limite - 0 : null}

      {/* Campo de Busca */}
      <Busca busca={(buscas) => setResultadoPesquisa(buscas)} />

      {/* Cards das Comics */}
      <div className={styles.Cartao}>
        {comics.map((comic) => {
          return (
            <Comics
              key={comic.id}
              nome={comic.title}
              imagem={comic.thumbnail}
              alt={comic.title}
              descricao={comic.description}
            />
          );
        })}

        {/* Loading da Página */}
        {!carregandoPagina && <Carregando />}

        {erroAPI && (
          <div>
            <h1>Serviço indisponível</h1>
            <p>Tente novamente mais tarde!</p>
            <button onClick={atualizarPagina}>Clique para atualizar</button>
          </div>
        )}

        {limite <= 90 ? (
          <div>
            <button onClick={() => maisComics()}>Mais Comics</button>
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                maisComics(setLimite((limiteAtual) => limiteAtual - 30), setOffset(offset + 100))
              }>
              Mais Comics
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

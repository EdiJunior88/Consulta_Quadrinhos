import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Busca from "../../Busca/Busca";
import Comics from "../../Cartao/Comics/Comics";
import styles from "../../../CSS/Global.module.css";
import styles2 from "./Home.module.css";
import Carregando from "../../Carregando/Carregando";
import Cabecalho from "../../Cabecalho/Cabecalho";

const urlPrincipal = "http://gateway.marvel.com/v1/public/";
const chavePublica = "1ca3e633852222c3b29a64774a0f63f3";
const chavePrivada = "1bfd13d742e0f5986887a831719eb52fef411820";
const data = Number(new Date());
const hash = md5(data + chavePrivada + chavePublica);

const Home = () => {
  const [comics, setComics] = useState([]);
  const [resultadoPesquisa, setResultadoPesquisa] = useState("");
  const [erroAPI, setErroAPI] = useState(null);

  const [carregandoImagem, setCarregandoImagem] = useState(false);
  const [limite, setLimite] = useState(10);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (resultadoPesquisa !== "") {
      apiComics();
    }
  }, [resultadoPesquisa, limite]);

  function apiComics() {
    axios
      .get(
        `${urlPrincipal}comics?titleStartsWith=${resultadoPesquisa}&ts=${data}&apikey=${chavePublica}&hash=${hash}&limit=${limite}&offset=${offset}&orderBy=title`
      )
      .then((resposta) => {
        setCarregandoImagem(false);
        setComics(resposta.data.data.results);
        setErroAPI("");
        console.log("CHAMANDO API", resposta, limite);
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

  return (
    <div>
      <Cabecalho />

      {/* Campo de Busca */}
      <Busca
        busca={(buscas) => {
          setTimeout(() => {
            setCarregandoImagem(true);
            setResultadoPesquisa(buscas);
          }, 3000);
        }}
      />

      {/* Loading da Página */}
      {carregandoImagem && <Carregando />}

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

        {/* Mensagem de Erro da API */}
        {erroAPI && (
          <div>
            <p>Preenchimento Obrigatório</p>
          </div>
        )}

        {limite <= 90 ? (
          <div className={resultadoPesquisa ? styles2.normal : styles2.oculto}>
            <button
              onClick={() => {
                setCarregandoImagem(true);
                setTimeout(() => maisComics(console.log("clicou"), 500));
              }}>
              Mais Comics
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() =>
                setTimeout(() => {
                  setCarregandoImagem(true);
                  maisComics(
                    setLimite((limiteAtual) => limiteAtual - 30),
                    setOffset(offset + 100)
                  );
                }, 100)
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

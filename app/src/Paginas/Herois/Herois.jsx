import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Busca from "../../Componentes/Busca/Busca";
import styles from "../../CSS/Global.module.css";
import styles2 from "./Herois.module.css";
import Carregando from "../../Componentes/Carregando/Carregando";
import Cabecalho from "../../Componentes/Cabecalho/Cabecalho";
import Botao from "../../Componentes/Botao/Botao";
import Rodape from "../../Componentes/Rodape/Rodape";
import HeroisCartao from "../../Componentes/Cartao/Herois/HeroisCartao";

const urlPrincipal = "http://gateway.marvel.com/v1/public/";
const chavePublica = process.env.REACT_APP_ACCESS_TOKEN_MARVEL_API_PUBLICA;
const chavePrivada = process.env.REACT_APP_ACCESS_TOKEN_MARVEL_API_PRIVADA;
const data = Number(new Date());
const hash = md5(data + chavePrivada + chavePublica);

const Herois = () => {
  const [herois, setHerois] = useState([]);
  const [resultadoPesquisa, setResultadoPesquisa] = useState("");
  const [erroAPI, setErroAPI] = useState(null);

  const [carregandoImagem, setCarregandoImagem] = useState(false);
  const [limite, setLimite] = useState(10);
  const [offset, setOffset] = useState(0);

  /* Evita Carregar a API sem ter alguma informação digitada no input */
  useEffect(() => {
    if (resultadoPesquisa !== "") {
      apiHerois();
    }
  }, [resultadoPesquisa, limite]);

  /* Função para chamar a API através do input text */
  /* O resultado digitado no input text fica armazenado no Hook resultadoPesquisa */
  /* O Hook limite se refere ao máximo de solicitações por vez da API (100 solicitações por vez) */
  /* O Hook offset reinicia a contagem do hook limite para não dar um erro de chamada da API caso ultrapasse o limite */
  function apiHerois() {
    axios
      .get(
        `${urlPrincipal}characters?nameStartsWith=${resultadoPesquisa}&ts=${data}&apikey=${chavePublica}&hash=${hash}&limit=${limite}&offset=${offset}&orderBy=name`
      )
      .then((resposta) => {
        setCarregandoImagem(false);
        setHerois(resposta.data.data.results);
        setErroAPI("");
        console.log("CHAMANDO API", resposta, limite);
      })
      .catch((erroAPI) => {
        setErroAPI(erroAPI);
        console.log(erroAPI);
      });
  }

  /* Acrescentando mais 30 novos resultados e chamando a API */
  function maisHerois() {
    setLimite((limiteAtual) => limiteAtual + 30);
    apiHerois();
  }

  return (
    <>
      <header>
        <Cabecalho id={styles2.cabecalho} nome='Home' to='/' />
      </header>

      <section>
        {/* Campo de Busca (Componente)*/}

        <Busca
          placeholder='Digite um nome: Thor, Hulk, Spider-Man...'
          busca={(buscas) => {
            setTimeout(() => {
              setCarregandoImagem(true);
              setResultadoPesquisa(buscas);
            }, 3000);
          }}
        />

        {/* Loading da Página */}
        {carregandoImagem && <Carregando />}

        {/* Cards (Cartões) dos Heróis */}
        <div className={styles.Cartao}>
          {herois.map((heroi) => {
            return (
              <HeroisCartao
                key={heroi.id}
                nome={heroi.name}
                imagem={heroi.thumbnail}
                alt={heroi.title}
                descricao={heroi.description}
                quadrinhos={heroi.comics.items.map((herois, id) => (
                  <span key={id}>{herois.name}</span>
                ))}
              />
            );
          })}

          {/* Mensagem de Erro da API */}
          {erroAPI && (
            <div>
              <p>Preenchimento Obrigatório</p>
            </div>
          )}
        </div>

        {/* Se o número de requisições for menor de 90
        carrega a API até o limite máximo de 100 requisições */}
        {/* caso contrário, vai carregar a API com um "limit" diferente
        para não dar o ERRO 409 de falha de requisição */}
        {limite <= 90 ? (
          <div className={styles2.containerBotaoCarregarHerois}>
            <div
              className={
                resultadoPesquisa ? styles2.botaoCarregarHerois : styles2.oculto
              }>
              <Botao
                onClick={() => {
                  setCarregandoImagem(true);
                  setTimeout(() => maisHerois(console.log("clicou"), 500));
                }}
                nome='Mais Heróis'
              />
            </div>
          </div>
        ) : (
          <Botao
            onClick={() =>
              setTimeout(() => {
                setCarregandoImagem(true);
                maisHerois(
                  setLimite((limiteAtual) => limiteAtual - 30),
                  setOffset(offset + 100)
                );
              }, 500)
            }
            nome='Mais Heróis'
          />
        )}
      </section>

      <footer>
        <Rodape id={styles2.rodape}/>
      </footer>
    </>
  );
};

export default Herois;

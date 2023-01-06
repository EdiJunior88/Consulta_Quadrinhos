import React, { useEffect, useState } from "react";
import axios from "axios";
import md5 from "md5";
import Personagem from "./Componentes/Personagem/Personagem";
import Busca from "./Componentes/Busca";
import Carregando from "./Componentes/Carregando/Carregando";

const urlPrincipal = "http://gateway.marvel.com/v1/public/";
const chavePublica = "1ca3e633852222c3b29a64774a0f63f3";
const chavePrivada = "1bfd13d742e0f5986887a831719eb52fef411820";
const data = Number(new Date());
const hash = md5(data + chavePrivada + chavePublica);

const App = () => {
  const [personagens, setPersonagens] = useState([]);
  const [resultadoPesquisa, setResultadoPesquisa] = useState("");
  const [removerCarregando, setRemoverCarregando] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (resultadoPesquisa === "") {
        axios
          .get(
            `${urlPrincipal}/characters?ts=${data}&apikey=${chavePublica}&hash=${hash}`
          )
          .then((resposta) => {
            setPersonagens(resposta.data.data.results);
            console.log(resposta);
          })
          .catch((erro) => console.log(erro));
      } else {
        axios
          .get(
            `${urlPrincipal}/characters?nameStartsWith=${resultadoPesquisa}&ts=${data}&apikey=${chavePublica}&hash=${hash}`
          )
          .then((resposta) => {
            setRemoverCarregando(true);
            setPersonagens(resposta.data.data.results);
            console.log(resposta);
          })
          .catch((erro) => console.log(erro));
      }
    }, 2000);
  }, [resultadoPesquisa]);

  return (
    <div>
      <h1>Marvel</h1>

      <Busca busca={(buscas) => setResultadoPesquisa(buscas)} />

      {personagens.map((personagem, index) => {
        return (
          <Personagem
            key={index}
            nome={personagem.name}
            imagem={personagem.thumbnail}
            alt={personagem.name}
          />
        );
      })}
      {!removerCarregando && <Carregando />}
    </div>
  );
};

export default App;

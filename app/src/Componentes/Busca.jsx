import React, { useState } from "react";

const Busca = ({ busca }) => {
  const [texto, setTexto] = useState("");

  const pesquisa = (evento) => {
    setTexto(evento);
    busca(evento);
  };

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Digite o nome do personagem'
          onChange={(evento) => pesquisa(evento.target.value)}
          value={texto}
        />
      </form>
    </div>
  );
};

export default Busca;

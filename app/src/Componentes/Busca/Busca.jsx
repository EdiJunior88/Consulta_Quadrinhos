import React, { useState } from "react";

const Busca = ({ busca }) => {
  const [texto, setTexto] = useState("");

  const pesquisa = (evento) => {
    setTexto(evento);
    busca(evento);
  };

  function inputTeclado(evento) {
    if (evento.key === 'Enter') {
      evento.preventDefault();
    }
  }

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='Digite o nome do personagem'
          autoFocus
          onChange={(evento) => pesquisa(evento.target.value)}
          value={texto}
          onKeyDown={inputTeclado}
        />
      </form>
    </div>
  );
};

export default Busca;

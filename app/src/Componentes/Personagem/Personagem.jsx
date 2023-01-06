import React from "react";

const Personagem = (props) => {
  return (
    <div>
      <p>{props.nome}</p>
      <img src={props.imagem.path + ".jpg"} alt={props.nome} />
    </div>
  );
};

export default Personagem;

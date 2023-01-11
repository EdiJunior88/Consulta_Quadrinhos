import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import styles from "./FormularioEnvio.module.css";

const FormularioEnvio = (props) => {
  const [modal, setModal] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function modalAberto() {
    setModal(true);
  }

  function modalFechado() {
    setModal(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm();

  const onSubmit = () => {
    setMensagem("Envio da Comic para o seu endereço");
    console.log("enviado");
  };

  const checkCEP = (evento) => {
    const cep = evento.target.value.replace(/\D/g, "");
    console.log(cep);
    fetch(`https://cors.eu.org/https://viacep.com.br/ws/${cep}/json/`)
      .then((resposta) => resposta.json())
      .then((data) => {
        console.log(data);
        // register({ name: 'address', value: data.logradouro });
        setValue("address", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("addressNumber");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerCartao}>
        <p className={styles.cartaoTitulo}>{props.nome}</p>
        <button className={styles.botaoCartao} onClick={modalAberto}>
          Comprar
        </button>
        <Modal
          isOpen={modal}
          onRequestClose={modalFechado}
          className={styles.modal}
          overlayClassName={styles.overlayModal}>
          <div className={styles.containerModalBotaoFechar}>
            <button onClick={modalFechado} className={styles.modalBotaoFechar}>
              X
            </button>
          </div>

          <div className={styles.containerFormulario}>
            <form
              className={styles.formulario}
              onSubmit={handleSubmit(onSubmit)}>
              <label>
                CEP:
                <input
                  type='text'
                  {...register("cep", { required: true })}
                  onBlur={checkCEP}
                />
                {errors.cep && <p>Preencha com o seu CEP</p>}
              </label>

              <label>
                Rua:
                <input
                  type='text'
                  {...register("address", { required: true })}
                />
              </label>

              <label>
                Número:
                <input
                  type='text'
                  {...register("addressNumber", { required: true })}
                />
              </label>

              <label>
                Bairro:
                <input
                  type='text'
                  {...register("neighborhood", { required: true })}
                />
              </label>

              <label>
                Cidade:
                <input type='text' {...register("city", { required: true })} />
              </label>

              <label>
                Estado:
                <input type='text' {...register("uf", { required: true })} />
              </label>
              <button type='submit'>Enviar</button>
            </form>
          </div>
            <div className={styles.formularioTextoEnvio}>{mensagem}</div>
        </Modal>
      </div>
    </div>
  );
};

export default FormularioEnvio;

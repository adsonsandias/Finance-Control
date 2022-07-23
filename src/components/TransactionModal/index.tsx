/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Modal from "react-modal";

import iconChose from "../../assets/fechar.svg";
import { BtnCadastrar, Container, BtnChose } from "./styles";

interface TransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({
  isOpen,
  onRequestClose,
}: TransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <BtnChose type="button" onClick={onRequestClose}>
        <img src={iconChose} alt="Fechar Modal" />
      </BtnChose>

      <Container>
        <h2>Cadastrar transação</h2>

        <input type="text" placeholder="Título" />
        <input type="number" placeholder="Valor" />
        <input type="text" placeholder="Categoria" />

        <BtnCadastrar type="submit">Cadastrar</BtnCadastrar>
      </Container>
    </Modal>
  );
}

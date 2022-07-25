/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Modal from "react-modal";

import iconIncome from "../../assets/entrar.svg";
import iconChose from "../../assets/fechar.svg";
import iconDiscounts from "../../assets/saida.svg";
import {
  BtnCadastrar,
  Container,
  BtnChose,
  IncomeDiscountsContainer,
  BtnTypeTransition,
} from "./styles";

interface TransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({
  isOpen,
  onRequestClose,
}: TransactionModalProps) {
  const [type, setType] = React.useState("deposit");

  console.log(type);

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

        <IncomeDiscountsContainer>
          <BtnTypeTransition
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
          >
            <img src={iconIncome} alt="Entradas" />
            <span>Entradas</span>
          </BtnTypeTransition>
          <BtnTypeTransition
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
          >
            <img src={iconDiscounts} alt="Saidas" />
            <span>Saidas</span>
          </BtnTypeTransition>
        </IncomeDiscountsContainer>

        <input type="text" placeholder="Categoria" />

        <BtnCadastrar type="submit">Cadastrar</BtnCadastrar>
      </Container>
    </Modal>
  );
}

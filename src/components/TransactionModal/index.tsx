/* eslint-disable react/jsx-no-bind */
import React, { FormEvent } from "react";
import Modal from "react-modal";

import iconIncome from "../../assets/entrar.svg";
import iconChose from "../../assets/fechar.svg";
import iconDiscounts from "../../assets/saida.svg";
import { useTransactions } from "../../hooks/useTransactions";
import {
  BtnCadastrar,
  Container,
  BtnChose,
  IncomeDiscountsContainer,
  BtnTypeTransition,
} from "./styles";

interface ITRANSACTIONMODALPROPS {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({
  isOpen,
  onRequestClose,
}: ITRANSACTIONMODALPROPS) {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState("");
  const [type, setType] = React.useState("deposit");

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setAmount(0);
    setCategory("");
    setType("deposit");
    onRequestClose();
  }

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

      <Container onSubmit={handleCreateTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={({ target }) => setAmount(Number(target.value))}
        />

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

        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={({ target }) => setCategory(target.value)}
        />

        <BtnCadastrar type="submit">Cadastrar</BtnCadastrar>
      </Container>
    </Modal>
  );
}

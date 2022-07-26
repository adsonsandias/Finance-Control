/* eslint-disable react/jsx-no-bind */
import React from "react";
import Modal from "react-modal";

import iconArrow from "../../assets/arrow-icon-down.svg";
import iconIncome from "../../assets/entrar.svg";
import iconChose from "../../assets/fechar.svg";
import iconDiscounts from "../../assets/saida.svg";
import { AuthContext } from "../../contexts/AuthContext";
import { container } from "../Helps/FrameMotion";
import { categorylist } from "./categorylist";
import {
  BtnCadastrar,
  Container,
  BtnChose,
  IncomeDiscountsContainer,
  BtnTypeTransition,
  ModalBackground,
} from "./styles";

interface ITRANSACTIONMODALPROPS {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function TransactionModal({
  isOpen,
  onRequestClose,
}: ITRANSACTIONMODALPROPS) {
  const { setCloudFirestore, getCloudFirestore } =
    React.useContext(AuthContext);

  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  async function setTransactionCloudFirestore(event: {
    preventDefault: () => void;
  }) {
    event.preventDefault();
    if (title && type && category && amount) {
      await setCloudFirestore({
        title,
        type,
        category,
        amount,
        createdAt: new Date(),
      });
      setTitle("");
      setType("");
      setCategory("");
      setAmount(0);
      await getCloudFirestore();
    }
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <ModalBackground
        className="container"
        variants={container}
        initial={{ x: 0, y: 300, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
      >
        <BtnChose type="button" onClick={onRequestClose}>
          <img src={iconChose} alt="Fechar Modal" />
        </BtnChose>

        <Container onSubmit={setTransactionCloudFirestore}>
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

          <select
            value={category}
            onChange={({ target }) => setCategory(target.value)}
            style={{ backgroundImage: `url(${iconArrow})` }}
          >
            <option disabled selected value="">
              Categoria
            </option>
            {categorylist.map(({ value, title }) => (
              <option key={value} value={value}>
                {title}
              </option>
            ))}
          </select>

          <BtnCadastrar type="submit">Cadastrar</BtnCadastrar>
        </Container>
      </ModalBackground>
    </Modal>
  );
}

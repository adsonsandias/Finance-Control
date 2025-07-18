import React from "react";
import Modal from "react-modal";

import iconArrow from "../../assets/arrow-icon-down.svg";
import iconIncome from "../../assets/entrar.svg";
import iconChose from "../../assets/fechar.svg";
import iconDiscounts from "../../assets/saida.svg";
import { TransactionType } from "../../domain/entities/Transaction";
import { useTransactionContext } from "../../presentation/contexts/TransactionContext";
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
  const { createTransaction, loadTransactions } = useTransactionContext();

  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [amount, setAmount] = React.useState(0);

  const handleIncomeClick = React.useCallback(() => {
    setType(TransactionType.INCOME);
  }, []);

  const handleExpenseClick = React.useCallback(() => {
    setType(TransactionType.EXPENSE);
  }, []);

  const handleTitleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    []
  );

  const handleAmountChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(Number(event.target.value));
    },
    []
  );

  const handleCategoryChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
    },
    []
  );

  const handleSubmitTransaction = React.useCallback(
    async (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (title && type && category && amount) {
        await createTransaction({
          title,
          type: type as TransactionType,
          category,
          amount,
        });
        setTitle("");
        setType("");
        setCategory("");
        setAmount(0);
        await loadTransactions();
      }
      onRequestClose();
    },
    [
      title,
      type,
      category,
      amount,
      createTransaction,
      loadTransactions,
      onRequestClose,
    ]
  );

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

        <Container onSubmit={handleSubmitTransaction}>
          <h2>Cadastrar transação</h2>

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={handleTitleChange}
          />

          <input
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={handleAmountChange}
          />

          <IncomeDiscountsContainer>
            <BtnTypeTransition
              type="button"
              onClick={handleIncomeClick}
              isActive={type === TransactionType.INCOME}
            >
              <img src={iconIncome} alt="Entradas" />
              <span>Entradas</span>
            </BtnTypeTransition>
            <BtnTypeTransition
              type="button"
              onClick={handleExpenseClick}
              isActive={type === TransactionType.EXPENSE}
            >
              <img src={iconDiscounts} alt="Saidas" />
              <span>Saidas</span>
            </BtnTypeTransition>
          </IncomeDiscountsContainer>

          <select
            value={category}
            onChange={handleCategoryChange}
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

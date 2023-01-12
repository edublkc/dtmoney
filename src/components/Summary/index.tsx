import { Container } from "./styled";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useContext } from "react";
import { TranscationContext, useTransaction } from "../../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransaction();

  const summary = transactions.reduce(
    function (acc, transaction) {
      if (transaction.type === "deposit") {
        acc.deposit += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraw += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposit: 0,
      withdraw: 0,
      total: 0,
    }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="" />
        </header>

        <strong>R${summary.deposit}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="" />
        </header>

        <strong>- R${summary.withdraw}</strong>
      </div>

      <div className="hiligh-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="" />
        </header>

        <strong>R${summary.total}</strong>
      </div>
    </Container>
  );
}

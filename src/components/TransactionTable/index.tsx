import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styled";

interface Transcation {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

export function TransactionTable() {
  const [transaction, setTranscations] = useState<Transcation[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTranscations(response.data.transactions));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Títutlo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transaction.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </td>

              <td>{transaction.category}</td>
              <td>
                {new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

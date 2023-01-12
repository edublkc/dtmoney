import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransacationProviderProps {
  children: ReactNode;
}

interface Transcation {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transcation, "id" | "createdAt">;

interface TranscationContextValues {
  createTranscation: (transaction: TransactionInput) => Promise<void>;
  transactions: Transcation[];
}

export const TranscationContext = createContext<TranscationContextValues>(
  {} as TranscationContextValues
);

export function TransacationProvider({ children }: TransacationProviderProps) {
  const [transactions, setTranscations] = useState<Transcation[]>([]);

  useEffect(() => {
    api
      .get("/transactions")
      .then((response) => setTranscations(response.data.transactions));
  }, []);

  async function createTranscation(transactionInput: TransactionInput) {
    const response = await api.post("/transaction", {
      ...transactionInput,
      createdAt: new Date()
    });

    const { transaction } = response.data;

    
    setTranscations([...transactions, transaction]);
  }

  return (
    <TranscationContext.Provider
      value={{
        transactions,
        createTranscation,
      }}
    >
      {children}
    </TranscationContext.Provider>
  );
}


export function useTransaction(){
  return useContext(TranscationContext)
}
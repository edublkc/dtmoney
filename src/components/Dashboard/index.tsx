import { Summary } from "../Summary";
import { TransactionTable } from "../TransactionTable";
import { Container } from "./styled";


export function Dashboard(){
        return (
        <Container>
            <Summary/>
            <TransactionTable/>
        </Container>
    )
}
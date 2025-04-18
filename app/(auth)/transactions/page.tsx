import { Button } from "@heroui/button";
import { getTransactions } from "./actions";

export default async function TransactionPage() {

    const transactions = await getTransactions()

    return (
        <main>
            <h1 className="font-bold py-4 text-3xl">Movimentações</h1>
            <Button>+ movimentação</Button>
        </main>
    )
}
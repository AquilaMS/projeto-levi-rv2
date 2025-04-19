import { Card, CardHeader } from "@heroui/react";
import CongregationCallerBtn from "../components/btnCallers/congregation";
import { getCongregations } from "./actions";
import { CongregationCard } from "../components/congregationsCard";

export default async function CongregationPage() { 

    const congregations = await getCongregations()

    return (
        <main>
            <h1 className="font-bold py-4 text-3xl">Congregações</h1>
            <CongregationCallerBtn />
            {congregations.length > 0 && (
               congregations.map((congregation) => (
                   <CongregationCard key={congregation.id} congregation={congregation} />
                ))
            )}
        </main>
    )
}
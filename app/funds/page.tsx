import FundsCallerBtn from "../components/btnCallers/funds";
import { getCongregations } from "../congregation/actions";
import { getDepartments } from "../department/actions";

export default async function FundsPage() { 

    const congregations = await getCongregations()
    const departments = await getDepartments() 

    return (
        <div>
            <h1 className="font-bold py-4 text-3xl">Fundos</h1>
            <FundsCallerBtn  departments={departments} congregations={congregations} />
        </div>
    )
}
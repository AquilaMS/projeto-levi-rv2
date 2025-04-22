import DepartmentCallerBtn from "../components/btnCallers/department";
import DepartmentCard from "../components/departmentsCard";
import { getCongregations } from "../congregation/actions";
import { getDepartments } from "./actions";

export default async function DepartmentPage() {

    const departments = await getDepartments() 
    const congregations = await getCongregations()

    return (
        <main>
            <h1 className="font-bold py-4 text-3xl">Departamentos</h1>
            <DepartmentCallerBtn />

            {departments.length > 0 && (
                departments.map((department) => (
                    <DepartmentCard key={department.id} department={department} congregations={congregations}/>
                ))
            )}

        </main>
    );
}
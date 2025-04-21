import { getAllowedUsers, getAllUsers } from "@/lib/user";
import PermissionCallerBtn from "../components/btnCallers/permission";
import PermissionsCard from "../components/permissionsCard";
import { getPermissions } from "./actions";
import { getCongregations } from "../congregation/actions";
import { getDepartments } from "../department/actions";

export default async function PermissionsPage() {

    const permissions = await getPermissions()
    const allowedUsers = await getAllowedUsers()
    const congregations = await getCongregations()
    const departments = await getDepartments()
    const users = await getAllUsers()

    const pendingUsers = allowedUsers.filter(
        allowedUser => !users.some(user => user.email === allowedUser.email)
    );

    return (
        <div>
            <h1 className="font-bold py-4 text-3xl">Permissões</h1>
            <PermissionCallerBtn />

            {pendingUsers.length > 0 && (
                <div className="my-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h2 className="font-semibold text-lg text-yellow-700">Usuários com permissão pendente</h2>
                    <p className="text-sm text-yellow-600 mb-2">Os seguintes emails foram permitidos, mas ainda não criaram uma conta:</p>
                    <ul className="list-disc pl-5">
                        {pendingUsers.map(allowedUser => (
                            <li key={allowedUser.email} className="text-yellow-700">{allowedUser.name} - {allowedUser.email}</li>
                        ))}
                    </ul>
                </div>
            )}

            <ul>
                {permissions.map(permission => (
                    <PermissionsCard key={permission.id} permission={permission} congregations={congregations} departments={departments} />
                ))}
            </ul>
        </div>
    )
}
import { getUser } from "@/lib/user";
import { prisma } from "../prisma";

export async function getTransactions() {

    const user = await getUser()

    const transaction = prisma.transaction.findMany({
        where: {
            Fund: {
                OR: [
                    {
                        congregation: {
                            Permission: {
                                every: {
                                    userId: user?.id,
                                }
                            }
                        },
                        department: {
                            Permission: {
                                every: {
                                    userId: user?.id,
                                }
                            }
                        }
                    },
                ]
            }
        }
    })

    return transaction;
}
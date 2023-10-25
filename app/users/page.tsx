import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
    'title': "Users Page",
    'description': "Page for users data."
}

export default async function Users () {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;
    console.log(users);
    const content = (
        <main>
            <h2>
                <Link href="/">Back to home page</Link>
            </h2>
            <br />
            {users.map(user => (
                <>
                    <p><Link href={`users/${user.id}`}>{user.name}</Link></p>
                </>
            ))}
        </main>
    )

    return content;
}
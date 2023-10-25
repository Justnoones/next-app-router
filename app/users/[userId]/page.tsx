import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import { Suspense } from "react";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";
import { metadata } from "../page";
import getAllUsers from "@/lib/getAllUsers";
import { notFound } from "next/navigation";

type Params = {
    params: {
        userId: string
    }
}

export async function generateMetadata ({ params: { userId } } : Params ) : Promise<Metadata> {
    const userData: Promise<User> = getUser(userId);
    const user: User = await userData;

    if (!user.name) {
        return {
            title: "User Not Found!"
        };
    }

    return {
        title: user.name,
        description: `This is the page of ${user.name}`
    }
}

export default async function userPage ({ params: { userId } } : Params ) {
    const userData: Promise<User> = getUser(userId);
    const userPostsData: Promise<Post[]> = getUserPosts(userId);

    const user: User = await userData;
    // const [ user, userPosts ] = await Promise.all([ userData, userPostsData ]);

    if (!user.name) return notFound();

    return (
        <section>
            <h1>{user.name}</h1>
            <Suspense fallback={<h2>Loading ... </h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </section>
    )
}

export async function generateStaticParams () {
    const usersData: Promise<User[]> = getAllUsers();
    const users = await usersData;

    return users.map(user  => ({
        userId: user.id.toString()
    }));
}
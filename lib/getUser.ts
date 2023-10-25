export default async function getUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!res) throw new Error("failed to fetch data");
    
    return res.json();
}

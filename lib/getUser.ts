export default async function getUser(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

    if (!res) return undefined;
    
    return res.json();
}

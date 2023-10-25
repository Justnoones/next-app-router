export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=1`);

    if (!res) throw new Error("failed to fetch data");
    
    return res.json();
}

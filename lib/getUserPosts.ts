export default async function getUserPosts(userId: string) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=1`, {
        next: {
            revalidate: 60
        }
    });

    if (!res) return undefined;
    
    return res.json();
}

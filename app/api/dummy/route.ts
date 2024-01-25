import { currentUser } from "@clerk/nextjs";

export async function GET(request: Request) {
    const user=await currentUser();
    console.log(user)
    return Response.json({ "msg": "Hello World"})
}
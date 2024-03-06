import { addLikeToThread, removeLikeFromThread } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";

export async function GET(request: Request) {
    const user = await currentUser();
    console.log("Hit Get /", user)
    return Response.json({ "msg": "Hello World" })
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const body=await request.json();
    console.log("Hit Post /", body)
    await addLikeToThread( params.id ,body.userId, body.path);
    return Response.json({ "msg": "success" })
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const body=await request.json();
    // get dynamic id passed in url
    console.log("Hit Delete /", body)
    await removeLikeFromThread( params.id ,body.userId, body.path);
    return Response.json({ "msg": "success" })
}

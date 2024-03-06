import { deleteThread } from "@/lib/actions/thread.actions";

export async function DELETE(request: Request, { params }: { params :{id: string }}) {
    console.log("hit delete thread route")
    const { userId, authorId } = await request.json();
    const path = request.url;
    console.log(path, params.id, userId, authorId);
    if (userId !== authorId) return new Response('Unauthorized', { status: 401 });
    await deleteThread(params.id, authorId);
    return new Response('Thread deleted');
}

export async function GET(request: Request, { params }: { params :{id: string }}) {
    console.log("hit get thread route")
    
}
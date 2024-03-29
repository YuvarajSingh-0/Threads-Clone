import ThreadCard from "@/components/cards/ThreadCard";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import Comment from "@/components/forms/Comment";

async function Page({ params }: { params: { id: string } }) {
    if (!params.id) return null;
    const user = await currentUser();
    if (!user) return null;
    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect('/onboarding');
    const thread = await fetchThreadById(params.id);
    return (
        <section className="relative">
            <div>
                <ThreadCard id={thread._id} currentUserId={user?.id || ""} parentId={thread.parentId} content={thread.text} author={thread.author} community={thread.community} createdAt={thread.createdAt} comments={thread.children} likes={thread.likes} />
            </div>
            <div className="mt-7">
                <Comment
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>
            <div className="mt-10">
                {thread.children.map((comment: any) => (
                    <ThreadCard key={comment._id} id={comment._id} currentUserId={user?.id || ""} parentId={comment.parentId} content={comment.text} author={comment.author} community={comment.community} createdAt={comment.createdAt} comments={comment.children} isComment={true} likes={comment.likes} />
                ))}
            </div>
        </section>
    )
}

export default Page;
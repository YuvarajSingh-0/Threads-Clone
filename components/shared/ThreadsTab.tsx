import { fetchUserPosts, getReplies } from "@/lib/actions/user.actions"
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface props {
    currentUserId: string,
    accountId: string,
    accountType: string,
    tabValue: string,
}

async function ThreadsTab({ currentUserId, accountId, accountType, tabValue }: props) {
    let result: any;
    if (accountType === 'Community') {
        result = await fetchCommunityPosts(accountId);
    } else {
        if (tabValue === 'threads') {
            result = await fetchUserPosts(accountId);
        }
        else if (tabValue == 'replies') {

            result = await getReplies(currentUserId);
        }
    }

    if (!result) redirect('/')
    return (
        <section className="flex flex-col gap-4">
            {result.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={{ name: thread.author.name, image: thread.author.image, id: thread.author.id,_id:thread.author._id }}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                    likes={thread.likes}
                />
            ))}
        </section>
    )
}

export default ThreadsTab
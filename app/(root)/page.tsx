
import { fetchPosts } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';

interface postType {
  _id: string,
  parentId: string,
  text: string,
  author: string,
  community: string,
  createdAt: string,
  comments: string[],
}

export default async function Home() {
  const user = await currentUser();
  const result = await fetchPosts(1, 30);
  // console.log("In / html",result)
  return (
    <main>
      <h1 className="text-heading2-bold text-head text-light-1 text-left">Threads</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 ? (
          <p>No threads found</p>
        ) : (
          result.posts.map((post: any) => (
            <ThreadCard key={post._id} id={post._id} currentUserId={user?.id || ""} parentId={post.parentId} content={post.text} author={post.author} community={post.community} createdAt={post.createdAt} comments={post.children} />
          ))
        )}
      </section>
    </main>
  )
}

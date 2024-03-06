
import { fetchPosts } from '@/lib/actions/thread.actions'
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';
import { fetchUser } from '@/lib/actions/user.actions';
import InfiniteThreads from '@/components/shared/InfiniteThreads';

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
  const userInfo=await fetchUser(user?.id || "")
  // console.log("In / html",result)
  return (
    <main>
      <h1 className="text-heading2-bold text-head text-light-1 text-left">Threads</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {/* <InfiniteThreads posts={result.posts} userInfo={userInfo} /> */}
        <InfiniteThreads userId={userInfo._id} />
      </section>
    </main>
  )
}

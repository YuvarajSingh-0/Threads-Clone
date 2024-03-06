"use client";

import { deleteThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';

function DeleteThreadButton({ threadId, currentUserId, authorId }: { threadId: string, currentUserId: string, authorId: string }) {
  const handleDeleteThread = async () => {
    // "use server";
    //  await deleteThread (threadId, '/');
    console.log('Deleting thread');
    console.log(threadId, currentUserId, authorId)
    if (currentUserId !== authorId) return
    const res = await fetch(`/api/thread/${threadId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUserId, threadId: threadId, authorId }),
    });
    if (res.status === 200) {
      console.log('Thread deleted')
    }
  }
  return (
    <button onClick={handleDeleteThread} className=' absolute mr-10 right-0'>
      <Image src='/assets/delete.svg' alt='delete' width={20} height={20} className='cursor-pointer object-contain' />
    </button>
  )
}

export default DeleteThreadButton;
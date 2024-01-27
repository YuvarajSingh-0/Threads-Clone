import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface props {
  id: string
  currentUserId: string
  parentId: string | null
  content: string
  author: {
    name: string,
    image: string,
    id: string,
  }
  community: {
    name: string,
    image: string,
    id: string,
  } | null
  createdAt: string
  comments: {
    author: {
      image: string,
    }
  }[]
  isComment?: boolean;
}
function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: props) {

  return (
    <article className={`flex w-full flex-col rounded-xl ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 flex-row gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image src={author.image} alt={author.name} layout='fill' className=' cursor-pointer rounded-full' />
            </Link>
            <div className='w-0.5 grow mt-2 relative rounded-full bg-neutral-800' />
          </div>
          <div className='flex w-full flex-col gap-1'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='text-base-bold text-light-1 cursor-pointer'>
                {author.name}
              </h4>
            </Link>
            <p className='mt-2 text-small-regular text-light-2'>
              {content}
            </p>
            <div className='mt-5 flex flex-col gap-3'>
              <div className='flex gap-3.5'>
                <Image src='/assets/heart-gray.svg' alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                <Link href={`/thread/${id}`}>
                  <Image src='/assets/reply.svg' alt='reply' width={24} height={24} className='cursor-pointer object-contain' />
                </Link>
                <Image src='/assets/repost.svg' alt='repost' width={24} height={24} className='cursor-pointer object-contain' />
                <Image src='/assets/share.svg' alt='share' width={24} height={24} className='cursor-pointer object-contain' />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1 cursor-pointer'>
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ThreadCard;
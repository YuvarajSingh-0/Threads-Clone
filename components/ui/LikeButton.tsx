"use client";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
function LikeButton({ threadId, likes, userId }: { threadId: string, likes: string[], userId: string }) {

    const pathname = usePathname();
    const router = useRouter();

    const [isLiked, setIsLiked] = useState(likes.includes(userId));
    const toggleLike = async (id: string) => {
        if (userId === undefined) return router.push('/sign-in');
        if (likes.includes(userId)) {
            const res = await fetch(`/api/thread/${id}/like`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, path: pathname }),
            });
            if (res.status === 200) {
                likes = likes.splice(likes.indexOf(userId), 1);
                setIsLiked(false);
            }
        } else {
            const res = await fetch(`/api/thread/${id}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, path: pathname }),
            });
            if (res.status === 200) {
                likes.push(userId);
                setIsLiked(true);
            }
        }
    }

    return (
        <>
            <button>
                <Image src={isLiked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'} alt='heart' width={24} height={24} onClick={() => toggleLike(threadId)} className='cursor-pointer object-contain' />
            </button>
            <p className='mr-3 text-small-regular text-[#5C5C7B]'>{likes.length}</p>
        </>
    )
}

export default LikeButton
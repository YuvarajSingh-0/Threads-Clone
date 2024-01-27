"use client";

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentValidation } from '@/lib/validations/thread';
import { Input } from '../ui/input';
import { addCommentToThread, createThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';

interface props {
    threadId: string
    currentUserImg: string
    currentUserId: string
}

function Comment({ threadId, currentUserImg, currentUserId }: props) {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            thread: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(threadId, values.thread, JSON.parse(currentUserId),pathname)
        form.reset();
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className=' mt-10 flex items-center gap-4 border-y border-y-dark-4 py-5 max-xs:flex-col'
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-3 w-full'>
                            <FormLabel>
                                <Image src={currentUserImg} alt='user' width={48} height={48} className='rounded-full object-cover' />
                            </FormLabel>
                            <FormControl className='no-focus border-none bg-transparent '>
                                <Input
                                    placeholder="Comment..."
                                    className="no-focus text-light-1 outline-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='rounded-3xl bg-primary-500 px-8 py-2 !text-small-regular text-light-1 max-xs:w-full' >
                    Reply
                </Button>
            </form>
        </Form>
    )
}

export default Comment
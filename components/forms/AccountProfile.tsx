"use client";

import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation";
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadThing';
import { updateUser } from '@/lib/actions/user.actions';

interface Props {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string
    },
    btnTitle: string
}
export default function AccountProfile({ user, btnTitle }: Props) {
    const { startUpload } = useUploadThing("media");
    const [files, setFiles] = useState<File[]>([]);
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(UserValidation),
        defaultValues: {
            username: user?.username || "",
            name: user.name || "",
            bio: user.bio || "",
            profile_photo: user.image || ""
        }
    })

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        e.preventDefault();
        const fileReader = new FileReader();
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFiles(Array.from(e.target.files));
            if (!file.type.includes('image')) {
                console.log('File is not an image.');
                return;
            }
            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';
                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    }

    async function onSubmit(values: z.infer<typeof UserValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const blob = values.profile_photo;
        const hasImageChanged = isBase64Image(blob);
        if (hasImageChanged) {
            const imgRes = await startUpload(files);
            if (imgRes && imgRes[0].url) {
                values.profile_photo = imgRes[0].url;
            }
        }
        // console.log(values)
        await updateUser({
            name: values.name,
            path: pathname,
            username: values.username,
            userId: user.id,
            bio: values.bio,
            image: values.profile_photo,
        });
        if (pathname === "/profile/edit") {
            router.back();
        } else {
            router.push("/");
        }


    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className='flex items-center gap-4'>
                            <FormLabel className='flex h-24 w-24 items-center justify-center rounded-full bg-dark-4'>
                                {field.value ? (
                                    <Image
                                        src={field.value}
                                        alt="profile photo"
                                        width={96}
                                        height={96}
                                        priority
                                        className='object-fill rounded-full'
                                    />) : (
                                    <Image
                                        src='/assets/profile.svg'
                                        alt="profile photo"
                                        width={24}
                                        height={24}
                                        className='object-fill'
                                    />
                                )}
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='file'
                                    accept='image/*'
                                    className='cursor-pointer border-none bg-transparent outline-none file:text-blue'
                                    placeholder="upload a photo"
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-3 w-full'>
                            <FormLabel className='text-light-2 self-start'>
                                Name
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='text'
                                    className='border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                                    placeholder="upload a photo"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-3 w-full'>
                            <FormLabel className='text-light-2 self-start '>
                                Username
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Input
                                    type='text'
                                    className='border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                                    placeholder="potatosmasher"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className='flex flex-col gap-3 w-full'>
                            <FormLabel className='text-light-2 self-start'>
                                Bio
                            </FormLabel>
                            <FormControl className='flex-1 text-base-semibold text-gray-200'>
                                <Textarea
                                    rows={10}
                                    className='border border-dark-4 bg-dark-3 text-light-1 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0'
                                    placeholder="Bio..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}

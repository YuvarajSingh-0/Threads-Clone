import * as z from 'zod';

export const UserValidation=z.object({
    profile_photo:z.string().url().nonempty(),
    name:z.string().min(3,{message:"Minimum 3 characters"}).max(30).nonempty(),
    username:z.string().min(3,{message:"Minimum 3 characters"}).max(30).nonempty(),
    bio:z.string().min(3,{message:"Minimum 3 characters"}).max(1000).nonempty(),
})
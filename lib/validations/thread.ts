import * as z from 'zod';

export const ThreadValidation=z.object({
    thread:z.string().min(1, {message:"Thread cannot be empty"}),
    accountId:z.string()
})
export const CommentValidation=z.object({
    thread:z.string().min(1, {message:"Thread cannot be empty"}),
})
